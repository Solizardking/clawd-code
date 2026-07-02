/**
 * Hook Zod schemas extracted to break import cycles.
 *
 * This file contains hook-related schema definitions that were originally
 * in src/utils/settings/types.ts. By extracting them here, we break the
 * circular dependency between settings/types.ts and plugins/schemas.ts.
 *
 * Both files now import from this shared location instead of each other.
 */
import { type HookEvent } from 'src/entrypoints/agentSdkTypes.js';
import { z } from 'zod/v4';
/**
 * Schema for hook command (excludes function hooks - they can't be persisted)
 */
export declare const HookCommandSchema: () => any;
/**
 * Schema for matcher configuration with multiple hooks
 */
export declare const HookMatcherSchema: () => any;
/**
 * Schema for hooks configuration
 * The key is the hook event. The value is an array of matcher configurations.
 * Uses partialRecord since not all hook events need to be defined.
 */
export declare const HooksSchema: () => any;
export type HookCommand = z.infer<ReturnType<typeof HookCommandSchema>>;
export type BashCommandHook = Extract<HookCommand, {
    type: 'command';
}>;
export type PromptHook = Extract<HookCommand, {
    type: 'prompt';
}>;
export type AgentHook = Extract<HookCommand, {
    type: 'agent';
}>;
export type HttpHook = Extract<HookCommand, {
    type: 'http';
}>;
export type HookMatcher = z.infer<ReturnType<typeof HookMatcherSchema>>;
export type HooksSettings = Partial<Record<HookEvent, HookMatcher[]>>;
//# sourceMappingURL=hooks.d.ts.map