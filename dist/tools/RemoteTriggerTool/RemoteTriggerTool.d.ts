import { z } from 'zod/v4';
import type { ToolUseContext } from '../../Tool.js';
import { renderToolResultMessage, renderToolUseMessage } from './UI.js';
declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
export type Input = z.infer<InputSchema>;
declare const outputSchema: () => any;
type OutputSchema = ReturnType<typeof outputSchema>;
export type Output = z.infer<OutputSchema>;
export declare const RemoteTriggerTool: Omit<{
    name: string;
    searchHint: string;
    maxResultSizeChars: number;
    shouldDefer: true;
    readonly inputSchema: InputSchema;
    readonly outputSchema: OutputSchema;
    isEnabled(): false;
    isConcurrencySafe(): true;
    isReadOnly(input: Input): boolean;
    toAutoClassifierInput(input: Input): string;
    description(): Promise<string>;
    prompt(): Promise<string>;
    call(input: Input, context: ToolUseContext): Promise<{
        data: {
            status: any;
            json: string;
        };
    }>;
    mapToolResultToToolResultBlockParam(output: z.infer<any>, toolUseID: string): {
        tool_use_id: string;
        type: string;
        content: string;
    };
    renderToolUseMessage: typeof renderToolUseMessage;
    renderToolResultMessage: typeof renderToolResultMessage;
}, "isEnabled" | "isConcurrencySafe" | "isReadOnly" | "isDestructive" | "checkPermissions" | "toAutoClassifierInput" | "userFacingName"> & {
    isEnabled: () => false;
    isConcurrencySafe: () => true;
    isReadOnly: (input: Input) => boolean;
    isDestructive: (_input?: unknown) => boolean;
    checkPermissions: (input: {
        [key: string]: unknown;
    }, _ctx?: ToolUseContext) => Promise<import("../../types/permissions.js").PermissionResult>;
    toAutoClassifierInput: (input: Input) => string;
    userFacingName: (_input?: unknown) => string;
};
export {};
//# sourceMappingURL=RemoteTriggerTool.d.ts.map