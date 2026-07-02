/**
 * Shared bridge auth/URL resolution. Consolidates the ant-only
 * CLAUDE_BRIDGE_* dev overrides that were previously copy-pasted across
 * a dozen files — inboundAttachments, BriefTool/upload, bridgeMain,
 * initReplBridge, remoteBridgeCore, daemon workers, /rename,
 * /remote-control.
 *
 * Two layers: *Override() returns the ant-only env var (or undefined);
 * the non-Override versions fall through to the real OAuth store/config.
 * Callers that compose with a different auth source (e.g. daemon workers
 * using IPC auth) use the Override getters directly.
 */
/** Ant-only dev override: CLAUDE_BRIDGE_OAUTH_TOKEN, else undefined. */
export declare function getBridgeTokenOverride(): string | undefined;
/** Ant-only dev override: CLAUDE_BRIDGE_BASE_URL, else undefined. */
export declare function getBridgeBaseUrlOverride(): string | undefined;
/**
 * Access token for bridge API calls: dev override first, then the OAuth
 * keychain. Undefined means "not logged in".
 */
export declare function getBridgeAccessToken(): string | undefined;
/**
 * Base URL for bridge API calls: dev override first, then the production
 * OAuth config. Always returns a URL.
 */
export declare function getBridgeBaseUrl(): string;
//# sourceMappingURL=bridgeConfig.d.ts.map