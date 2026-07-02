import type { PluginScope } from '../../utils/plugins/schemas.js';
/** Valid installable scopes (excludes 'managed' which can only be installed from managed-settings.json) */
export declare const VALID_INSTALLABLE_SCOPES: readonly ["user", "project", "local"];
/** Installation scope type derived from VALID_INSTALLABLE_SCOPES */
export type InstallableScope = (typeof VALID_INSTALLABLE_SCOPES)[number];
/** Valid scopes for update operations (includes 'managed' since managed plugins can be updated) */
export declare const VALID_UPDATE_SCOPES: readonly PluginScope[];
/**
 * Assert that a scope is a valid installable scope at runtime
 * @param scope The scope to validate
 * @throws Error if scope is not a valid installable scope
 */
export declare function assertInstallableScope(scope: string): asserts scope is InstallableScope;
/**
 * Type guard to check if a scope is an installable scope (not 'managed').
 * Use this for type narrowing in conditional blocks.
 */
export declare function isInstallableScope(scope: PluginScope): scope is InstallableScope;
/**
 * Get the project path for scopes that are project-specific.
 * Returns the original cwd for 'project' and 'local' scopes, undefined otherwise.
 */
export declare function getProjectPathForScope(scope: PluginScope): string | undefined;
/**
 * Is this plugin enabled (value === true) in .claude/settings.json?
 *
 * Distinct from V2 installed_plugins.json scope: that file tracks where a
 * plugin was *installed from*, but the same plugin can also be enabled at
 * project scope via settings. The uninstall UI needs to check THIS, because
 * a user-scope install with a project-scope enablement means "uninstall"
 * would succeed at removing the user install while leaving the project
 * enablement active — the plugin keeps running.
 */
export declare function isPluginEnabledAtProjectScope(pluginId: string): boolean;
/**
 * Result of a plugin operation
 */
export type PluginOperationResult = {
    success: boolean;
    message: string;
    pluginId?: string;
    pluginName?: string;
    scope?: PluginScope;
    /** Plugins that declare this plugin as a dependency (warning on uninstall/disable) */
    reverseDependents?: string[];
};
/**
 * Result of a plugin update operation
 */
export type PluginUpdateResult = {
    success: boolean;
    message: string;
    pluginId?: string;
    newVersion?: string;
    oldVersion?: string;
    alreadyUpToDate?: boolean;
    scope?: PluginScope;
};
/**
 * Get the most relevant installation for a plugin from V2 data.
 * For project/local scoped plugins, prioritizes installations matching the current project.
 * Priority order: local (matching project) > project (matching project) > user > first available
 */
export declare function getPluginInstallationFromV2(pluginId: string): {
    scope: PluginScope;
    projectPath?: string;
};
/**
 * Install a plugin (settings-first).
 *
 * Order of operations:
 *   1. Search materialized marketplaces for the plugin
 *   2. Write settings (THE ACTION — declares intent)
 *   3. Cache plugin + record version hint (materialization)
 *
 * Marketplace reconciliation is NOT this function's responsibility — startup
 * reconcile handles declared-but-not-materialized marketplaces. If the
 * marketplace isn't found, "not found" is the correct error.
 *
 * @param plugin Plugin identifier (name or plugin@marketplace)
 * @param scope Installation scope: user, project, or local (defaults to 'user')
 * @returns Result indicating success/failure
 */
export declare function installPluginOp(plugin: string, scope?: InstallableScope): Promise<PluginOperationResult>;
/**
 * Uninstall a plugin
 *
 * @param plugin Plugin name or plugin@marketplace identifier
 * @param scope Uninstall from scope: user, project, or local (defaults to 'user')
 * @returns Result indicating success/failure
 */
export declare function uninstallPluginOp(plugin: string, scope?: InstallableScope, deleteDataDir?: boolean): Promise<PluginOperationResult>;
/**
 * Set plugin enabled/disabled status (settings-first).
 *
 * Resolves the plugin ID and scope from settings — does NOT pre-gate on
 * installed_plugins.json. Settings declares intent; if the plugin isn't
 * cached yet, the next load will cache it.
 *
 * @param plugin Plugin name or plugin@marketplace identifier
 * @param enabled true to enable, false to disable
 * @param scope Optional scope. If not provided, auto-detects the most specific
 *   scope where the plugin is mentioned in settings.
 * @returns Result indicating success/failure
 */
export declare function setPluginEnabledOp(plugin: string, enabled: boolean, scope?: InstallableScope): Promise<PluginOperationResult>;
/**
 * Enable a plugin
 *
 * @param plugin Plugin name or plugin@marketplace identifier
 * @param scope Optional scope. If not provided, finds the most specific scope for the current project.
 * @returns Result indicating success/failure
 */
export declare function enablePluginOp(plugin: string, scope?: InstallableScope): Promise<PluginOperationResult>;
/**
 * Disable a plugin
 *
 * @param plugin Plugin name or plugin@marketplace identifier
 * @param scope Optional scope. If not provided, finds the most specific scope for the current project.
 * @returns Result indicating success/failure
 */
export declare function disablePluginOp(plugin: string, scope?: InstallableScope): Promise<PluginOperationResult>;
/**
 * Disable all enabled plugins
 *
 * @returns Result indicating success/failure with count of disabled plugins
 */
export declare function disableAllPluginsOp(): Promise<PluginOperationResult>;
/**
 * Update a plugin to the latest version.
 *
 * This function performs a NON-INPLACE update:
 * 1. Gets the plugin info from the marketplace
 * 2. For remote plugins: downloads to temp dir and calculates version
 * 3. For local plugins: calculates version from marketplace source
 * 4. If version differs from currently installed, copies to new versioned cache directory
 * 5. Updates installation in V2 file (memory stays unchanged until restart)
 * 6. Cleans up old version if no longer referenced by any installation
 *
 * @param plugin Plugin name or plugin@marketplace identifier
 * @param scope Scope to update. Unlike install/uninstall/enable/disable, managed scope IS allowed.
 * @returns Result indicating success/failure with version info
 */
export declare function updatePluginOp(plugin: string, scope: PluginScope): Promise<PluginUpdateResult>;
//# sourceMappingURL=pluginOperations.d.ts.map