export type ParsedCommand = {
    type: 'menu';
} | {
    type: 'help';
} | {
    type: 'install';
    marketplace?: string;
    plugin?: string;
} | {
    type: 'manage';
} | {
    type: 'uninstall';
    plugin?: string;
} | {
    type: 'enable';
    plugin?: string;
} | {
    type: 'disable';
    plugin?: string;
} | {
    type: 'validate';
    path?: string;
} | {
    type: 'marketplace';
    action?: 'add' | 'remove' | 'update' | 'list';
    target?: string;
};
export declare function parsePluginArgs(args?: string): ParsedCommand;
//# sourceMappingURL=parseArgs.d.ts.map