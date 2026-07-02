import { z } from 'zod/v4';
import { type ToolUseContext } from '../../Tool.js';
import type { PermissionDecision } from '../../utils/permissions/PermissionResult.js';
import { getToolUseSummary, renderToolResultMessage, renderToolUseErrorMessage, renderToolUseMessage, renderToolUseRejectedMessage } from './UI.js';
export declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
export declare const outputSchema: () => any;
type OutputSchema = ReturnType<typeof outputSchema>;
export type Output = z.infer<OutputSchema>;
export declare const NotebookEditTool: Omit<{
    name: string;
    searchHint: string;
    maxResultSizeChars: number;
    shouldDefer: true;
    description(): Promise<string>;
    prompt(): Promise<string>;
    userFacingName(): string;
    getToolUseSummary: typeof getToolUseSummary;
    getActivityDescription(input: any): string;
    readonly inputSchema: InputSchema;
    readonly outputSchema: OutputSchema;
    toAutoClassifierInput(input: z.infer<Input>): string;
    getPath(input: z.infer<Input>): string;
    checkPermissions(input: z.infer<Input>, context: ToolUseContext): Promise<PermissionDecision>;
    mapToolResultToToolResultBlockParam({ cell_id, edit_mode, new_source, error }: z.infer<any>, toolUseID: string): {
        tool_use_id: string;
        type: string;
        content: any;
        is_error: boolean;
    } | {
        tool_use_id: string;
        type: string;
        content: string;
        is_error?: undefined;
    };
    renderToolUseMessage: typeof renderToolUseMessage;
    renderToolUseRejectedMessage: typeof renderToolUseRejectedMessage;
    renderToolUseErrorMessage: typeof renderToolUseErrorMessage;
    renderToolResultMessage: typeof renderToolResultMessage;
    validateInput({ notebook_path, cell_type, cell_id, edit_mode }: z.infer<Input>, toolUseContext: ToolUseContext): Promise<{
        result: true;
        message?: undefined;
        errorCode?: undefined;
    } | {
        result: false;
        message: string;
        errorCode: number;
    }>;
    call({ notebook_path, new_source, cell_id, cell_type, edit_mode: originalEditMode, }: z.infer<Input>, { readFileState, updateFileHistoryState }: ToolUseContext, _: import("../../hooks/useCanUseTool.js").CanUseToolFn, parentMessage: import("../../types/message.js").AssistantMessage): Promise<{
        data: {
            new_source: z.infer<Input>;
            cell_type: any;
            language: any;
            edit_mode: any;
            cell_id: any;
            error: string;
            notebook_path: any;
            original_file: string;
            updated_file: string;
        };
    }>;
}, "isEnabled" | "isConcurrencySafe" | "isReadOnly" | "isDestructive" | "checkPermissions" | "toAutoClassifierInput" | "userFacingName"> & {
    isEnabled: () => boolean;
    isConcurrencySafe: (_input?: unknown) => boolean;
    isReadOnly: (_input?: unknown) => boolean;
    isDestructive: (_input?: unknown) => boolean;
    checkPermissions: (input: z.infer<Input>, context: ToolUseContext) => Promise<PermissionDecision>;
    toAutoClassifierInput: (input: z.infer<Input>) => string;
    userFacingName: () => string;
};
export {};
//# sourceMappingURL=NotebookEditTool.d.ts.map