import type { ValidationResult } from '../../Tool.js';
import type { PermissionDecision } from '../../utils/permissions/PermissionResult.js';
import { getToolUseSummary, renderToolResultMessage, renderToolUseErrorMessage, renderToolUseMessage } from './UI.js';
declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
declare const outputSchema: () => any;
type OutputSchema = ReturnType<typeof outputSchema>;
export declare const GrepTool: Omit<{
    name: string;
    searchHint: string;
    maxResultSizeChars: number;
    strict: true;
    description(): Promise<string>;
    userFacingName(): string;
    getToolUseSummary: typeof getToolUseSummary;
    getActivityDescription(input: any): string;
    readonly inputSchema: InputSchema;
    readonly outputSchema: OutputSchema;
    isConcurrencySafe(): true;
    isReadOnly(): true;
    toAutoClassifierInput(input: z.infer<Input>): any;
    isSearchOrReadCommand(): {
        isSearch: true;
        isRead: false;
    };
    getPath({ path }: z.infer<Input>): string;
    preparePermissionMatcher({ pattern }: z.infer<Input>): Promise<(rulePattern: string) => boolean>;
    validateInput({ path }: z.infer<Input>): Promise<ValidationResult>;
    checkPermissions(input: z.infer<Input>, context: import("../../Tool.js").ToolUseContext): Promise<PermissionDecision>;
    prompt(): Promise<string>;
    renderToolUseMessage: typeof renderToolUseMessage;
    renderToolUseErrorMessage: typeof renderToolUseErrorMessage;
    renderToolResultMessage: typeof renderToolResultMessage;
    extractSearchText({ mode, content, filenames }: z.infer<any>): any;
    mapToolResultToToolResultBlockParam({ mode, numFiles, filenames, content, numLines: _numLines, numMatches, appliedLimit, appliedOffset, }: z.infer<any>, toolUseID: string): {
        tool_use_id: string;
        type: string;
        content: any;
    };
    call({ pattern, path, glob, type, output_mode, "-B": context_before, "-A": context_after, "-C": context_c, context, "-n": show_line_numbers, "-i": case_insensitive, head_limit, offset, multiline, }: z.infer<Input>, { abortController, getAppState }: import("../../Tool.js").ToolUseContext): Promise<{
        data: {
            appliedOffset?: any;
            appliedLimit?: number | undefined;
            mode: "content";
            numFiles: number;
            filenames: never[];
            content: string;
            numLines: number;
        };
    } | {
        data: {
            appliedOffset?: any;
            appliedLimit?: number | undefined;
            mode: "count";
            numFiles: number;
            filenames: never[];
            content: string;
            numMatches: number;
        };
    } | {
        data: {
            appliedOffset?: any;
            appliedLimit?: number | undefined;
            mode: "files_with_matches";
            filenames: string[];
            numFiles: number;
        };
    }>;
}, "isEnabled" | "isConcurrencySafe" | "isReadOnly" | "isDestructive" | "checkPermissions" | "toAutoClassifierInput" | "userFacingName"> & {
    isEnabled: () => boolean;
    isConcurrencySafe: () => true;
    isReadOnly: () => true;
    isDestructive: (_input?: unknown) => boolean;
    checkPermissions: (input: z.infer<Input>, context: import("../../Tool.js").ToolUseContext) => Promise<PermissionDecision>;
    toAutoClassifierInput: (input: z.infer<Input>) => any;
    userFacingName: () => string;
};
export {};
//# sourceMappingURL=GrepTool.d.ts.map