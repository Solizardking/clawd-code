/**
 * Thin HTTP wrappers for the CCR v2 code-session API.
 *
 * Separate file from remoteBridgeCore.ts so the SDK /bridge subpath can
 * export createCodeSession + fetchRemoteCredentials without bundling the
 * heavy CLI tree (analytics, transport, etc.). Callers supply explicit
 * accessToken + baseUrl — no implicit auth or config reads.
 */
export declare function createCodeSession(baseUrl: string, accessToken: string, title: string, timeoutMs: number, tags?: string[]): Promise<string | null>;
/**
 * Credentials from POST /bridge. JWT is opaque — do not decode.
 * Each /bridge call bumps worker_epoch server-side (it IS the register).
 */
export type RemoteCredentials = {
    worker_jwt: string;
    api_base_url: string;
    expires_in: number;
    worker_epoch: number;
};
export declare function fetchRemoteCredentials(sessionId: string, baseUrl: string, accessToken: string, timeoutMs: number, trustedDeviceToken?: string): Promise<RemoteCredentials | null>;
//# sourceMappingURL=codeSessionApi.d.ts.map