import { z } from 'zod/v4';
import type { Tool } from '../../Tool.js';
import type { PermissionResult } from '../../utils/permissions/PermissionResult.js';
declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
declare const outputSchema: () => any;
type OutputSchema = ReturnType<typeof outputSchema>;
export type Output = z.infer<OutputSchema>;
export declare const SYNTHETIC_OUTPUT_TOOL_NAME = "StructuredOutput";
export declare function isSyntheticOutputToolEnabled(opts: {
    isNonInteractiveSession: boolean;
}): boolean;
export declare const SyntheticOutputTool: Omit<{
    isMcp: false;
    isEnabled(): true;
    isConcurrencySafe(): true;
    isReadOnly(): true;
    isOpenWorld(): false;
    name: string;
    searchHint: string;
    maxResultSizeChars: number;
    description(): Promise<string>;
    prompt(): Promise<string>;
    readonly inputSchema: InputSchema;
    readonly outputSchema: OutputSchema;
    call(input: z.infer<Input>): Promise<{
        data: string;
        structured_output: z.infer<Input>;
    }>;
    checkPermissions(input: z.infer<Input>): Promise<PermissionResult>;
    renderToolUseMessage(input: Record<string, unknown>): string | null;
    renderToolUseRejectedMessage(): string;
    renderToolUseErrorMessage(): string;
    renderToolUseProgressMessage(): null;
    renderToolResultMessage(output: string): string;
    mapToolResultToToolResultBlockParam(content: string, toolUseID: string): {
        tool_use_id: string;
        type: "tool_result";
        content: string;
    };
}, "isEnabled" | "isConcurrencySafe" | "isReadOnly" | "isDestructive" | "checkPermissions" | "toAutoClassifierInput" | "userFacingName"> & {
    isEnabled: () => true;
    isConcurrencySafe: () => true;
    isReadOnly: () => true;
    isDestructive: (_input?: unknown) => boolean;
    checkPermissions: (input: z.infer<Input>) => Promise<PermissionResult>;
    toAutoClassifierInput: (_input?: unknown) => string;
    userFacingName: (_input?: unknown) => string;
};
type CreateResult = {
    tool: Tool<InputSchema>;
} | {
    error: string;
};
/**
 * Create a SyntheticOutputTool configured with the given JSON schema.
 * Returns {tool} on success or {error} with Ajv's diagnostic message
 * (e.g. "data/properties/bugs should be object") on invalid schema.
 */
export declare function createSyntheticOutputTool(jsonSchema: Record<string, unknown>): CreateResult;
export {};
//# sourceMappingURL=SyntheticOutputTool.d.ts.map