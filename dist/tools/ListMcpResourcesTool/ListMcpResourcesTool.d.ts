import { z } from 'zod/v4';
import { renderToolResultMessage, renderToolUseMessage } from './UI.js';
declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
declare const outputSchema: () => any;
type OutputSchema = ReturnType<typeof outputSchema>;
export type Output = z.infer<OutputSchema>;
export declare const ListMcpResourcesTool: Omit<{
    isConcurrencySafe(): true;
    isReadOnly(): true;
    toAutoClassifierInput(input: z.infer<Input>): any;
    shouldDefer: true;
    name: string;
    searchHint: string;
    maxResultSizeChars: number;
    description(): Promise<string>;
    prompt(): Promise<string>;
    readonly inputSchema: InputSchema;
    readonly outputSchema: OutputSchema;
    call(input: z.infer<Input>, { options: { mcpClients } }: import("../../Tool.js").ToolUseContext): Promise<{
        data: any[];
    }>;
    renderToolUseMessage: typeof renderToolUseMessage;
    userFacingName: () => string;
    renderToolResultMessage: typeof renderToolResultMessage;
    isResultTruncated(output: Output): boolean;
    mapToolResultToToolResultBlockParam(content: z.infer<any>, toolUseID: string): {
        tool_use_id: string;
        type: string;
        content: string;
    };
}, "isEnabled" | "isConcurrencySafe" | "isReadOnly" | "isDestructive" | "checkPermissions" | "toAutoClassifierInput" | "userFacingName"> & {
    isEnabled: () => boolean;
    isConcurrencySafe: () => true;
    isReadOnly: () => true;
    isDestructive: (_input?: unknown) => boolean;
    checkPermissions: (input: {
        [key: string]: unknown;
    }, _ctx?: import("../../Tool.js").ToolUseContext) => Promise<import("../../types/permissions.js").PermissionResult>;
    toAutoClassifierInput: (input: z.infer<Input>) => any;
    userFacingName: () => string;
};
export {};
//# sourceMappingURL=ListMcpResourcesTool.d.ts.map