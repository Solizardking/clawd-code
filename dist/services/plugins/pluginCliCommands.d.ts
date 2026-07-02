import type { PluginScope } from '../../utils/plugins/schemas.js';
import { type InstallableScope, VALID_INSTALLABLE_SCOPES, VALID_UPDATE_SCOPES } from './pluginOperations.js';
export { VALID_INSTALLABLE_SCOPES, VALID_UPDATE_SCOPES };
/**
 * CLI command: Install a plugin non-interactively
 * @param plugin Plugin identifier (name or plugin@marketplace)
 * @param scope Installation scope: user, project, or local (defaults to 'user')
 */
export declare function installPlugin(plugin: string, scope?: InstallableScope): Promise<void>;
/**
 * CLI command: Uninstall a plugin non-interactively
 * @param plugin Plugin name or plugin@marketplace identifier
 * @param scope Uninstall from scope: user, project, or local (defaults to 'user')
 */
export declare function uninstallPlugin(plugin: string, scope?: InstallableScope, keepData?: boolean): Promise<void>;
/**
 * CLI command: Enable a plugin non-interactively
 * @param plugin Plugin name or plugin@marketplace identifier
 * @param scope Optional scope. If not provided, finds the most specific scope for the current project.
 */
export declare function enablePlugin(plugin: string, scope?: InstallableScope): Promise<void>;
/**
 * CLI command: Disable a plugin non-interactively
 * @param plugin Plugin name or plugin@marketplace identifier
 * @param scope Optional scope. If not provided, finds the most specific scope for the current project.
 */
export declare function disablePlugin(plugin: string, scope?: InstallableScope): Promise<void>;
/**
 * CLI command: Disable all enabled plugins non-interactively
 */
export declare function disableAllPlugins(): Promise<void>;
/**
 * CLI command: Update a plugin non-interactively
 * @param plugin Plugin name or plugin@marketplace identifier
 * @param scope Scope to update
 */
export declare function updatePluginCli(plugin: string, scope: PluginScope): Promise<void>;
//# sourceMappingURL=pluginCliCommands.d.ts.map