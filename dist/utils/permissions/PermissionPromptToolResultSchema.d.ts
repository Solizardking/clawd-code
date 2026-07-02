import type { Tool, ToolUseContext } from 'src/Tool.js';
import z from 'zod/v4';
import type { PermissionDecision } from './PermissionResult.js';
export declare const inputSchema: () => any;
export type Input = z.infer<ReturnType<typeof inputSchema>>;
export declare const outputSchema: () => any;
export type Output = z.infer<ReturnType<typeof outputSchema>>;
/**
 * Normalizes the result of a permission prompt tool to a PermissionDecision.
 */
export declare function permissionPromptToolResultToPermissionDecision(result: Output, tool: Tool, input: {
    [key: string]: unknown;
}, toolUseContext: ToolUseContext): PermissionDecision;
//# sourceMappingURL=PermissionPromptToolResultSchema.d.ts.map