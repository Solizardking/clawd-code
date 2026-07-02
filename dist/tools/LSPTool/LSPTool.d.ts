import { z } from 'zod/v4';
import type { ValidationResult } from '../../Tool.js';
import type { PermissionDecision } from '../../utils/permissions/PermissionResult.js';
import { renderToolResultMessage, renderToolUseErrorMessage, renderToolUseMessage, userFacingName } from './UI.js';
/**
 * Tool-compatible input schema (regular ZodObject instead of discriminated union)
 * We validate against the discriminated union in validateInput for better error messages
 */
declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
declare const outputSchema: () => any;
type OutputSchema = ReturnType<typeof outputSchema>;
export type Output = z.infer<OutputSchema>;
export type Input = z.infer<InputSchema>;
export declare const LSPTool: Omit<{
    name: "LSP";
    searchHint: string;
    maxResultSizeChars: number;
    isLsp: true;
    description(): Promise<string>;
    userFacingName: typeof userFacingName;
    shouldDefer: true;
    isEnabled(): boolean;
    readonly inputSchema: InputSchema;
    readonly outputSchema: OutputSchema;
    isConcurrencySafe(): true;
    isReadOnly(): true;
    getPath({ filePath }: z.infer<Input>): string;
    validateInput(input: Input): Promise<ValidationResult>;
    checkPermissions(input: z.infer<Input>, context: import("../../Tool.js").ToolUseContext): Promise<PermissionDecision>;
    prompt(): Promise<string>;
    renderToolUseMessage: typeof renderToolUseMessage;
    renderToolUseErrorMessage: typeof renderToolUseErrorMessage;
    renderToolResultMessage: typeof renderToolResultMessage;
    call(input: Input, _context: import("../../Tool.js").ToolUseContext): Promise<{
        data: z.infer<any>;
    }>;
    mapToolResultToToolResultBlockParam(output: z.infer<any>, toolUseID: string): {
        tool_use_id: string;
        type: string;
        content: any;
    };
}, "isEnabled" | "isConcurrencySafe" | "isReadOnly" | "isDestructive" | "checkPermissions" | "toAutoClassifierInput" | "userFacingName"> & {
    isEnabled: () => boolean;
    isConcurrencySafe: () => true;
    isReadOnly: () => true;
    isDestructive: (_input?: unknown) => boolean;
    checkPermissions: (input: z.infer<Input>, context: import("../../Tool.js").ToolUseContext) => Promise<PermissionDecision>;
    toAutoClassifierInput: (_input?: unknown) => string;
    userFacingName: typeof userFacingName;
};
export {};
//# sourceMappingURL=LSPTool.d.ts.map