import type { CommandSpec } from '../registry.js';
declare const _default: (CommandSpec | {
    name: string;
    description: string;
    options: ({
        name: string[];
        description: string;
        args?: undefined;
    } | {
        name: string;
        description: string;
        args?: undefined;
    } | {
        name: string[];
        description: string;
        args: {
            name: string;
            isOptional?: undefined;
        };
    } | {
        name: string;
        description: string;
        args: {
            name: string;
            isOptional?: undefined;
        };
    } | {
        name: string;
        description: string;
        args: {
            name: string;
            isOptional: true;
        };
    })[];
    args: {
        name: string;
        description: string;
        isVariadic: true;
        isOptional: true;
    };
})[];
export default _default;
//# sourceMappingURL=index.d.ts.map