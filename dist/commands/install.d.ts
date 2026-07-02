import type { CommandResultDisplay } from 'src/commands.js';
export declare const install: {
    type: "local-jsx";
    name: string;
    description: string;
    argumentHint: string;
    call(onDone: (result: string, options?: {
        display?: CommandResultDisplay;
    }) => void, _context: unknown, args: string[]): Promise<void>;
};
//# sourceMappingURL=install.d.ts.map