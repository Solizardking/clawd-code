import { z } from 'zod/v4';
import type { AppState } from '../../state/AppState.js';
import type { Tools, ToolUseContext } from '../../Tool.js';
import { type ProgressTracker } from '../../tasks/LocalAgentTask/LocalAgentTask.js';
import type { Message as MessageType } from '../../types/message.js';
import type { CacheSafeParams } from '../../utils/forkedAgent.js';
import type { PermissionMode } from '../../utils/permissions/PermissionMode.js';
import type { AgentDefinition } from './loadAgentsDir.js';
export type ResolvedAgentTools = {
    hasWildcard: boolean;
    validTools: string[];
    invalidTools: string[];
    resolvedTools: Tools;
    allowedAgentTypes?: string[];
};
export declare function filterToolsForAgent({ tools, isBuiltIn, isAsync, permissionMode, }: {
    tools: Tools;
    isBuiltIn: boolean;
    isAsync?: boolean;
    permissionMode?: PermissionMode;
}): Tools;
/**
 * Resolves and validates agent tools against available tools
 * Handles wildcard expansion and validation in one place
 */
export declare function resolveAgentTools(agentDefinition: Pick<AgentDefinition, 'tools' | 'disallowedTools' | 'source' | 'permissionMode'>, availableTools: Tools, isAsync?: boolean, isMainThread?: boolean): ResolvedAgentTools;
export declare const agentToolResultSchema: () => any;
export type AgentToolResult = z.input<ReturnType<typeof agentToolResultSchema>>;
export declare function countToolUses(messages: MessageType[]): number;
export declare function finalizeAgentTool(agentMessages: MessageType[], agentId: string, metadata: {
    prompt: string;
    resolvedAgentModel: string;
    isBuiltInAgent: boolean;
    startTime: number;
    agentType: string;
    isAsync: boolean;
}): AgentToolResult;
/**
 * Returns the name of the last tool_use block in an assistant message,
 * or undefined if the message is not an assistant message with tool_use.
 */
export declare function getLastToolUseName(message: MessageType): string | undefined;
export declare function emitTaskProgress(tracker: ProgressTracker, taskId: string, toolUseId: string | undefined, description: string, startTime: number, lastToolName: string): void;
export declare function classifyHandoffIfNeeded({ agentMessages, tools, toolPermissionContext, abortSignal, subagentType, totalToolUseCount, }: {
    agentMessages: MessageType[];
    tools: Tools;
    toolPermissionContext: AppState['toolPermissionContext'];
    abortSignal: AbortSignal;
    subagentType: string;
    totalToolUseCount: number;
}): Promise<string | null>;
/**
 * Extract a partial result string from an agent's accumulated messages.
 * Used when an async agent is killed to preserve what it accomplished.
 * Returns undefined if no text content is found.
 */
export declare function extractPartialResult(messages: MessageType[]): string | undefined;
type SetAppState = (f: (prev: AppState) => AppState) => void;
/**
 * Drives a background agent from spawn to terminal notification.
 * Shared between AgentTool's async-from-start path and resumeAgentBackground.
 */
export declare function runAsyncAgentLifecycle({ taskId, abortController, makeStream, metadata, description, toolUseContext, rootSetAppState, agentIdForCleanup, enableSummarization, getWorktreeResult, }: {
    taskId: string;
    abortController: AbortController;
    makeStream: (onCacheSafeParams: ((p: CacheSafeParams) => void) | undefined) => AsyncGenerator<MessageType, void>;
    metadata: Parameters<typeof finalizeAgentTool>[2];
    description: string;
    toolUseContext: ToolUseContext;
    rootSetAppState: SetAppState;
    agentIdForCleanup: string;
    enableSummarization: boolean;
    getWorktreeResult: () => Promise<{
        worktreePath?: string;
        worktreeBranch?: string;
    }>;
}): Promise<void>;
export {};
//# sourceMappingURL=agentToolUtils.d.ts.map