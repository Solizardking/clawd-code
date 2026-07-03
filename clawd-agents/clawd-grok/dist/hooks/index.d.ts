export { getMatchingHooks, loadHooksConfig } from "./config.js";
export { execCommandHook, executeHooks } from "./executor.js";
export type { AggregatedHookResult, BaseHookInput, CommandHook, HookCommand, HookEvent, HookInput, HookMatcher, HookOutput, HookResult, HooksConfig, PostToolUseFailureHookInput, PostToolUseHookInput, PreToolUseHookInput, } from "./types.js";
export { getMatchQuery, HOOK_EVENTS, isHookEvent } from "./types.js";
import type { AggregatedHookResult, HookInput } from "./types.js";
/**
 * Fire hooks for a generic event. Loads config, matches, and executes.
 * Swallows all errors so hooks never crash the agent.
 */
export declare function executeEventHooks(input: HookInput, cwd: string, signal?: AbortSignal): Promise<AggregatedHookResult>;
/**
 * Fire PreToolUse hooks. Returns the aggregated result which may block execution.
 */
export declare function executePreToolHooks(toolName: string, toolInput: Record<string, unknown>, cwd: string, sessionId?: string, signal?: AbortSignal): Promise<AggregatedHookResult>;
/**
 * Fire PostToolUse hooks after a successful tool execution.
 */
export declare function executePostToolHooks(toolName: string, toolInput: Record<string, unknown>, toolOutput: Record<string, unknown>, cwd: string, sessionId?: string, signal?: AbortSignal): Promise<AggregatedHookResult>;
/**
 * Fire PostToolUseFailure hooks after a tool execution fails.
 */
export declare function executePostToolFailureHooks(toolName: string, toolInput: Record<string, unknown>, error: string, cwd: string, sessionId?: string, signal?: AbortSignal): Promise<AggregatedHookResult>;
