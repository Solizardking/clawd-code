import type { ToolResultBlockParam } from '@anthropic-ai/sdk/resources/index.mjs';
import { z } from 'zod/v4';
export declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
export declare const outputSchema: () => any;
type OutputSchema = ReturnType<typeof outputSchema>;
export type Output = z.infer<OutputSchema>;
export declare function clearToolSearchDescriptionCache(): void;
export declare const ToolSearchTool: Omit<{
    isEnabled(): boolean;
    isConcurrencySafe(): true;
    isReadOnly(): true;
    name: string;
    maxResultSizeChars: number;
    description(): Promise<string>;
    prompt(): Promise<string>;
    readonly inputSchema: InputSchema;
    readonly outputSchema: OutputSchema;
    call(input: z.infer<Input>, { options: { tools }, getAppState }: import("../../Tool.js").ToolUseContext): Promise<{
        data: Output;
    }>;
    renderToolUseMessage(): null;
    userFacingName: () => string;
    /**
     * Returns a tool_result with tool_reference blocks.
     * This format works on 1P/Foundry. Bedrock/Vertex may not support
     * client-side tool_reference expansion yet.
     */
    mapToolResultToToolResultBlockParam(content: Output, toolUseID: string): ToolResultBlockParam;
}, "isEnabled" | "isConcurrencySafe" | "isReadOnly" | "isDestructive" | "checkPermissions" | "toAutoClassifierInput" | "userFacingName"> & {
    isEnabled: () => boolean;
    isConcurrencySafe: () => true;
    isReadOnly: () => true;
    isDestructive: (_input?: unknown) => boolean;
    checkPermissions: (input: {
        [key: string]: unknown;
    }, _ctx?: import("../../Tool.js").ToolUseContext) => Promise<import("../../types/permissions.js").PermissionResult>;
    toAutoClassifierInput: (_input?: unknown) => string;
    userFacingName: () => string;
};
export {};
//# sourceMappingURL=ToolSearchTool.d.ts.map