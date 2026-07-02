/**
 * Load and register hooks from all enabled plugins
 */
export declare const loadPluginHooks: any;
export declare function clearPluginHookCache(): void;
/**
 * Remove hooks from plugins no longer in the enabled set, without adding
 * hooks from newly-enabled plugins. Called from clearAllCaches() so
 * uninstalled/disabled plugins stop firing hooks immediately (gh-36995),
 * while newly-enabled plugins wait for /reload-plugins — consistent with
 * how commands/agents/MCP behave.
 *
 * The full swap (clear + register all) still happens via loadPluginHooks(),
 * which /reload-plugins awaits.
 */
export declare function pruneRemovedPluginHooks(): Promise<void>;
/**
 * Reset hot reload subscription state. Only for testing.
 */
export declare function resetHotReloadState(): void;
/**
 * Build a stable string snapshot of the settings that feed into
 * `loadAllPluginsCacheOnly()` for change detection. Sorts keys so comparison is
 * deterministic regardless of insertion order.
 *
 * Hashes FOUR fields — not just enabledPlugins — because the memoized
 * loadAllPluginsCacheOnly() also reads strictKnownMarketplaces, blockedMarketplaces
 * (pluginLoader.ts:1933 via getBlockedMarketplaces), and
 * extraKnownMarketplaces. If remote managed settings set only one of
 * these (no enabledPlugins), a snapshot keyed only on enabledPlugins
 * would never diff, the listener would skip, and the memoized result
 * would retain the pre-remote marketplace allow/blocklist.
 * See #23085 / #23152 poisoned-cache discussion (Slack C09N89L3VNJ).
 */
export declare function getPluginAffectingSettingsSnapshot(): string;
/**
 * Set up hot reload for plugin hooks when remote settings change.
 * When policySettings changes (e.g., from remote managed settings),
 * compares the plugin-affecting settings snapshot and only reloads if it
 * actually changed.
 */
export declare function setupPluginHookHotReload(): void;
//# sourceMappingURL=loadPluginHooks.d.ts.map