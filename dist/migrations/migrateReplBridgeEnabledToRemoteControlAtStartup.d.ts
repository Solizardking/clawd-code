/**
 * Migrate the `replBridgeEnabled` config key to `remoteControlAtStartup`.
 *
 * The old key was an implementation detail that leaked into user-facing config.
 * This migration copies the value to the new key and removes the old one.
 * Idempotent — only acts when the old key exists and the new one doesn't.
 */
export declare function migrateReplBridgeEnabledToRemoteControlAtStartup(): void;
//# sourceMappingURL=migrateReplBridgeEnabledToRemoteControlAtStartup.d.ts.map