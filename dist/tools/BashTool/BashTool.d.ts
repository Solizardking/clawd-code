import type { ToolResultBlockParam } from '@anthropic-ai/sdk/resources/index.mjs';
import type { CanUseToolFn } from 'src/hooks/useCanUseTool.js';
import { z } from 'zod/v4';
import type { ToolCallProgress, ToolUseContext, ValidationResult } from '../../Tool.js';
import type { AssistantMessage } from '../../types/message.js';
import type { PermissionResult } from '../../utils/permissions/PermissionResult.js';
import { renderToolResultMessage, renderToolUseErrorMessage, renderToolUseMessage, renderToolUseProgressMessage, renderToolUseQueuedMessage } from './UI.js';
/**
 * Checks if a bash command is a search or read operation.
 * Used to determine if the command should be collapsed in the UI.
 * Returns an object indicating whether it's a search or read operation.
 *
 * For pipelines (e.g., `cat file | bq`), ALL parts must be search/read commands
 * for the whole command to be considered collapsible.
 *
 * Semantic-neutral commands (echo, printf, true, false, :) are skipped in any
 * position, as they're pure output/status commands that don't affect the read/search
 * nature of the pipeline (e.g. `ls dir && echo "---" && ls dir2` is still a read).
 */
export declare function isSearchOrReadBashCommand(command: string): {
    isSearch: boolean;
    isRead: boolean;
    isList: boolean;
};
declare const fullInputSchema: () => any;
declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
export type BashToolInput = z.infer<ReturnType<typeof fullInputSchema>>;
declare const outputSchema: () => any;
type OutputSchema = ReturnType<typeof outputSchema>;
export type Out = z.infer<OutputSchema>;
export type { BashProgress } from '../../types/tools.js';
import type { BashProgress } from '../../types/tools.js';
/**
 * Detect standalone or leading `sleep N` patterns that should use Monitor
 * instead. Catches `sleep 5`, `sleep 5 && check`, `sleep 5; check` — but
 * not sleep inside pipelines, subshells, or scripts (those are fine).
 */
export declare function detectBlockedSleepPattern(command: string): string | null;
/**
 * Checks if a command contains tools that shouldn't run in sandbox
 * This includes:
 * - Dynamic config-based disabled commands and substrings (tengu_sandbox_disabled_commands)
 * - User-configured commands from settings.json (sandbox.excludedCommands)
 *
 * User-configured commands support the same pattern syntax as permission rules:
 * - Exact matches: "npm run lint"
 * - Prefix patterns: "npm run test:*"
 */
type SimulatedSedEditResult = {
    data: Out;
};
export declare const BashTool: Omit<{
    name: string;
    searchHint: string;
    maxResultSizeChars: number;
    strict: true;
    description({ description }: z.infer<Input>): Promise<any>;
    prompt(): Promise<string>;
    isConcurrencySafe(input: z.infer<Input>): boolean;
    isReadOnly(input: z.infer<Input>): boolean;
    toAutoClassifierInput(input: z.infer<Input>): any;
    preparePermissionMatcher({ command }: z.infer<Input>): Promise<(pattern: string) => boolean>;
    isSearchOrReadCommand(input: z.infer<Input>): {
        isSearch: boolean;
        isRead: boolean;
        isList: boolean;
    };
    readonly inputSchema: InputSchema;
    readonly outputSchema: OutputSchema;
    userFacingName(input: any): string;
    getToolUseSummary(input: any): any;
    getActivityDescription(input: any): string;
    validateInput(input: BashToolInput): Promise<ValidationResult>;
    checkPermissions(input: z.infer<Input>, context: ToolUseContext): Promise<PermissionResult>;
    renderToolUseMessage: typeof renderToolUseMessage;
    renderToolUseProgressMessage: typeof renderToolUseProgressMessage;
    renderToolUseQueuedMessage: typeof renderToolUseQueuedMessage;
    renderToolResultMessage: typeof renderToolResultMessage;
    extractSearchText({ stdout, stderr }: z.infer<any>): any;
    mapToolResultToToolResultBlockParam({ interrupted, stdout, stderr, isImage, backgroundTaskId, backgroundedByUser, assistantAutoBackgrounded, structuredContent, persistedOutputPath, persistedOutputSize }: z.infer<any>, toolUseID: string): ToolResultBlockParam;
    call(input: BashToolInput, toolUseContext: ToolUseContext, _canUseTool?: CanUseToolFn, parentMessage?: AssistantMessage, onProgress?: ToolCallProgress<BashProgress>): Promise<SimulatedSedEditResult>;
    renderToolUseErrorMessage: typeof renderToolUseErrorMessage;
    isResultTruncated(output: Out): boolean;
}, "isEnabled" | "isConcurrencySafe" | "isReadOnly" | "isDestructive" | "checkPermissions" | "toAutoClassifierInput" | "userFacingName"> & {
    isEnabled: () => boolean;
    isConcurrencySafe: (input: z.infer<Input>) => boolean;
    isReadOnly: (input: z.infer<Input>) => boolean;
    isDestructive: (_input?: unknown) => boolean;
    checkPermissions: (input: z.infer<Input>, context: ToolUseContext) => Promise<PermissionResult>;
    toAutoClassifierInput: (input: z.infer<Input>) => any;
    userFacingName: (input: any) => string;
};
//# sourceMappingURL=BashTool.d.ts.map