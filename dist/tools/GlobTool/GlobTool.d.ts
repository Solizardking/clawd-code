import { z } from 'zod/v4';
import type { ValidationResult } from '../../Tool.js';
import type { PermissionDecision } from '../../utils/permissions/PermissionResult.js';
import { getToolUseSummary, renderToolUseErrorMessage, renderToolUseMessage, userFacingName } from './UI.js';
declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
declare const outputSchema: () => any;
type OutputSchema = ReturnType<typeof outputSchema>;
export type Output = z.infer<OutputSchema>;
export declare const GlobTool: Omit<{
    name: string;
    searchHint: string;
    maxResultSizeChars: number;
    description(): Promise<string>;
    userFacingName: typeof userFacingName;
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
    renderToolResultMessage: typeof import("../GrepTool/UI.js").renderToolResultMessage;
    extractSearchText({ filenames }: z.infer<any>): any;
    call(input: z.infer<Input>, { abortController, getAppState, globLimits }: import("../../Tool.js").ToolUseContext): Promise<{
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
    checkPermissions: (input: z.infer<Input>, context: import("../../Tool.js").ToolUseContext) => Promise<PermissionDecision>;
    toAutoClassifierInput: (input: z.infer<Input>) => any;
    userFacingName: typeof userFacingName;
};
export {};
//# sourceMappingURL=GlobTool.d.ts.map