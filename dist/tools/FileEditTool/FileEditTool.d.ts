import type { ToolUseContext } from '../../Tool.js';
import { type ToolUseDiff } from '../../utils/gitDiff.js';
import type { PermissionDecision } from '../../utils/permissions/PermissionResult.js';
import { type FileEditInput, type FileEditOutput } from './types.js';
import { getToolUseSummary, renderToolResultMessage, renderToolUseErrorMessage, renderToolUseMessage, renderToolUseRejectedMessage, userFacingName } from './UI.js';
export declare const FileEditTool: Omit<{
    name: string;
    searchHint: string;
    maxResultSizeChars: number;
    strict: true;
    description(): Promise<string>;
    prompt(): Promise<string>;
    userFacingName: typeof userFacingName;
    getToolUseSummary: typeof getToolUseSummary;
    getActivityDescription(input: any): string;
    readonly inputSchema: any;
    readonly outputSchema: any;
    toAutoClassifierInput(input: z.infer<Input>): string;
    getPath(input: z.infer<Input>): string;
    backfillObservableInput(input: Record<string, unknown>): void;
    preparePermissionMatcher({ file_path }: z.infer<Input>): Promise<(pattern: string) => boolean>;
    checkPermissions(input: z.infer<Input>, context: ToolUseContext): Promise<PermissionDecision>;
    renderToolUseMessage: typeof renderToolUseMessage;
    renderToolResultMessage: typeof renderToolResultMessage;
    renderToolUseRejectedMessage: typeof renderToolUseRejectedMessage;
    renderToolUseErrorMessage: typeof renderToolUseErrorMessage;
    validateInput(input: FileEditInput, toolUseContext: ToolUseContext): Promise<any>;
    inputsEquivalent(input1: z.infer<Input>, input2: z.infer<Input>): boolean;
    call(input: FileEditInput, { readFileState, userModified, updateFileHistoryState, dynamicSkillDirTriggers, }: ToolUseContext, _: import("../../hooks/useCanUseTool.js").CanUseToolFn, parentMessage: import("../../types/message.js").AssistantMessage): Promise<{
        data: {
            gitDiff?: ToolUseDiff | undefined;
            filePath: z.output<any>;
            oldString: any;
            newString: z.output<any>;
            originalFile: string;
            structuredPatch: StructuredPatchHunk[];
            userModified: boolean;
            replaceAll: z.output<any>;
        };
    }>;
    mapToolResultToToolResultBlockParam(data: FileEditOutput, toolUseID: string): {
        tool_use_id: string;
        type: string;
        content: string;
    };
}, "isEnabled" | "isConcurrencySafe" | "isReadOnly" | "isDestructive" | "checkPermissions" | "toAutoClassifierInput" | "userFacingName"> & {
    isEnabled: () => boolean;
    isConcurrencySafe: (_input?: unknown) => boolean;
    isReadOnly: (_input?: unknown) => boolean;
    isDestructive: (_input?: unknown) => boolean;
    checkPermissions: (input: z.infer<Input>, context: ToolUseContext) => Promise<PermissionDecision>;
    toAutoClassifierInput: (input: z.infer<Input>) => string;
    userFacingName: typeof userFacingName;
};
//# sourceMappingURL=FileEditTool.d.ts.map