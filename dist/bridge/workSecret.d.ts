import type { WorkSecret } from './types.js';
/** Decode a base64url-encoded work secret and validate its version. */
export declare function decodeWorkSecret(secret: string): WorkSecret;
/**
 * Build a WebSocket SDK URL from the API base URL and session ID.
 * Strips the HTTP(S) protocol and constructs a ws(s):// ingress URL.
 *
 * Uses /v2/ for localhost (direct to session-ingress, no Envoy rewrite)
 * and /v1/ for production (Envoy rewrites /v1/ → /v2/).
 */
export declare function buildSdkUrl(apiBaseUrl: string, sessionId: string): string;
/**
 * Compare two session IDs regardless of their tagged-ID prefix.
 *
 * Tagged IDs have the form {tag}_{body} or {tag}_staging_{body}, where the
 * body encodes a UUID. CCR v2's compat layer returns `session_*` to v1 API
 * clients (compat/convert.go:41) but the infrastructure layer (sandbox-gateway
 * work queue, work poll response) uses `cse_*` (compat/CLAUDE.md:13). Both
 * have the same underlying UUID.
 *
 * Without this, replBridge rejects its own session as "foreign" at the
 * work-received check when the ccr_v2_compat_enabled gate is on.
 */
export declare function sameSessionId(a: string, b: string): boolean;
/**
 * Build a CCR v2 session URL from the API base URL and session ID.
 * Unlike buildSdkUrl, this returns an HTTP(S) URL (not ws://) and points at
 * /v1/code/sessions/{id} — the child CC will derive the SSE stream path
 * and worker endpoints from this base.
 */
export declare function buildCCRv2SdkUrl(apiBaseUrl: string, sessionId: string): string;
/**
 * Register this bridge as the worker for a CCR v2 session.
 * Returns the worker_epoch, which must be passed to the child CC process
 * so its CCRClient can include it in every heartbeat/state/event request.
 *
 * Mirrors what environment-manager does in the container path
 * (api-go/environment-manager/cmd/cmd_task_run.go RegisterWorker).
 */
export declare function registerWorker(sessionUrl: string, accessToken: string): Promise<number>;
//# sourceMappingURL=workSecret.d.ts.map