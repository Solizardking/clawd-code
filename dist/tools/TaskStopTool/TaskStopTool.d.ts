import { z } from 'zod/v4';
import { renderToolResultMessage, renderToolUseMessage } from './UI.js';
declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
declare const outputSchema: () => any;
type OutputSchema = ReturnType<typeof outputSchema>;
export type Output = z.infer<OutputSchema>;
export declare const TaskStopTool: Omit<{
    name: string;
    searchHint: string;
    aliases: string[];
    maxResultSizeChars: number;
    userFacingName: () => "" | "Stop Task";
    readonly inputSchema: InputSchema;
    readonly outputSchema: OutputSchema;
    shouldDefer: true;
    isConcurrencySafe(): true;
    toAutoClassifierInput(input: z.infer<Input>): any;
    validateInput({ task_id, shell_id }: z.infer<Input>, { getAppState }: import("../../Tool.js").ToolUseContext): Promise<{
        result: false;
        message: string;
        errorCode: number;
    } | {
        result: true;
        message?: undefined;
        errorCode?: undefined;
    }>;
    description(): Promise<string>;
    prompt(): Promise<string>;
    mapToolResultToToolResultBlockParam(output: z.infer<any>, toolUseID: string): {
        tool_use_id: string;
        type: string;
        content: string;
    };
    renderToolUseMessage: typeof renderToolUseMessage;
    renderToolResultMessage: typeof renderToolResultMessage;
    call({ task_id, shell_id }: z.infer<Input>, { getAppState, setAppState, abortController }: import("../../Tool.js").ToolUseContext): Promise<{
        data: {
            message: string;
            task_id: string;
            task_type: string;
            command: string | undefined;
        };
    }>;
}, "isEnabled" | "isConcurrencySafe" | "isReadOnly" | "isDestructive" | "checkPermissions" | "toAutoClassifierInput" | "userFacingName"> & {
    isEnabled: () => boolean;
    isConcurrencySafe: () => true;
    isReadOnly: (_input?: unknown) => boolean;
    isDestructive: (_input?: unknown) => boolean;
    checkPermissions: (input: {
        [key: string]: unknown;
    }, _ctx?: import("../../Tool.js").ToolUseContext) => Promise<import("../../types/permissions.js").PermissionResult>;
    toAutoClassifierInput: (input: z.infer<Input>) => any;
    userFacingName: () => "" | "Stop Task";
};
export {};
//# sourceMappingURL=TaskStopTool.d.ts.map