import type { SDKMessage } from '../entrypoints/agentSdkTypes.js';
type SessionEvent = {
    type: 'event';
    data: SDKMessage;
};
/**
 * Create a session on a bridge environment via POST /v1/sessions.
 *
 * Used by both `claude remote-control` (empty session so the user has somewhere to
 * type immediately) and `/remote-control` (session pre-populated with conversation
 * history).
 *
 * Returns the session ID on success, or null if creation fails (non-fatal).
 */
export declare function createBridgeSession({ environmentId, title, events, gitRepoUrl, branch, signal, baseUrl: baseUrlOverride, getAccessToken, permissionMode, }: {
    environmentId: string;
    title?: string;
    events: SessionEvent[];
    gitRepoUrl: string | null;
    branch: string;
    signal: AbortSignal;
    baseUrl?: string;
    getAccessToken?: () => string | undefined;
    permissionMode?: string;
}): Promise<string | null>;
/**
 * Fetch a bridge session via GET /v1/sessions/{id}.
 *
 * Returns the session's environment_id (for `--session-id` resume) and title.
 * Uses the same org-scoped headers as create/archive — the environments-level
 * client in bridgeApi.ts uses a different beta header and no org UUID, which
 * makes the Sessions API return 404.
 */
export declare function getBridgeSession(sessionId: string, opts?: {
    baseUrl?: string;
    getAccessToken?: () => string | undefined;
}): Promise<{
    environment_id?: string;
    title?: string;
} | null>;
/**
 * Archive a bridge session via POST /v1/sessions/{id}/archive.
 *
 * The CCR server never auto-archives sessions — archival is always an
 * explicit client action. Both `claude remote-control` (standalone bridge) and the
 * always-on `/remote-control` REPL bridge call this during shutdown to archive any
 * sessions that are still alive.
 *
 * The archive endpoint accepts sessions in any status (running, idle,
 * requires_action, pending) and returns 409 if already archived, making
 * it safe to call even if the server-side runner already archived the
 * session.
 *
 * Callers must handle errors — this function has no try/catch; 5xx,
 * timeouts, and network errors throw. Archival is best-effort during
 * cleanup; call sites wrap with .catch().
 */
export declare function archiveBridgeSession(sessionId: string, opts?: {
    baseUrl?: string;
    getAccessToken?: () => string | undefined;
    timeoutMs?: number;
}): Promise<void>;
/**
 * Update the title of a bridge session via PATCH /v1/sessions/{id}.
 *
 * Called when the user renames a session via /rename while a bridge
 * connection is active, so the title stays in sync on claude.ai/code.
 *
 * Errors are swallowed — title sync is best-effort.
 */
export declare function updateBridgeSessionTitle(sessionId: string, title: string, opts?: {
    baseUrl?: string;
    getAccessToken?: () => string | undefined;
}): Promise<void>;
export {};
//# sourceMappingURL=createSession.d.ts.map