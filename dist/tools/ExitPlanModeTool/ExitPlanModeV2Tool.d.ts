import { z } from 'zod/v4';
import { type Tool } from '../../Tool.js';
/**
 * Schema for prompt-based permission requests.
 * Used by Claude to request semantic permissions when exiting plan mode.
 */
declare const allowedPromptSchema: () => any;
export type AllowedPrompt = z.infer<ReturnType<typeof allowedPromptSchema>>;
declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
/**
 * SDK-facing input schema - includes fields injected by normalizeToolInput.
 * The internal inputSchema doesn't have these fields because plan is read from disk,
 * but the SDK/hooks see the normalized version with plan and file path included.
 */
export declare const _sdkInputSchema: () => any;
export declare const outputSchema: () => any;
type OutputSchema = ReturnType<typeof outputSchema>;
export type Output = z.infer<OutputSchema>;
export declare const ExitPlanModeV2Tool: Tool<InputSchema, Output>;
export {};
//# sourceMappingURL=ExitPlanModeV2Tool.d.ts.map