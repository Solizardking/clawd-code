export type ValidationResult = {
    success: boolean;
    errors: ValidationError[];
    warnings: ValidationWarning[];
    filePath: string;
    fileType: 'plugin' | 'marketplace' | 'skill' | 'agent' | 'command' | 'hooks';
};
export type ValidationError = {
    path: string;
    message: string;
    code?: string;
};
export type ValidationWarning = {
    path: string;
    message: string;
};
/**
 * Validate a plugin manifest file (plugin.json)
 */
export declare function validatePluginManifest(filePath: string): Promise<ValidationResult>;
/**
 * Validate a marketplace manifest file (marketplace.json)
 */
export declare function validateMarketplaceManifest(filePath: string): Promise<ValidationResult>;
/**
 * Validate the content files inside a plugin directory — skills, agents,
 * commands, and hooks.json. Scans the default component directories (the
 * manifest can declare custom paths but the default layout covers the vast
 * majority of plugins; this is a linter, not a loader).
 *
 * Returns one ValidationResult per file that has errors or warnings. A clean
 * plugin returns an empty array.
 */
export declare function validatePluginContents(pluginDir: string): Promise<ValidationResult[]>;
/**
 * Validate a manifest file or directory (auto-detects type)
 */
export declare function validateManifest(filePath: string): Promise<ValidationResult>;
//# sourceMappingURL=validatePlugin.d.ts.map