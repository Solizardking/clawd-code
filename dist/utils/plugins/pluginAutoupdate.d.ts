/**
 * Background plugin autoupdate functionality
 *
 * At startup, this module:
 * 1. First updates marketplaces that have autoUpdate enabled
 * 2. Then checks all installed plugins from those marketplaces and updates them
 *
 * Updates are non-inplace (disk-only), requiring a restart to take effect.
 * Official Anthropic marketplaces have autoUpdate enabled by default,
 * but users can disable it per-marketplace.
 */
/**
 * Callback type for notifying when plugins have been updated
 */
export type PluginAutoUpdateCallback = (updatedPlugins: string[]) => void;
/**
 * Register a callback to be notified when plugins are auto-updated.
 * This is used by the REPL to show restart notifications.
 *
 * If plugins were already updated before the callback was registered,
 * the callback will be invoked immediately with the pending updates.
 */
export declare function onPluginsAutoUpdated(callback: PluginAutoUpdateCallback): () => void;
/**
 * Check if pending updates came from autoupdate (for notification purposes).
 * Returns the list of plugin names that have pending updates.
 */
export declare function getAutoUpdatedPluginNames(): string[];
/**
 * Update all project-relevant installed plugins from the given marketplaces.
 *
 * Iterates installed_plugins.json, filters to plugins whose marketplace is in
 * the set, further filters each plugin's installations to those relevant to
 * the current project (user/managed scope, or project/local scope matching
 * cwd — see isInstallationRelevantToCurrentProject), then calls updatePluginOp
 * per installation. Already-up-to-date plugins are silently skipped.
 *
 * Called by:
 * - updatePlugins() below — background autoupdate path (autoUpdate-enabled
 *   marketplaces only; third-party marketplaces default autoUpdate: false)
 * - ManageMarketplaces.tsx applyChanges() — user-initiated /plugin marketplace
 *   update. Before #29512 this path only called refreshMarketplace() (git
 *   pull on the marketplace clone), so the loader would create the new
 *   version cache dir but installed_plugins.json stayed on the old version,
 *   and the orphan GC stamped the NEW dir with .orphaned_at on next startup.
 *
 * @param marketplaceNames - lowercase marketplace names to update plugins from
 * @returns plugin IDs that were actually updated (not already up-to-date)
 */
export declare function updatePluginsForMarketplaces(marketplaceNames: Set<string>): Promise<string[]>;
/**
 * Auto-update marketplaces and plugins in the background.
 *
 * This function:
 * 1. Checks which marketplaces have autoUpdate enabled
 * 2. Refreshes only those marketplaces (git pull/re-download)
 * 3. Updates installed plugins from those marketplaces
 * 4. If any plugins were updated, notifies via the registered callback
 *
 * Official Anthropic marketplaces have autoUpdate enabled by default,
 * but users can disable it per-marketplace in the UI.
 *
 * This function runs silently without blocking user interaction.
 * Called from main.tsx during startup as a background job.
 */
export declare function autoUpdateMarketplacesAndPluginsInBackground(): void;
//# sourceMappingURL=pluginAutoupdate.d.ts.map