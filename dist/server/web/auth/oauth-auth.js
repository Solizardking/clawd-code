import { randomBytes } from "crypto";
import { request as nodeRequest } from "https";
import { request as nodeHttpRequest } from "http";
/** Minimal JSON fetch over https/http. */
function fetchJSON(url, opts) {
    return new Promise((resolve, reject) => {
        const parsed = new URL(url);
        const isHttps = parsed.protocol === "https:";
        const req = (isHttps ? nodeRequest : nodeHttpRequest)({
            hostname: parsed.hostname,
            port: parsed.port || (isHttps ? 443 : 80),
            path: parsed.pathname + parsed.search,
            method: opts?.method ?? "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json",
                ...(opts?.headers ?? {}),
            },
        }, (res) => {
            const chunks = [];
            res.on("data", (c) => chunks.push(c));
            res.on("end", () => {
                try {
                    resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
                }
                catch (e) {
                    reject(e);
                }
            });
        });
        req.on("error", reject);
        if (opts?.body)
            req.write(opts.body);
        req.end();
    });
}
/**
 * OAuth2 / OIDC authentication adapter.
 *
 * Performs a server-side authorization code flow against any OIDC-compliant
 * identity provider (Google, GitHub, Okta, Auth0, …).
 *
 * Required env vars:
 *   OAUTH_CLIENT_ID      — client ID registered with the provider
 *   OAUTH_CLIENT_SECRET  — client secret
 *   OAUTH_ISSUER         — issuer base URL, e.g. https://accounts.google.com
 *
 * Optional:
 *   OAUTH_CALLBACK_URL   — full redirect URI (default: http://localhost:3000/auth/callback)
 *   OAUTH_SCOPES         — space-separated scopes (default: openid email profile)
 *   ADMIN_USERS          — comma-separated user IDs or emails that get admin role
 */
