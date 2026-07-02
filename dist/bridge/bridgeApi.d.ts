import { type BridgeApiClient } from './types.js';
type BridgeApiDeps = {
    baseUrl: string;
    getAccessToken: () => string | undefined;
    runnerVersion: string;
    onDebug?: (msg: string) => void;
    /**
     * Called on 401 to attempt OAuth token refresh. Returns true if refreshed,
     * in which case the request is retried once. Injected because
     * handleOAuth401Error from utils/auth.ts transitively pulls in config.ts →
     * file.ts → permissions/filesystem.ts → sessionStorage.ts → commands.ts
     * (~1300 modules). Daemon callers using env-var tokens omit this — their
     * tokens don't refresh, so 401 goes straight to BridgeFatalError.
     */
    onAuth401?: (staleAccessToken: string) => Promise<boolean>;
    /**
     * Returns the trusted device token to send as X-Trusted-Device-Token on
     * bridge API calls. Bridge sessions have SecurityTier=ELEVATED on the
     * server (CCR v2); when the server's enforcement flag is on,
     * ConnectBridgeWorker requires a trusted device at JWT-issuance.
     * Optional — when absent or returning undefined, the header is omitted
     * and the server falls through to its flag-off/no-op path. The CLI-side
     * gate is tengu_sessions_elevated_auth_enforcement (see trustedDevice.ts).
     */
    getTrustedDeviceToken?: () => string | undefined;
};
/**
 * Validate that a server-provided ID is safe to interpolate into a URL path.
 * Prevents path traversal (e.g. `../../admin`) and injection via IDs that
 * contain slashes, dots, or other special characters.
 */
export declare function validateBridgeId(id: string, label: string): string;
/** Fatal bridge errors that should not be retried (e.g. auth failures). */
export declare class BridgeFatalError extends Error {
    readonly status: number;
    /** Server-provided error type, e.g. "environment_expired". */
    readonly errorType: string | undefined;
    constructor(message: string, status: number, errorType?: string);
}
export declare function createBridgeApiClient(deps: BridgeApiDeps): BridgeApiClient;
/** Check whether an error type string indicates a session/environment expiry. */
export declare function isExpiredErrorType(errorType: string | undefined): boolean;
/**
 * Check whether a BridgeFatalError is a suppressible 403 permission error.
 * These are 403 errors for scopes like 'external_poll_sessions' or operations
 * like StopWork that fail because the user's role lacks 'environments:manage'.
 * They don't affect core functionality and shouldn't be shown to users.
 */
export declare function isSuppressible403(err: BridgeFatalError): boolean;
export {};
//# sourceMappingURL=bridgeApi.d.ts.map