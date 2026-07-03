import type { AggregatedHookResult, CommandHook, HookInput, HookResult } from "./types.js";
/**
 * Execute a single command hook by spawning a shell process.
 * The hook input is piped as JSON to stdin.
 * stdout is parsed as JSON if it starts with '{'.
 * Exit code semantics: 0 = success, 2 = blocking, other = non-blocking error.
 */
export declare function execCommandHook(hook: CommandHook, input: HookInput, cwd: string, signal?: AbortSignal): Promise<HookResult>;
/**
 * Execute an array of hook commands in parallel and aggregate results.
 */
export declare function executeHooks(hooks: CommandHook[], input: HookInput, cwd: string, signal?: AbortSignal): Promise<AggregatedHookResult>;