export class OAuthAdapter {
    store;
    clientId;
    clientSecret;
    issuer;
    callbackUrl;
    scopes;
    adminUsers;
    /** Cached OIDC discovery document. */
    discovery = null;
    /** In-flight state tokens to prevent CSRF. */
    pendingStates = new Map();
    constructor(store) {
        this.store = store;
        this.clientId = process.env.OAUTH_CLIENT_ID ?? "";
        this.clientSecret = process.env.OAUTH_CLIENT_SECRET ?? "";
        this.issuer = (process.env.OAUTH_ISSUER ?? "").replace(/\/$/, "");
        this.callbackUrl =
            process.env.OAUTH_CALLBACK_URL ?? "http://localhost:3000/auth/callback";
        this.scopes = process.env.OAUTH_SCOPES ?? "openid email profile";
        this.adminUsers = new Set((process.env.ADMIN_USERS ?? "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean));
        // Periodically prune stale state tokens (>10 min old).
        setInterval(() => {
            const cutoff = Date.now() - 10 * 60_000;
            for (const [s, t] of this.pendingStates) {
                if (t < cutoff)
                    this.pendingStates.delete(s);
            }
        }, 5 * 60_000).unref();
    }
    authenticate(req) {
        const session = this.store.getFromRequest(req);
        if (!session)
            return null;
        return {
            id: session.userId,
            email: session.email,
            name: session.name,
            isAdmin: session.isAdmin ||
                this.adminUsers.has(session.userId) ||
                (session.email ? this.adminUsers.has(session.email) : false),
        };
    }
    setupRoutes(app) {
        // GET /auth/login — redirect to the identity provider
        app.get("/auth/login", async (_req, res) => {
            try {
                const disc = await this.getDiscovery();
                const state = randomBytes(16).toString("hex");
                this.pendingStates.set(state, Date.now());
                const authUrl = new URL(disc.authorization_endpoint);
                authUrl.searchParams.set("client_id", this.clientId);
                authUrl.searchParams.set("redirect_uri", this.callbackUrl);
                authUrl.searchParams.set("response_type", "code");
                authUrl.searchParams.set("scope", this.scopes);
                authUrl.searchParams.set("state", state);
                // Store state in a short-lived cookie for CSRF validation
                res.setHeader("Set-Cookie", [
                    `oauth_state=${state}; HttpOnly; SameSite=Lax; Path=/auth; Max-Age=600`,
                ]);
                res.redirect(authUrl.toString());
            }
            catch (err) {
                console.error("[oauth] Failed to initiate login:", err);
                res.status(500).send("Authentication provider unavailable.");
            }
        });
        // GET /auth/callback — exchange code for tokens, create session
        app.get("/auth/callback", async (req, res) => {
            const { code, state, error } = req.query;
            if (error) {
                console.warn("[oauth] Provider error:", error);
                res.status(400).send(`Provider returned error: ${error}`);
                return;
            }
            if (!code || !state) {
                res.status(400).send("Missing code or state.");
                return;
            }
            // Validate state against cookie
            const storedState = this.extractStateCookie(req);
            if (!storedState || storedState !== state || !this.pendingStates.has(state)) {
                res.status(400).send("Invalid state parameter.");
                return;
            }
            this.pendingStates.delete(state);
            // Clear state cookie
            res.setHeader("Set-Cookie", [
                `oauth_state=; HttpOnly; SameSite=Lax; Path=/auth; Max-Age=0`,
            ]);
            try {
                const disc = await this.getDiscovery();
                const tokens = await this.exchangeCode(disc.token_endpoint, code);
                const userInfo = await this.getUserInfo(disc.userinfo_endpoint, tokens.access_token);
                const isAdmin = this.adminUsers.has(userInfo.sub) ||
                    (userInfo.email ? this.adminUsers.has(userInfo.email) : false);
                const sessionId = this.store.create({
                    userId: userInfo.sub,
                    email: userInfo.email,
                    name: userInfo.name ?? userInfo.preferred_username,
                    isAdmin,
                });
                this.store.setCookie(res, sessionId);
                res.redirect("/");
            }
            catch (err) {
                console.error("[oauth] Callback error:", err);
                res.status(500).send("Authentication failed. Please try again.");
            }
        });
        // POST /auth/logout — destroy session and redirect to login
        app.post("/auth/logout", (req, res) => {
            const id = this.store.getIdFromRequest(req);
            if (id)
                this.store.delete(id);
            this.store.clearCookie(res);
            res.redirect("/auth/login");
        });
    }
    requireAuth(req, res, next) {
        const user = this.authenticate(req);
        if (!user) {
            const accept = req.headers["accept"] ?? "";
            if (accept.includes("application/json")) {
                res.status(401).json({ error: "Unauthorized" });
            }
            else {
                res.redirect(`/auth/login?next=${encodeURIComponent(req.originalUrl)}`);
            }
            return;
        }
        req.user = user;
        next();
    }
    // ── OIDC helpers ──────────────────────────────────────────────────────────
    async getDiscovery() {
        if (this.discovery)
            return this.discovery;
        const url = `${this.issuer}/.well-known/openid-configuration`;
        const doc = await fetchJSON(url);
        this.discovery = doc;
        return doc;
    }
    async exchangeCode(tokenEndpoint, code) {
        const body = new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri: this.callbackUrl,
            client_id: this.clientId,
            client_secret: this.clientSecret,
        }).toString();
        const result = await fetchJSON(tokenEndpoint, {
            method: "POST",
            body,
        });
        if (result.error)
            throw new Error(`Token exchange failed: ${result.error}`);
        return result;
    }
    async getUserInfo(userinfoEndpoint, accessToken) {
        return fetchJSON(userinfoEndpoint, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
    }
    extractStateCookie(req) {
        const cookieHeader = req.headers.cookie ?? "";
        for (const part of cookieHeader.split(";")) {
            const eq = part.indexOf("=");
            if (eq === -1)
                continue;
            if (part.slice(0, eq).trim() === "oauth_state") {
                return decodeURIComponent(part.slice(eq + 1).trim());
            }
        }
        return null;
    }
}
//# sourceMappingURL=oauth-auth.js.map