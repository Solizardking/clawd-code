/**
 * Flagged plugin tracking utilities
 *
 * Tracks plugins that were auto-removed because they were delisted from
 * their marketplace. Data is stored in ~/.claude/plugins/flagged-plugins.json.
 * Flagged plugins appear in a "Flagged" section in /plugins until the user
 * dismisses them.
 *
 * Uses a module-level cache so that getFlaggedPlugins() can be called
 * synchronously during React render. The cache is populated on the first
 * async call (loadFlaggedPlugins or addFlaggedPlugin) and kept in sync
 * with writes.
 */
export type FlaggedPlugin = {
    flaggedAt: string;
    seenAt?: string;
};
/**
 * Load flagged plugins from disk into the module cache.
 * Must be called (and awaited) before getFlaggedPlugins() returns
 * meaningful data. Called by useManagePlugins during plugin refresh.
 */
export declare function loadFlaggedPlugins(): Promise<void>;
/**
 * Get all flagged plugins from the in-memory cache.
 * Returns an empty object if loadFlaggedPlugins() has not been called yet.
 */
export declare function getFlaggedPlugins(): Record<string, FlaggedPlugin>;
/**
 * Add a plugin to the flagged list.
 *
 * @param pluginId "name@marketplace" format
 */
export declare function addFlaggedPlugin(pluginId: string): Promise<void>;
/**
 * Mark flagged plugins as seen. Called when the Installed view renders
 * flagged plugins. Sets seenAt on entries that don't already have it.
 * After 48 hours from seenAt, entries are auto-cleared on next load.
 */
export declare function markFlaggedPluginsSeen(pluginIds: string[]): Promise<void>;
/**
 * Remove a plugin from the flagged list. Called when the user dismisses
 * a flagged plugin notification in /plugins.
 */
export declare function removeFlaggedPlugin(pluginId: string): Promise<void>;
//# sourceMappingURL=pluginFlagging.d.ts.map