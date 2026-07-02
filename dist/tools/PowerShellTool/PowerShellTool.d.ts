import type { ToolResultBlockParam } from '@anthropic-ai/sdk/resources/index.mjs';
import type { CanUseToolFn } from 'src/hooks/useCanUseTool.js';
import { z } from 'zod/v4';
import type { Tool, ToolCallProgress, ValidationResult } from '../../Tool.js';
import type { AssistantMessage } from '../../types/message.js';
import type { PermissionResult } from '../../utils/permissions/PermissionResult.js';
import { renderToolResultMessage, renderToolUseErrorMessage, renderToolUseMessage, renderToolUseProgressMessage, renderToolUseQueuedMessage } from './UI.js';
/**
 * PS-flavored port of BashTool's detectBlockedSleepPattern.
 * Catches `Start-Sleep N`, `Start-Sleep -Seconds N`, `sleep N` (built-in alias)
 * as the first statement. Does NOT block `Start-Sleep -Milliseconds` (sub-second
 * pacing is fine) or float seconds (legit rate limiting).
 */
export declare function detectBlockedSleepPattern(command: string): string | null;
declare const fullInputSchema: () => any;
declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
export type PowerShellToolInput = z.infer<ReturnType<typeof fullInputSchema>>;
declare const outputSchema: () => any;
type OutputSchema = ReturnType<typeof outputSchema>;
export type Out = z.infer<OutputSchema>;
import type { PowerShellProgress } from '../../types/tools.js';
export type { PowerShellProgress } from '../../types/tools.js';
export declare const PowerShellTool: Omit<{
    name: "PowerShell";
    searchHint: string;
    maxResultSizeChars: number;
    strict: true;
    description({ description }: Partial<PowerShellToolInput>): Promise<string>;
    prompt(): Promise<string>;
    isConcurrencySafe(input: PowerShellToolInput): boolean;
    isSearchOrReadCommand(input: Partial<PowerShellToolInput>): {
        isSearch: boolean;
        isRead: boolean;
    };
    isReadOnly(input: PowerShellToolInput): boolean;
    toAutoClassifierInput(input: z.infer<Input>): any;
    readonly inputSchema: InputSchema;
    readonly outputSchema: OutputSchema;
    userFacingName(): string;
    getToolUseSummary(input: Partial<PowerShellToolInput> | undefined): string | null;
    getActivityDescription(input: Partial<PowerShellToolInput> | undefined): string;
    isEnabled(): boolean;
    validateInput(input: PowerShellToolInput): Promise<ValidationResult>;
    checkPermissions(input: PowerShellToolInput, context: Parameters<Tool["checkPermissions"]>[1]): Promise<PermissionResult>;
    renderToolUseMessage: typeof renderToolUseMessage;
    renderToolUseProgressMessage: typeof renderToolUseProgressMessage;
    renderToolUseQueuedMessage: typeof renderToolUseQueuedMessage;
    renderToolResultMessage: typeof renderToolResultMessage;
    renderToolUseErrorMessage: typeof renderToolUseErrorMessage;
    mapToolResultToToolResultBlockParam({ interrupted, stdout, stderr, isImage, persistedOutputPath, persistedOutputSize, backgroundTaskId, backgroundedByUser, assistantAutoBackgrounded }: Out, toolUseID: string): ToolResultBlockParam;
    call(input: PowerShellToolInput, toolUseContext: Parameters<Tool["call"]>[1], _canUseTool?: CanUseToolFn, _parentMessage?: AssistantMessage, onProgress?: ToolCallProgress<PowerShellProgress>): Promise<{
        data: Out;
    }>;
    isResultTruncated(output: Out): boolean;
}, "isEnabled" | "isConcurrencySafe" | "isReadOnly" | "isDestructive" | "checkPermissions" | "toAutoClassifierInput" | "userFacingName"> & {
    isEnabled: () => boolean;
    isConcurrencySafe: (input: PowerShellToolInput) => boolean;
    isReadOnly: (input: PowerShellToolInput) => boolean;
    isDestructive: (_input?: unknown) => boolean;
    checkPermissions: (input: PowerShellToolInput, context: Parameters<Tool["checkPermissions"]>[1]) => Promise<PermissionResult>;
    toAutoClassifierInput: (input: z.infer<Input>) => any;
    userFacingName: () => string;
};
//# sourceMappingURL=PowerShellTool.d.ts.map