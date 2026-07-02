import type { PluginMarketplaceEntry } from '../../utils/plugins/schemas.js';
/**
 * Represents a plugin available for installation from a marketplace
 */
export type InstallablePlugin = {
    entry: PluginMarketplaceEntry;
    marketplaceName: string;
    pluginId: string;
    isInstalled: boolean;
};
/**
 * Menu option for plugin details view
 */
export type PluginDetailsMenuOption = {
    label: string;
    action: string;
};
/**
 * Extract GitHub repo info from a plugin's source
 */
export declare function extractGitHubRepo(plugin: InstallablePlugin): string | null;
/**
 * Build menu options for plugin details view with scoped installation options
 */
export declare function buildPluginDetailsMenuOptions(hasHomepage: string | undefined, githubRepo: string | null): PluginDetailsMenuOption[];
/**
 * Key hint component for plugin selection screens
 */
export declare function PluginSelectionKeyHint(t0: any): any;
//# sourceMappingURL=pluginDetailsHelpers.d.ts.map