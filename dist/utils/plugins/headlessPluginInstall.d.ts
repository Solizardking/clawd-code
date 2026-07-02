/**
 * Plugin installation for headless/CCR mode.
 *
 * This module provides plugin installation without AppState updates,
 * suitable for non-interactive environments like CCR.
 *
 * When CLAUDE_CODE_PLUGIN_USE_ZIP_CACHE is enabled, plugins are stored as
 * ZIPs on a mounted volume. The storage layer (pluginLoader.ts) handles
 * ZIP creation on install and extraction on load transparently.
 */
/**
 * Install plugins for headless/CCR mode.
 *
 * This is the headless equivalent of performBackgroundPluginInstallations(),
 * but without AppState updates (no UI to update in headless mode).
 *
 * @returns true if any plugins were installed (caller should refresh MCP)
 */
export declare function installPluginsForHeadless(): Promise<boolean>;
//# sourceMappingURL=headlessPluginInstall.d.ts.map