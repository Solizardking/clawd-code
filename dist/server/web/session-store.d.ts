import type { IPty } from "node-pty";
import type { WebSocket } from "ws";
import { ScrollbackBuffer } from "./scrollback-buffer.js";
export type StoredSession = {
    token: string;
    /** ID of the user who owns this session. */
    userId: string;
    pty: IPty;
    scrollback: ScrollbackBuffer;
    ws: WebSocket | null;
    createdAt: Date;
    lastActive: Date;
    graceTimer: ReturnType<typeof setTimeout> | null;
};
export type SessionInfo = {
    token: string;
    /** ID of the user who owns this session. */
    userId: string;
    created: string;
    lastActive: string;
    alive: boolean;
};
/**
 * In-memory session store with TTL-based cleanup.
 *
 * Sessions survive WebSocket disconnects for `gracePeriodMs` before being
 * permanently destroyed. This lets clients reconnect and resume their PTY
 * without losing conversation state.
 */
export declare class SessionStore {
    private sessions;
    private readonly gracePeriodMs;
    private readonly scrollbackBytes;
    constructor(gracePeriodMs?: number, scrollbackBytes?: number);
    /**
     * Register a newly spawned PTY under a fresh session token.
     * @param userId - ID of the owning user (defaults to "default" for single-user deployments).
     */
    register(pty: IPty, userId?: string): StoredSession;
    get(token: string): StoredSession | undefined;
    /**
     * Attach a new WebSocket to an existing session.
     * Cancels any running grace timer.
     * Returns null if the session does not exist.
     */
    reattach(token: string, ws: WebSocket): StoredSession | null;
    /**
     * Detach the WebSocket from a session and start the grace period timer.
     * After `gracePeriodMs` with no reconnect, `onExpire` is called and the
     * session is destroyed.
     */
    startGrace(token: string, onExpire: () => void): void;
    /**
     * Immediately kill the PTY and remove the session.
     */
    destroy(token: string): void;
    /** Returns summary info for all sessions (used by the REST API). */
    list(): SessionInfo[];
    /** Returns summary info for sessions owned by a specific user. */
    listByUser(userId: string): SessionInfo[];
    /** How many sessions are owned by the given user. */
    countByUser(userId: string): number;
    /** Returns all raw StoredSession objects (used internally by SessionManager). */
    getAll(): StoredSession[];
    get size(): number;
    destroyAll(): void;
}
//# sourceMappingURL=session-store.d.ts.map