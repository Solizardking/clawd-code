/**
 * Plugin delisting detection.
 *
 * Compares installed plugins against marketplace manifests to find plugins
 * that have been removed, and auto-uninstalls them.
 *
 * The security.json fetch was removed (see #25447) — ~29.5M/week GitHub hits
 * for UI reason/text only. If re-introduced, serve from downloads.claude.ai.
 */
import type { InstalledPluginsFileV2, PluginMarketplace } from './schemas.js';
/**
 * Detect plugins installed from a marketplace that are no longer listed there.
 *
 * @param installedPlugins All installed plugins
 * @param marketplace The marketplace to check against
 * @param marketplaceName The marketplace name suffix (e.g. "claude-plugins-official")
 * @returns List of delisted plugin IDs in "name@marketplace" format
 */
export declare function detectDelistedPlugins(installedPlugins: InstalledPluginsFileV2, marketplace: PluginMarketplace, marketplaceName: string): string[];
/**
 * Detect delisted plugins across all marketplaces, auto-uninstall them,
 * and record them as flagged.
 *
 * This is the core delisting enforcement logic, shared between interactive
 * mode (useManagePlugins) and headless mode (main.tsx print path).
 *
 * @returns List of newly flagged plugin IDs
 */
export declare function detectAndUninstallDelistedPlugins(): Promise<string[]>;
//# sourceMappingURL=pluginBlocklist.d.ts.map