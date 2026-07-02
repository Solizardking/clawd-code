import { SessionStore } from "./session-store.js";
// ── Per-user hourly rate limiter ─────────────────────────────────────────────
/**
 * Tracks new-session creations per user within a rolling 1-hour window.
 *
 * `allow(userId)` is a non-destructive peek so callers can check eligibility
 * before committing. `record(userId)` commits an attempt (call only on
 * successful creation).
 */
export class UserHourlyRateLimiter {
    attempts = new Map();
    maxPerHour;
    constructor(maxPerHour) {
        this.maxPerHour = maxPerHour;
        setInterval(() => this.cleanup(), 5 * 60_000).unref();
    }
    allow(userId) {
        return this.recent(userId).length < this.maxPerHour;
    }
    record(userId) {
        const r = this.recent(userId);
        r.push(Date.now());
        this.attempts.set(userId, r);
    }
    /** Seconds until the oldest attempt in the window falls off (for Retry-After). */
    retryAfterSeconds(userId) {
        const r = this.recent(userId);
        if (r.length === 0)
            return 0;
        return Math.ceil((Math.min(...r) + 3_600_000 - Date.now()) / 1000);
    }
    recent(userId) {
        const cutoff = Date.now() - 3_600_000;
        const filtered = (this.attempts.get(userId) ?? []).filter((t) => t > cutoff);
        this.attempts.set(userId, filtered);
        return filtered;
    }
    cleanup() {
        const cutoff = Date.now() - 3_600_000;
        for (const [id, ts] of this.attempts) {
            const r = ts.filter((t) => t > cutoff);
            if (r.length === 0)
                this.attempts.delete(id);
            else
                this.attempts.set(id, r);
        }
    }
}
// ── SessionManager ────────────────────────────────────────────────────────────
export class SessionManager {
    store;
    maxSessions;
    maxSessionsPerUser;
    spawnPty;
    rateLimiter;
    // Tracks which sessions have already had their PTY event listeners wired,
    // so we don't double-register on reconnect.
    wiredPtys = new Set();
    constructor(maxSessions, spawnPty, gracePeriodMs, scrollbackBytes, maxSessionsPerUser, maxSessionsPerHour) {
        this.maxSessions = maxSessions;
        this.maxSessionsPerUser = maxSessionsPerUser ?? maxSessions;
        this.spawnPty = spawnPty;
        this.store = new SessionStore(gracePeriodMs, scrollbackBytes);
        this.rateLimiter = new UserHourlyRateLimiter(maxSessionsPerHour ?? 100);
    }
    get activeCount() {
        return this.store.size;
    }
    get isFull() {
        return this.store.size >= this.maxSessions;
    }
    getSession(token) {
        return this.store.get(token);
    }
    listSessions() {
        return this.store.list();
    }
    /** All sessions in the shape expected by the admin dashboard. */
    getAllSessions() {
        return this.store.getAll().map((s) => ({
            id: s.token,
            userId: s.userId,
            createdAt: s.createdAt.getTime(),
        }));
    }
    /** Sessions owned by a specific user — used by the per-user API. */
    getUserSessions(userId) {
        return this.store.listByUser(userId);
    }
    isUserAtConcurrentLimit(userId) {
        return this.store.countByUser(userId) >= this.maxSessionsPerUser;
    }
    isUserRateLimited(userId) {
        return !this.rateLimiter.allow(userId);
    }
    retryAfterSeconds(userId) {
        return this.rateLimiter.retryAfterSeconds(userId);
    }
    /**
     * Spawns a new PTY, registers it in the session store, and wires up all
     * event plumbing between the PTY and the WebSocket.
     *
     * Returns the session token, or null if at capacity or PTY spawn fails.
     * When `user` is provided the session is associated with that user and
     * per-user limits are enforced.
     */
    create(ws, cols = 80, rows = 24, user) {
        if (this.isFull)
            return null;
        const userId = user?.id ?? "default";
        if (this.isUserAtConcurrentLimit(userId)) {
            ws.send(JSON.stringify({
                type: "error",
                message: `Session limit reached for your account (max ${this.maxSessionsPerUser}).`,
            }));
            ws.close(1013, "Per-user session limit reached");
            return null;
        }
        if (this.isUserRateLimited(userId)) {
            ws.send(JSON.stringify({
                type: "error",
                message: "Too many sessions created recently. Please wait before starting a new session.",
            }));
            ws.close(1013, "Rate limited");
            return null;
        }
        let pty;
        try {
            pty = this.spawnPty(cols, rows, user);
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Unknown PTY spawn error";
            ws.send(JSON.stringify({ type: "error", message: `PTY spawn failed: ${message}` }));
            ws.close(1011, "PTY spawn failure");
            return null;
        }
        // Record the creation only after a successful spawn.
        this.rateLimiter.record(userId);
        const session = this.store.register(pty, userId);
        session.ws = ws;
        const { token } = session;
        this.wirePtyEvents(token, pty);
        this.wireWsEvents(token, ws, pty);
        console.log(`[session ${token.slice(0, 8)}] Created for user ${userId} (active: ${this.store.size}/${this.maxSessions})`);
        return token;
    }
    /**
     * Attaches a new WebSocket to an existing session identified by `token`.
     *
     * - Cancels the grace timer
     * - Sends `{ type: "resumed", token }` to the client
     * - Replays the scrollback buffer so the user sees their conversation
     * - Resizes the PTY to the client's current terminal dimensions
     *
     * Returns true if the session was found, false otherwise.
     */
    resume(token, ws, cols, rows) {
        const session = this.store.reattach(token, ws);
        if (!session)
            return false;
        console.log(`[session ${token.slice(0, 8)}] Resumed (active: ${this.store.size}/${this.maxSessions})`);
        // Tell the client it's a resumed session BEFORE sending scrollback bytes.
        // The client uses this to clear the terminal first.
        ws.send(JSON.stringify({ type: "resumed", token }));
        // Replay buffered output
        const scrollback = session.scrollback.read();
        if (scrollback.length > 0) {
            ws.send(scrollback);
        }
        // Sync PTY dimensions to the reconnected client
        try {
            session.pty.resize(cols, rows);
        }
        catch {
            // PTY may have exited
        }
        this.wireWsEvents(token, ws, session.pty);
        return true;
    }
    /**
     * Wire PTY → scrollback + WebSocket.
     * Called once per session lifetime (idempotent via `wiredPtys` guard).
     */
    wirePtyEvents(token, pty) {
        if (this.wiredPtys.has(token))
            return;
        this.wiredPtys.add(token);
        const session = this.store.get(token);
        if (!session)
            return;
        pty.onData((data) => {
            // Always capture to scrollback for future replay
            session.scrollback.write(data);
            // Forward to the currently attached WebSocket, if any
            const ws = session.ws;
            if (ws && ws.readyState === 1 /* OPEN */) {
                ws.send(data);
            }
        });
        pty.onExit(({ exitCode, signal }) => {
            this.wiredPtys.delete(token);
            console.log(`[session ${token.slice(0, 8)}] PTY exited: code=${exitCode}, signal=${signal}`);
            const ws = session.ws;
            if (ws && ws.readyState === 1 /* OPEN */) {
                ws.send(JSON.stringify({ type: "exit", exitCode, signal }));
                ws.close(1000, "PTY exited");
            }
            this.store.destroy(token);
        });
    }
    /**
     * Wire WebSocket → PTY (input, resize, ping).
     * On close/error, start the grace period instead of immediately destroying
     * the session — this keeps the PTY alive for reconnection.
     * Called once per WebSocket connection (safe to call again on reconnect).
     */
    wireWsEvents(token, ws, pty) {
        ws.on("message", (data) => {
            const str = data.toString();
            if (str.startsWith("{")) {
                try {
                    const msg = JSON.parse(str);
                    if (msg.type === "resize" &&
                        typeof msg.cols === "number" &&
                        typeof msg.rows === "number") {
                        pty.resize(msg.cols, msg.rows);
                        return;
                    }
                    if (msg.type === "ping") {
                        if (ws.readyState === 1 /* OPEN */) {
                            ws.send(JSON.stringify({ type: "pong" }));
                        }
                        return;
                    }
                }
                catch {
                    // Not JSON — treat as terminal input
                }
            }
            pty.write(str);
        });
        const handleClose = () => {
            console.log(`[session ${token.slice(0, 8)}] WebSocket closed`);
            const session = this.store.get(token);
            // Only start grace if this WS is still the one attached to the session
            if (session && session.ws === ws) {
                this.store.startGrace(token, () => {
                    /* logged inside startGrace */
                });
            }
        };
        ws.on("close", handleClose);
        ws.on("error", (err) => {
            console.error(`[session ${token.slice(0, 8)}] WebSocket error:`, err.message);
            handleClose();
        });
    }
    /**
     * Force-kill a session immediately (used by the REST API).
     */
    destroySession(token) {
        this.store.destroy(token);
    }
    destroyAll() {
        this.store.destroyAll();
    }
}
//# sourceMappingURL=session-manager.js.map