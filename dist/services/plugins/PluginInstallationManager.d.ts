/**
 * Background plugin and marketplace installation manager
 *
 * This module handles automatic installation of plugins and marketplaces
 * from trusted sources (repository and user settings) without blocking startup.
 */
import type { AppState } from '../../state/AppState.js';
type SetAppState = (f: (prevState: AppState) => AppState) => void;
/**
 * Perform background plugin startup checks and installations.
 *
 * This is a thin wrapper around reconcileMarketplaces() that maps onProgress
 * events to AppState updates for the REPL UI. After marketplaces are
 * reconciled:
 * - New installs → auto-refresh plugins (fixes "plugin-not-found" errors
 *   from the initial cache-only load on fresh homespace/cleared cache)
 * - Updates only → set needsRefresh, show notification for /reload-plugins
 */
export declare function performBackgroundPluginInstallations(setAppState: SetAppState): Promise<void>;
export {};
//# sourceMappingURL=PluginInstallationManager.d.ts.map