import type { IPty } from "node-pty";
import type { WebSocket } from "ws";
import type { AuthUser } from "./auth/adapter.js";
export type { SessionInfo } from "./session-store.js";
/**
 * Tracks new-session creations per user within a rolling 1-hour window.
 *
 * `allow(userId)` is a non-destructive peek so callers can check eligibility
 * before committing. `record(userId)` commits an attempt (call only on
 * successful creation).
 */
export declare class UserHourlyRateLimiter {
    private readonly attempts;
    private readonly maxPerHour;
    constructor(maxPerHour: number);
    allow(userId: string): boolean;
    record(userId: string): void;
    /** Seconds until the oldest attempt in the window falls off (for Retry-After). */
    retryAfterSeconds(userId: string): number;
    private recent;
    private cleanup;
}
export declare class SessionManager {
    private store;
    private maxSessions;
    private maxSessionsPerUser;
    private spawnPty;
    private rateLimiter;
    private wiredPtys;
    constructor(maxSessions: number, spawnPty: (cols: number, rows: number, user?: AuthUser) => IPty, gracePeriodMs?: number, scrollbackBytes?: number, maxSessionsPerUser?: number, maxSessionsPerHour?: number);
    get activeCount(): number;
    get isFull(): boolean;
    getSession(token: string): import("./session-store.js").StoredSession | undefined;
    listSessions(): import("./session-store.js").SessionInfo[];
    /** All sessions in the shape expected by the admin dashboard. */
    getAllSessions(): Array<{
        id: string;
        userId: string;
        createdAt: number;
    }>;
    /** Sessions owned by a specific user — used by the per-user API. */
    getUserSessions(userId: string): import("./session-store.js").SessionInfo[];
    isUserAtConcurrentLimit(userId: string): boolean;
    isUserRateLimited(userId: string): boolean;
    retryAfterSeconds(userId: string): number;
    /**
     * Spawns a new PTY, registers it in the session store, and wires up all
     * event plumbing between the PTY and the WebSocket.
     *
     * Returns the session token, or null if at capacity or PTY spawn fails.
     * When `user` is provided the session is associated with that user and
     * per-user limits are enforced.
     */
    create(ws: WebSocket, cols?: number, rows?: number, user?: AuthUser): string | null;
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
    resume(token: string, ws: WebSocket, cols: number, rows: number): boolean;
    /**
     * Wire PTY → scrollback + WebSocket.
     * Called once per session lifetime (idempotent via `wiredPtys` guard).
     */
    private wirePtyEvents;
    /**
     * Wire WebSocket → PTY (input, resize, ping).
     * On close/error, start the grace period instead of immediately destroying
     * the session — this keeps the PTY alive for reconnection.
     * Called once per WebSocket connection (safe to call again on reconnect).
     */
    private wireWsEvents;
    /**
     * Force-kill a session immediately (used by the REST API).
     */
    destroySession(token: string): void;
    destroyAll(): void;
}
//# sourceMappingURL=session-manager.d.ts.map