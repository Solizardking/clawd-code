import { VALID_INSTALLABLE_SCOPES, VALID_UPDATE_SCOPES } from '../../services/plugins/pluginCliCommands.js';
export { VALID_INSTALLABLE_SCOPES, VALID_UPDATE_SCOPES };
/**
 * Helper function to handle marketplace command errors consistently.
 */
export declare function handleMarketplaceError(error: unknown, action: string): never;
export declare function pluginValidateHandler(manifestPath: string, options: {
    cowork?: boolean;
}): Promise<void>;
export declare function pluginListHandler(options: {
    json?: boolean;
    available?: boolean;
    cowork?: boolean;
}): Promise<void>;
export declare function marketplaceAddHandler(source: string, options: {
    cowork?: boolean;
    sparse?: string[];
    scope?: string;
}): Promise<void>;
export declare function marketplaceListHandler(options: {
    json?: boolean;
    cowork?: boolean;
}): Promise<void>;
export declare function marketplaceRemoveHandler(name: string, options: {
    cowork?: boolean;
}): Promise<void>;
export declare function marketplaceUpdateHandler(name: string | undefined, options: {
    cowork?: boolean;
}): Promise<void>;
export declare function pluginInstallHandler(plugin: string, options: {
    scope?: string;
    cowork?: boolean;
}): Promise<void>;
export declare function pluginUninstallHandler(plugin: string, options: {
    scope?: string;
    cowork?: boolean;
    keepData?: boolean;
}): Promise<void>;
export declare function pluginEnableHandler(plugin: string, options: {
    scope?: string;
    cowork?: boolean;
}): Promise<void>;
export declare function pluginDisableHandler(plugin: string | undefined, options: {
    scope?: string;
    cowork?: boolean;
    all?: boolean;
}): Promise<void>;
export declare function pluginUpdateHandler(plugin: string, options: {
    scope?: string;
    cowork?: boolean;
}): Promise<void>;
//# sourceMappingURL=plugins.d.ts.map