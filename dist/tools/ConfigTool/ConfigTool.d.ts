import { z } from 'zod/v4';
import { renderToolResultMessage, renderToolUseMessage, renderToolUseRejectedMessage } from './UI.js';
declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
declare const outputSchema: () => any;
type OutputSchema = ReturnType<typeof outputSchema>;
export type Input = z.infer<InputSchema>;
export type Output = z.infer<OutputSchema>;
export declare const ConfigTool: Omit<{
    name: string;
    searchHint: string;
    maxResultSizeChars: number;
    description(): Promise<string>;
    prompt(): Promise<string>;
    readonly inputSchema: InputSchema;
    readonly outputSchema: OutputSchema;
    userFacingName(): string;
    shouldDefer: true;
    isConcurrencySafe(): true;
    isReadOnly(input: Input): boolean;
    toAutoClassifierInput(input: z.infer<Input>): any;
    checkPermissions(input: Input): Promise<{
        behavior: "allow";
        updatedInput: z.infer<any>;
        message?: undefined;
    } | {
        behavior: "ask";
        message: string;
        updatedInput?: undefined;
    }>;
    renderToolUseMessage: typeof renderToolUseMessage;
    renderToolResultMessage: typeof renderToolResultMessage;
    renderToolUseRejectedMessage: typeof renderToolUseRejectedMessage;
    call({ setting, value }: Input, context: import("../../Tool.js").ToolUseContext): Promise<{
        data: Output;
    }>;
    mapToolResultToToolResultBlockParam(content: Output, toolUseID: string): {
        tool_use_id: string;
        type: "tool_result";
        content: string;
        is_error?: undefined;
    } | {
        tool_use_id: string;
        type: "tool_result";
        content: string;
        is_error: boolean;
    };
}, "isEnabled" | "isConcurrencySafe" | "isReadOnly" | "isDestructive" | "checkPermissions" | "toAutoClassifierInput" | "userFacingName"> & {
    isEnabled: () => boolean;
    isConcurrencySafe: () => true;
    isReadOnly: (input: Input) => boolean;
    isDestructive: (_input?: unknown) => boolean;
    checkPermissions: (input: Input) => Promise<{
        behavior: "allow";
        updatedInput: z.infer<any>;
        message?: undefined;
    } | {
        behavior: "ask";
        message: string;
        updatedInput?: undefined;
    }>;
    toAutoClassifierInput: (input: z.infer<Input>) => any;
    userFacingName: () => string;
};
export {};
//# sourceMappingURL=ConfigTool.d.ts.map