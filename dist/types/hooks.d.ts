import { z } from 'zod/v4';
import { type HookEvent, type HookInput, type PermissionUpdate } from 'src/entrypoints/agentSdkTypes.js';
import type { HookJSONOutput, AsyncHookJSONOutput, SyncHookJSONOutput } from 'src/entrypoints/agentSdkTypes.js';
import type { Message } from 'src/types/message.js';
import type { PermissionResult } from 'src/utils/permissions/PermissionResult.js';
import type { AppState } from '../state/AppState.js';
import type { AttributionState } from '../utils/commitAttribution.js';
export declare function isHookEvent(value: string): value is HookEvent;
export declare const promptRequestSchema: () => any;
export type PromptRequest = z.infer<ReturnType<typeof promptRequestSchema>>;
export type PromptResponse = {
    prompt_response: string;
    selected: string;
};
export declare const syncHookResponseSchema: () => any;
export declare const hookJSONOutputSchema: () => any;
export declare function isSyncHookJSONOutput(json: HookJSONOutput): json is SyncHookJSONOutput;
export declare function isAsyncHookJSONOutput(json: HookJSONOutput): json is AsyncHookJSONOutput;
/** Context passed to callback hooks for state access */
export type HookCallbackContext = {
    getAppState: () => AppState;
    updateAttributionState: (updater: (prev: AttributionState) => AttributionState) => void;
};
/** Hook that is a callback. */
export type HookCallback = {
    type: 'callback';
    callback: (input: HookInput, toolUseID: string | null, abort: AbortSignal | undefined, 
    /** Hook index for SessionStart hooks to compute CLAUDE_ENV_FILE path */
    hookIndex?: number, 
    /** Optional context for accessing app state */
    context?: HookCallbackContext) => Promise<HookJSONOutput>;
    /** Timeout in seconds for this hook */
    timeout?: number;
    /** Internal hooks (e.g. session file access analytics) are excluded from tengu_run_hook metrics */
    internal?: boolean;
};
export type HookCallbackMatcher = {
    matcher?: string;
    hooks: HookCallback[];
    pluginName?: string;
};
export type HookProgress = {
    type: 'hook_progress';
    hookEvent: HookEvent;
    hookName: string;
    command: string;
    promptText?: string;
    statusMessage?: string;
};
export type HookBlockingError = {
    blockingError: string;
    command: string;
};
export type PermissionRequestResult = {
    behavior: 'allow';
    updatedInput?: Record<string, unknown>;
    updatedPermissions?: PermissionUpdate[];
} | {
    behavior: 'deny';
    message?: string;
    interrupt?: boolean;
};
export type HookResult = {
    message?: Message;
    systemMessage?: Message;
    blockingError?: HookBlockingError;
    outcome: 'success' | 'blocking' | 'non_blocking_error' | 'cancelled';
    preventContinuation?: boolean;
    stopReason?: string;
    permissionBehavior?: 'ask' | 'deny' | 'allow' | 'passthrough';
    hookPermissionDecisionReason?: string;
    additionalContext?: string;
    initialUserMessage?: string;
    updatedInput?: Record<string, unknown>;
    updatedMCPToolOutput?: unknown;
    permissionRequestResult?: PermissionRequestResult;
    retry?: boolean;
};
export type AggregatedHookResult = {
    message?: Message;
    blockingErrors?: HookBlockingError[];
    preventContinuation?: boolean;
    stopReason?: string;
    hookPermissionDecisionReason?: string;
    permissionBehavior?: PermissionResult['behavior'];
    additionalContexts?: string[];
    initialUserMessage?: string;
    updatedInput?: Record<string, unknown>;
    updatedMCPToolOutput?: unknown;
    permissionRequestResult?: PermissionRequestResult;
    retry?: boolean;
};
//# sourceMappingURL=hooks.d.ts.map