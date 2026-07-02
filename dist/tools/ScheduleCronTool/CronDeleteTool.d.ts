import { z } from 'zod/v4';
import type { ValidationResult } from '../../Tool.js';
import { renderDeleteResultMessage, renderDeleteToolUseMessage } from './UI.js';
declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
declare const outputSchema: () => any;
type OutputSchema = ReturnType<typeof outputSchema>;
export type DeleteOutput = z.infer<OutputSchema>;
export declare const CronDeleteTool: Omit<{
    name: string;
    searchHint: string;
    maxResultSizeChars: number;
    shouldDefer: true;
    readonly inputSchema: InputSchema;
    readonly outputSchema: OutputSchema;
    isEnabled(): boolean;
    toAutoClassifierInput(input: z.infer<Input>): any;
    description(): Promise<string>;
    prompt(): Promise<string>;
    getPath(): string;
    validateInput(input: z.infer<Input>): Promise<ValidationResult>;
    call({ id }: z.infer<Input>): Promise<{
        data: {
            id: z.infer<Input>;
        };
    }>;
    mapToolResultToToolResultBlockParam(output: z.infer<any>, toolUseID: string): {
        tool_use_id: string;
        type: string;
        content: string;
    };
    renderToolUseMessage: typeof renderDeleteToolUseMessage;
    renderToolResultMessage: typeof renderDeleteResultMessage;
}, "isEnabled" | "isConcurrencySafe" | "isReadOnly" | "isDestructive" | "checkPermissions" | "toAutoClassifierInput" | "userFacingName"> & {
    isEnabled: () => boolean;
    isConcurrencySafe: (_input?: unknown) => boolean;
    isReadOnly: (_input?: unknown) => boolean;
    isDestructive: (_input?: unknown) => boolean;
    checkPermissions: (input: {
        [key: string]: unknown;
    }, _ctx?: import("../../Tool.js").ToolUseContext) => Promise<import("../../types/permissions.js").PermissionResult>;
    toAutoClassifierInput: (input: z.infer<Input>) => any;
    userFacingName: (_input?: unknown) => string;
};
export {};
//# sourceMappingURL=CronDeleteTool.d.ts.map