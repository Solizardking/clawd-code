export type CommandSpec = {
    name: string;
    description?: string;
    subcommands?: CommandSpec[];
    args?: Argument | Argument[];
    options?: Option[];
};
export type Argument = {
    name?: string;
    description?: string;
    isDangerous?: boolean;
    isVariadic?: boolean;
    isOptional?: boolean;
    isCommand?: boolean;
    isModule?: string | boolean;
    isScript?: boolean;
};
export type Option = {
    name: string | string[];
    description?: string;
    args?: Argument | Argument[];
    isRequired?: boolean;
};
export declare function loadFigSpec(command: string): Promise<CommandSpec | null>;
export declare const getCommandSpec: {
    (command: string): Promise<CommandSpec | null>;
    cache: {
        clear: () => void;
        size: () => number;
        delete: (key: string) => boolean;
        get: (key: string) => Promise<CommandSpec | null> | undefined;
        has: (key: string) => boolean;
    };
};
//# sourceMappingURL=registry.d.ts.map