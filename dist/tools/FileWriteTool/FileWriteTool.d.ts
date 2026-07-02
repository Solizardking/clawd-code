import { z } from 'zod/v4';
import type { ToolUseContext } from '../../Tool.js';
import { type ToolUseDiff } from '../../utils/gitDiff.js';
import type { PermissionDecision } from '../../utils/permissions/PermissionResult.js';
import { getToolUseSummary, isResultTruncated, renderToolResultMessage, renderToolUseErrorMessage, renderToolUseMessage, renderToolUseRejectedMessage, userFacingName } from './UI.js';
declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
declare const outputSchema: () => any;
type OutputSchema = ReturnType<typeof outputSchema>;
export type Output = z.infer<OutputSchema>;
export type FileWriteToolInput = InputSchema;
export declare const FileWriteTool: Omit<{
    name: string;
    searchHint: string;
    maxResultSizeChars: number;
    strict: true;
    description(): Promise<string>;
    userFacingName: typeof userFacingName;
    getToolUseSummary: typeof getToolUseSummary;
    getActivityDescription(input: any): string;
    prompt(): Promise<string>;
    renderToolUseMessage: typeof renderToolUseMessage;
    isResultTruncated: typeof isResultTruncated;
    readonly inputSchema: InputSchema;
    readonly outputSchema: OutputSchema;
    toAutoClassifierInput(input: z.infer<Input>): string;
    getPath(input: z.infer<Input>): string;
    backfillObservableInput(input: Record<string, unknown>): void;
    preparePermissionMatcher({ file_path }: z.infer<Input>): Promise<(pattern: string) => boolean>;
    checkPermissions(input: z.infer<Input>, context: ToolUseContext): Promise<PermissionDecision>;
    renderToolUseRejectedMessage: typeof renderToolUseRejectedMessage;
    renderToolUseErrorMessage: typeof renderToolUseErrorMessage;
    renderToolResultMessage: typeof renderToolResultMessage;
    extractSearchText(): string;
    validateInput({ file_path, content }: z.infer<Input>, toolUseContext: ToolUseContext): Promise<{
        result: false;
        message: string;
        errorCode: number;
    } | {
        result: true;
        message?: undefined;
        errorCode?: undefined;
    }>;
    call({ file_path, content }: z.infer<Input>, { readFileState, updateFileHistoryState, dynamicSkillDirTriggers }: ToolUseContext, _: import("../../hooks/useCanUseTool.js").CanUseToolFn, parentMessage: import("../../types/message.js").AssistantMessage): Promise<{
        data: {
            gitDiff?: ToolUseDiff | undefined;
            type: "update";
            filePath: z.infer<Input>;
            content: z.infer<Input>;
            structuredPatch: StructuredPatchHunk[];
            originalFile: string;
        };
    } | {
        data: {
            gitDiff?: ToolUseDiff | undefined;
            type: "create";
            filePath: z.infer<Input>;
            content: z.infer<Input>;
            structuredPatch: never[];
            originalFile: null;
        };
    }>;
    mapToolResultToToolResultBlockParam({ filePath, type }: z.infer<any>, toolUseID: string): {
        tool_use_id: string;
        type: string;
        content: string;
    } | undefined;
}, "isEnabled" | "isConcurrencySafe" | "isReadOnly" | "isDestructive" | "checkPermissions" | "toAutoClassifierInput" | "userFacingName"> & {
    isEnabled: () => boolean;
    isConcurrencySafe: (_input?: unknown) => boolean;
    isReadOnly: (_input?: unknown) => boolean;
    isDestructive: (_input?: unknown) => boolean;
    checkPermissions: (input: z.infer<Input>, context: ToolUseContext) => Promise<PermissionDecision>;
    toAutoClassifierInput: (input: z.infer<Input>) => string;
    userFacingName: typeof userFacingName;
};
export {};
//# sourceMappingURL=FileWriteTool.d.ts.map