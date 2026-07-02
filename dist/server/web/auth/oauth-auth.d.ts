import type { IncomingMessage } from "http";
import type { Application, Request, Response, NextFunction } from "express";
import type { AuthAdapter, AuthUser } from "./adapter.js";
import { SessionStore } from "./adapter.js";
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
export declare class OAuthAdapter implements AuthAdapter {
    private readonly store;
    private readonly clientId;
    private readonly clientSecret;
    private readonly issuer;
    private readonly callbackUrl;
    private readonly scopes;
    private readonly adminUsers;
    /** Cached OIDC discovery document. */
    private discovery;
    /** In-flight state tokens to prevent CSRF. */
    private readonly pendingStates;
    constructor(store: SessionStore);
    authenticate(req: IncomingMessage): AuthUser | null;
    setupRoutes(app: Application): void;
    requireAuth(req: Request, res: Response, next: NextFunction): void;
    private getDiscovery;
    private exchangeCode;
    private getUserInfo;
    private extractStateCookie;
}
//# sourceMappingURL=oauth-auth.d.ts.map