import type { PermissionResult } from 'src/utils/permissions/PermissionResult.js';
import { z } from 'zod/v4';
import { getToolUseSummary, renderToolResultMessage, renderToolUseMessage, renderToolUseProgressMessage } from './UI.js';
declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
declare const searchResultSchema: () => any;
export type SearchResult = z.infer<ReturnType<typeof searchResultSchema>>;
declare const outputSchema: () => any;
type OutputSchema = ReturnType<typeof outputSchema>;
export type Output = z.infer<OutputSchema>;
export type { WebSearchProgress } from '../../types/tools.js';
export declare const WebSearchTool: Omit<{
    name: string;
    searchHint: string;
    maxResultSizeChars: number;
    shouldDefer: true;
    description(input: z.infer<Input>): Promise<string>;
    userFacingName(): string;
    getToolUseSummary: typeof getToolUseSummary;
    getActivityDescription(input: any): string;
    isEnabled(): boolean;
    readonly inputSchema: InputSchema;
    readonly outputSchema: OutputSchema;
    isConcurrencySafe(): true;
    isReadOnly(): true;
    toAutoClassifierInput(input: z.infer<Input>): any;
    checkPermissions(_input: z.infer<Input>): Promise<PermissionResult>;
    prompt(): Promise<string>;
    renderToolUseMessage: typeof renderToolUseMessage;
    renderToolUseProgressMessage: typeof renderToolUseProgressMessage;
    renderToolResultMessage: typeof renderToolResultMessage;
    extractSearchText(): string;
    validateInput(input: z.infer<Input>): Promise<{
        result: false;
        message: string;
        errorCode: number;
    } | {
        result: true;
        message?: undefined;
        errorCode?: undefined;
    }>;
    call(input: z.infer<Input>, context: import("../../Tool.js").ToolUseContext, _canUseTool: import("../../hooks/useCanUseTool.js").CanUseToolFn, _parentMessage: import("../../types/message.js").AssistantMessage, onProgress: import("../../Tool.js").ToolCallProgress<WebSearchProgress> | undefined): Promise<{
        data: z.infer<any>;
    }>;
    mapToolResultToToolResultBlockParam(output: z.infer<any>, toolUseID: string): {
        tool_use_id: string;
        type: string;
        content: string;
    };
}, "isEnabled" | "isConcurrencySafe" | "isReadOnly" | "isDestructive" | "checkPermissions" | "toAutoClassifierInput" | "userFacingName"> & {
    isEnabled: () => boolean;
    isConcurrencySafe: () => true;
    isReadOnly: () => true;
    isDestructive: (_input?: unknown) => boolean;
    checkPermissions: (_input: z.infer<Input>) => Promise<PermissionResult>;
    toAutoClassifierInput: (input: z.infer<Input>) => any;
    userFacingName: () => string;
};
//# sourceMappingURL=WebSearchTool.d.ts.map