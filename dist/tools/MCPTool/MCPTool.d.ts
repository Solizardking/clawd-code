import { z } from 'zod/v4';
import type { PermissionResult } from '../../utils/permissions/PermissionResult.js';
import { renderToolResultMessage, renderToolUseMessage, renderToolUseProgressMessage } from './UI.js';
export declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
export declare const outputSchema: () => any;
type OutputSchema = ReturnType<typeof outputSchema>;
export type Output = z.infer<OutputSchema>;
export type { MCPProgress } from '../../types/tools.js';
export declare const MCPTool: Omit<{
    isMcp: true;
    isOpenWorld(): false;
    name: string;
    maxResultSizeChars: number;
    description(): Promise<string>;
    prompt(): Promise<string>;
    readonly inputSchema: InputSchema;
    readonly outputSchema: OutputSchema;
    call(): Promise<{
        data: string;
    }>;
    checkPermissions(): Promise<PermissionResult>;
    renderToolUseMessage: typeof renderToolUseMessage;
    userFacingName: () => string;
    renderToolUseProgressMessage: typeof renderToolUseProgressMessage;
    renderToolResultMessage: typeof renderToolResultMessage;
    isResultTruncated(output: Output): boolean;
    mapToolResultToToolResultBlockParam(content: z.infer<any>, toolUseID: string): {
        tool_use_id: string;
        type: string;
        content: z.infer<any>;
    };
}, "isEnabled" | "isConcurrencySafe" | "isReadOnly" | "isDestructive" | "checkPermissions" | "toAutoClassifierInput" | "userFacingName"> & {
    isEnabled: () => boolean;
    isConcurrencySafe: (_input?: unknown) => boolean;
    isReadOnly: (_input?: unknown) => boolean;
    isDestructive: (_input?: unknown) => boolean;
    checkPermissions: () => Promise<PermissionResult>;
    toAutoClassifierInput: (_input?: unknown) => string;
    userFacingName: () => string;
};
//# sourceMappingURL=MCPTool.d.ts.map