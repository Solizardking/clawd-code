/**
 * Settings Sync Service
 *
 * Syncs user settings and memory files across Claude Code environments.
 *
 * - Interactive CLI: Uploads local settings to remote (incremental, only changed entries)
 * - CCR: Downloads remote settings to local before plugin installation
 *
 * Backend API: anthropic/anthropic#218817
 */
/**
 * Upload local settings to remote (interactive CLI only).
 * Called from main.tsx preAction.
 * Runs in background - caller should not await unless needed.
 */
export declare function uploadUserSettingsInBackground(): Promise<void>;
/** Test-only: clear the cached download promise between tests. */
export declare function _resetDownloadPromiseForTesting(): void;
/**
 * Download settings from remote for CCR mode.
 * Fired fire-and-forget at the top of print.ts runHeadless(); awaited in
 * installPluginsAndApplyMcpInBackground before plugin install. First call
 * starts the fetch; subsequent calls join it.
 * Returns true if settings were applied, false otherwise.
 */
export declare function downloadUserSettings(): Promise<boolean>;
/**
 * Force a fresh download, bypassing the cached startup promise.
 * Called by /reload-plugins in CCR so mid-session settings changes
 * (enabledPlugins, extraKnownMarketplaces) pushed from the user's local
 * CLI are picked up before the plugin-cache sweep.
 *
 * No retries: user-initiated command, one attempt + fail-open. The user
 * can re-run /reload-plugins to retry. Startup path keeps DEFAULT_MAX_RETRIES.
 *
 * Caller is responsible for firing settingsChangeDetector.notifyChange
 * when this returns true — applyRemoteEntriesToLocal uses markInternalWrite
 * to suppress detection (correct for startup, but mid-session needs
 * applySettingsChange to run). Kept out of this module to avoid the
 * settingsSync → changeDetector cycle edge.
 */
export declare function redownloadUserSettings(): Promise<boolean>;
//# sourceMappingURL=index.d.ts.map