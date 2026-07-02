/**
 * LSP Plugin Recommendation Utility
 *
 * Scans installed marketplaces for LSP plugins and recommends plugins
 * based on file extensions, but ONLY when the LSP binary is already
 * installed on the system.
 *
 * Limitation: Can only detect LSP plugins that declare their servers
 * inline in the marketplace entry. Plugins with separate .lsp.json files
 * are not detectable until after installation.
 */
/**
 * LSP plugin recommendation returned to the caller
 */
export type LspPluginRecommendation = {
    pluginId: string;
    pluginName: string;
    marketplaceName: string;
    description?: string;
    isOfficial: boolean;
    extensions: string[];
    command: string;
};
/**
 * Find matching LSP plugins for a file path.
 *
 * Returns recommendations for plugins that:
 * 1. Support the file's extension
 * 2. Have their LSP binary installed on the system
 * 3. Are not already installed
 * 4. Are not in the user's "never suggest" list
 *
 * Results are sorted with official marketplace plugins first.
 *
 * @param filePath - Path to the file to find LSP plugins for
 * @returns Array of matching plugin recommendations (empty if none or disabled)
 */
export declare function getMatchingLspPlugins(filePath: string): Promise<LspPluginRecommendation[]>;
/**
 * Add a plugin to the "never suggest" list
 *
 * @param pluginId - Plugin ID to never suggest again
 */
export declare function addToNeverSuggest(pluginId: string): void;
/**
 * Increment the ignored recommendation count.
 * After MAX_IGNORED_COUNT ignores, recommendations are disabled.
 */
export declare function incrementIgnoredCount(): void;
/**
 * Check if LSP recommendations are disabled.
 * Disabled when:
 * - User explicitly disabled via config
 * - User has ignored MAX_IGNORED_COUNT recommendations
 */
export declare function isLspRecommendationsDisabled(): boolean;
/**
 * Reset the ignored count (useful if user re-enables recommendations)
 */
export declare function resetIgnoredCount(): void;
//# sourceMappingURL=lspRecommendation.d.ts.map