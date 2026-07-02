/**
 * CCR upstreamproxy — container-side wiring.
 *
 * When running inside a CCR session container with upstreamproxy configured,
 * this module:
 *   1. Reads the session token from /run/ccr/session_token
 *   2. Sets prctl(PR_SET_DUMPABLE, 0) to block same-UID ptrace of the heap
 *   3. Downloads the upstreamproxy CA cert and concatenates it with the
 *      system bundle so curl/gh/python trust the MITM proxy
 *   4. Starts a local CONNECT→WebSocket relay (see relay.ts)
 *   5. Unlinks the token file (token stays heap-only; file is gone before
 *      the agent loop can see it, but only after the relay is confirmed up
 *      so a supervisor restart can retry)
 *   6. Exposes HTTPS_PROXY / SSL_CERT_FILE env vars for all agent subprocesses
 *
 * Every step fails open: any error logs a warning and disables the proxy.
 * A broken proxy setup must never break an otherwise-working session.
 *
 * Design doc: api-go/ccr/docs/plans/CCR_AUTH_DESIGN.md § "Week-1 pilot scope".
 */
export declare const SESSION_TOKEN_PATH = "/run/ccr/session_token";
type UpstreamProxyState = {
    enabled: boolean;
    port?: number;
    caBundlePath?: string;
};
/**
 * Initialize upstreamproxy. Called once from init.ts. Safe to call when the
 * feature is off or the token file is absent — returns {enabled: false}.
 *
 * Overridable paths are for tests; production uses the defaults.
 */
export declare function initUpstreamProxy(opts?: {
    tokenPath?: string;
    systemCaPath?: string;
    caBundlePath?: string;
    ccrBaseUrl?: string;
}): Promise<UpstreamProxyState>;
/**
 * Env vars to merge into every agent subprocess. Empty when the proxy is
 * disabled. Called from subprocessEnv() so Bash/MCP/LSP/hooks all inherit
 * the same recipe.
 */
export declare function getUpstreamProxyEnv(): Record<string, string>;
/** Test-only: reset module state between test cases. */
export declare function resetUpstreamProxyForTests(): void;
export {};
//# sourceMappingURL=upstreamproxy.d.ts.map