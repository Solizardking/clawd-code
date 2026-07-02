import type { SettingSource } from '../settings/constants.js';
import { type ExtendedPluginScope, type PersistablePluginScope } from './pluginIdentifier.js';
import { type PluginScope } from './schemas.js';
/**
 * Checks for enabled plugins across all settings sources, including --add-dir.
 *
 * Uses getInitialSettings() which merges all sources with policy as
 * highest priority, then layers --add-dir plugins underneath. This is the
 * authoritative "is this plugin enabled?" check — don't delegate to
 * getPluginEditableScopes() which serves a different purpose (scope tracking).
 *
 * @returns Array of plugin IDs (plugin@marketplace format) that are enabled
 */
export declare function checkEnabledPlugins(): Promise<string[]>;
/**
 * Gets the user-editable scope that "owns" each enabled plugin.
 *
 * Used for scope tracking: determining where to write back when a user
 * enables/disables a plugin. Managed (policy) settings are processed first
 * (lowest priority) because the user cannot edit them — the scope should
 * resolve to the highest user-controllable source.
 *
 * NOTE: This is NOT the authoritative "is this plugin enabled?" check.
 * Use checkEnabledPlugins() for that — it uses merged settings where
 * policy has highest priority and can block user-enabled plugins.
 *
 * Precedence (lowest to highest):
 * 0. addDir (--add-dir directories) - session-only, lowest priority
 * 1. managed (policySettings) - not user-editable
 * 2. user (userSettings)
 * 3. project (projectSettings)
 * 4. local (localSettings)
 * 5. flag (flagSettings) - session-only, not persisted
 *
 * @returns Map of plugin ID to the user-editable scope that owns it
 */
export declare function getPluginEditableScopes(): Map<string, ExtendedPluginScope>;
/**
 * Check if a scope is persistable (not session-only).
 * @param scope The scope to check
 * @returns true if the scope should be persisted to installed_plugins.json
 */
export declare function isPersistableScope(scope: ExtendedPluginScope): scope is PersistablePluginScope;
/**
 * Convert SettingSource to plugin scope.
 * @param source The settings source
 * @returns The corresponding plugin scope
 */
export declare function settingSourceToScope(source: SettingSource): ExtendedPluginScope;
/**
 * Gets the list of currently installed plugins
 * Reads from installed_plugins.json which tracks global installation state.
 * Automatically runs migration on first call if needed.
 *
 * Always uses V2 format and initializes the in-memory session state
 * (which triggers V1→V2 migration if needed).
 *
 * @returns Array of installed plugin IDs
 */
export declare function getInstalledPlugins(): Promise<string[]>;
/**
 * Finds plugins that are enabled but not installed
 * @param enabledPlugins Array of enabled plugin IDs
 * @returns Array of missing plugin IDs
 */
export declare function findMissingPlugins(enabledPlugins: string[]): Promise<string[]>;
/**
 * Result of plugin installation attempt
 */
export type PluginInstallResult = {
    installed: string[];
    failed: Array<{
        name: string;
        error: string;
    }>;
};
/**
 * Installation scope type for install functions (excludes 'managed' which is read-only)
 */
type InstallableScope = Exclude<PluginScope, 'managed'>;
/**
 * Installs the selected plugins
 * @param pluginsToInstall Array of plugin IDs to install
 * @param onProgress Optional callback for installation progress
 * @param scope Installation scope: user, project, or local (defaults to 'user')
 * @returns Installation results with succeeded and failed plugins
 */
export declare function installSelectedPlugins(pluginsToInstall: string[], onProgress?: (name: string, index: number, total: number) => void, scope?: InstallableScope): Promise<PluginInstallResult>;
export {};
//# sourceMappingURL=pluginStartupCheck.d.ts.map