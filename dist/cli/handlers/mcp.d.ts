/**
 * MCP subcommand handlers — extracted from main.tsx for lazy loading.
 * These are dynamically imported only when the corresponding `claude mcp *` command runs.
 */
export declare function mcpServeHandler({ debug, verbose }: {
    debug?: boolean;
    verbose?: boolean;
}): Promise<void>;
export declare function mcpRemoveHandler(name: string, options: {
    scope?: string;
}): Promise<void>;
export declare function mcpListHandler(): Promise<void>;
export declare function mcpGetHandler(name: string): Promise<void>;
export declare function mcpAddJsonHandler(name: string, json: string, options: {
    scope?: string;
    clientSecret?: true;
}): Promise<void>;
export declare function mcpAddFromDesktopHandler(options: {
    scope?: string;
}): Promise<void>;
export declare function mcpResetChoicesHandler(): Promise<void>;
//# sourceMappingURL=mcp.d.ts.map