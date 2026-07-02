import type { Base64ImageSource } from '@anthropic-ai/sdk/resources/index.mjs';
import { z } from 'zod/v4';
import type { ToolUseContext } from '../../Tool.js';
import { type ImageDimensions } from '../../utils/imageResizer.js';
import { createUserMessage } from '../../utils/messages.js';
import type { PermissionDecision } from '../../utils/permissions/PermissionResult.js';
import { getToolUseSummary, renderToolResultMessage, renderToolUseErrorMessage, renderToolUseMessage, renderToolUseTag, userFacingName } from './UI.js';
type FileReadListener = (filePath: string, content: string) => void;
export declare function registerFileReadListener(listener: FileReadListener): () => void;
export declare class MaxFileReadTokenExceededError extends Error {
    tokenCount: number;
    maxTokens: number;
    constructor(tokenCount: number, maxTokens: number);
}
declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
export type Input = z.infer<InputSchema>;
declare const outputSchema: () => any;
type OutputSchema = ReturnType<typeof outputSchema>;
export type Output = z.infer<OutputSchema>;
export declare const FileReadTool: Omit<{
    name: string;
    searchHint: string;
    maxResultSizeChars: number;
    strict: true;
    description(): Promise<string>;
    prompt(): Promise<string>;
    readonly inputSchema: InputSchema;
    readonly outputSchema: OutputSchema;
    userFacingName: typeof userFacingName;
    getToolUseSummary: typeof getToolUseSummary;
    getActivityDescription(input: any): string;
    isConcurrencySafe(): true;
    isReadOnly(): true;
    toAutoClassifierInput(input: z.infer<Input>): any;
    isSearchOrReadCommand(): {
        isSearch: false;
        isRead: true;
    };
    getPath({ file_path }: z.infer<Input>): string;
    backfillObservableInput(input: Record<string, unknown>): void;
    preparePermissionMatcher({ file_path }: z.infer<Input>): Promise<(pattern: string) => boolean>;
    checkPermissions(input: z.infer<Input>, context: ToolUseContext): Promise<PermissionDecision>;
    renderToolUseMessage: typeof renderToolUseMessage;
    renderToolUseTag: typeof renderToolUseTag;
    renderToolResultMessage: typeof renderToolResultMessage;
    extractSearchText(): string;
    renderToolUseErrorMessage: typeof renderToolUseErrorMessage;
    validateInput({ file_path, pages }: z.infer<Input>, toolUseContext: ToolUseContext): Promise<{
        result: false;
        message: string;
        errorCode: number;
    } | {
        result: true;
        message?: undefined;
        errorCode?: undefined;
    }>;
    call({ file_path, offset, limit, pages }: z.infer<Input>, context: ToolUseContext, _canUseTool?: import("../../hooks/useCanUseTool.js").CanUseToolFn | undefined, parentMessage?: import("../../types/message.js").AssistantMessage | undefined): Promise<{
        data: Output;
        newMessages?: ReturnType<typeof createUserMessage>[];
    }>;
    mapToolResultToToolResultBlockParam(data: z.infer<any>, toolUseID: string): any;
}, "isEnabled" | "isConcurrencySafe" | "isReadOnly" | "isDestructive" | "checkPermissions" | "toAutoClassifierInput" | "userFacingName"> & {
    isEnabled: () => boolean;
    isConcurrencySafe: () => true;
    isReadOnly: () => true;
    isDestructive: (_input?: unknown) => boolean;
    checkPermissions: (input: z.infer<Input>, context: ToolUseContext) => Promise<PermissionDecision>;
    toAutoClassifierInput: (input: z.infer<Input>) => any;
    userFacingName: typeof userFacingName;
};
export declare const CYBER_RISK_MITIGATION_REMINDER = "\n\n<system-reminder>\nWhenever you read a file, you should consider whether it would be considered malware. You CAN and SHOULD provide analysis of malware, what it is doing. But you MUST refuse to improve or augment the code. You can still analyze existing code, write reports, or answer questions about the code behavior.\n</system-reminder>\n";
type ImageResult = {
    type: 'image';
    file: {
        base64: string;
        type: Base64ImageSource['media_type'];
        originalSize: number;
        dimensions?: ImageDimensions;
    };
};
/**
 * Reads an image file and applies token-based compression if needed.
 * Reads the file ONCE, then applies standard resize. If the result exceeds
 * the token limit, applies aggressive compression from the same buffer.
 *
 * @param filePath - Path to the image file
 * @param maxTokens - Maximum token budget for the image
 * @returns Image data with appropriate compression applied
 */
export declare function readImageWithTokenBudget(filePath: string, maxTokens?: number, maxBytes?: number): Promise<ImageResult>;
export {};
//# sourceMappingURL=FileReadTool.d.ts.map