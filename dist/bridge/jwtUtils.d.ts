/**
 * Decode a JWT's payload segment without verifying the signature.
 * Strips the `sk-ant-si-` session-ingress prefix if present.
 * Returns the parsed JSON payload as `unknown`, or `null` if the
 * token is malformed or the payload is not valid JSON.
 */
export declare function decodeJwtPayload(token: string): unknown | null;
/**
 * Decode the `exp` (expiry) claim from a JWT without verifying the signature.
 * @returns The `exp` value in Unix seconds, or `null` if unparseable
 */
export declare function decodeJwtExpiry(token: string): number | null;
/**
 * Creates a token refresh scheduler that proactively refreshes session tokens
 * before they expire. Used by both the standalone bridge and the REPL bridge.
 *
 * When a token is about to expire, the scheduler calls `onRefresh` with the
 * session ID and the bridge's OAuth access token. The caller is responsible
 * for delivering the token to the appropriate transport (child process stdin
 * for standalone bridge, WebSocket reconnect for REPL bridge).
 */
export declare function createTokenRefreshScheduler({ getAccessToken, onRefresh, label, refreshBufferMs, }: {
    getAccessToken: () => string | undefined | Promise<string | undefined>;
    onRefresh: (sessionId: string, oauthToken: string) => void;
    label: string;
    /** How long before expiry to fire refresh. Defaults to 5 min. */
    refreshBufferMs?: number;
}): {
    schedule: (sessionId: string, token: string) => void;
    scheduleFromExpiresIn: (sessionId: string, expiresInSeconds: number) => void;
    cancel: (sessionId: string) => void;
    cancelAll: () => void;
};
//# sourceMappingURL=jwtUtils.d.ts.map