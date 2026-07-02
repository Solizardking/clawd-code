import { StructuredIO } from 'src/cli/structuredIO.js';
import { type Command } from 'src/commands.js';
import type { ThinkingConfig } from 'src/utils/thinking.js';
import { type Tool, type Tools } from 'src/Tool.js';
import { type AgentDefinition } from 'src/tools/AgentTool/loadAgentsDir.js';
import type { Message, NormalizedUserMessage } from 'src/types/message.js';
import type { QueuedCommand } from 'src/types/textInputTypes.js';
import { type RequiresActionDetails } from 'src/utils/sessionState.js';
import type { MCPServerConnection, McpSdkServerConfig, ScopedMcpServerConfig } from 'src/services/mcp/types.js';
import type { PermissionPromptTool } from 'src/utils/queryHelpers.js';
import type { SDKStatus, McpServerConfigForProcessTransport } from 'src/entrypoints/agentSdkTypes.js';
import type { SDKControlResponse, SDKControlMcpSetServersResponse } from 'src/entrypoints/sdk/controlTypes.js';
import type { CanUseToolFn } from 'src/hooks/useCanUseTool.js';
import { processSessionStartHooks } from 'src/utils/sessionStart.js';
import type { ContentBlockParam } from '@anthropic-ai/sdk/resources/messages.mjs';
import type { AppState } from 'src/state/AppStateStore.js';
type PromptValue = string | ContentBlockParam[];
/**
 * Join prompt values from multiple queued commands into one. Strings are
 * newline-joined; if any value is a block array, all values are normalized
 * to blocks and concatenated.
 */
export declare function joinPromptValues(values: PromptValue[]): PromptValue;
/**
 * Whether `next` can be batched into the same ask() call as `head`. Only
 * prompt-mode commands batch, and only when the workload tag matches (so the
 * combined turn is attributed correctly) and the isMeta flag matches (so a
 * proactive tick can't merge into a user prompt and lose its hidden-in-
 * transcript marking when the head is spread over the merged command).
 */
export declare function canBatchWith(head: QueuedCommand, next: QueuedCommand | undefined): boolean;
export declare function runHeadless(inputPrompt: string | AsyncIterable<string>, getAppState: () => AppState, setAppState: (f: (prev: AppState) => AppState) => void, commands: Command[], tools: Tools, sdkMcpConfigs: Record<string, McpSdkServerConfig>, agents: AgentDefinition[], options: {
    continue: boolean | undefined;
    resume: string | boolean | undefined;
    resumeSessionAt: string | undefined;
    verbose: boolean | undefined;
    outputFormat: string | undefined;
    jsonSchema: Record<string, unknown> | undefined;
    permissionPromptToolName: string | undefined;
    allowedTools: string[] | undefined;
    thinkingConfig: ThinkingConfig | undefined;
    maxTurns: number | undefined;
    maxBudgetUsd: number | undefined;
    taskBudget: {
        total: number;
    } | undefined;
    systemPrompt: string | undefined;
    appendSystemPrompt: string | undefined;
    userSpecifiedModel: string | undefined;
    fallbackModel: string | undefined;
    teleport: string | true | null | undefined;
    sdkUrl: string | undefined;
    replayUserMessages: boolean | undefined;
    includePartialMessages: boolean | undefined;
    forkSession: boolean | undefined;
    rewindFiles: string | undefined;
    enableAuthStatus: boolean | undefined;
    agent: string | undefined;
    workload: string | undefined;
    setupTrigger?: 'init' | 'maintenance' | undefined;
    sessionStartHooksPromise?: ReturnType<typeof processSessionStartHooks>;
    setSDKStatus?: (status: SDKStatus) => void;
}): Promise<void>;
/**
 * Creates a CanUseToolFn that incorporates a custom permission prompt tool.
 * This function converts the permissionPromptTool into a CanUseToolFn that can be used in ask.tsx
 */
export declare function createCanUseToolWithPermissionPrompt(permissionPromptTool: PermissionPromptTool): CanUseToolFn;
export declare function getCanUseToolFn(permissionPromptToolName: string | undefined, structuredIO: StructuredIO, getMcpTools: () => Tool[], onPermissionPrompt?: (details: RequiresActionDetails) => void): CanUseToolFn;
/**
 * Removes an interrupted user message and its synthetic assistant sentinel
 * from the message array. Used during gateway-triggered restarts to clean up
 * the message history before re-enqueuing the interrupted prompt.
 *
 * @internal Exported for testing
 */
export declare function removeInterruptedMessage(messages: Message[], interruptedUserMessage: NormalizedUserMessage): void;
/**
 * Handles unexpected permission responses by looking up the unresolved tool
 * call in the transcript and enqueuing it for execution.
 *
 * Returns true if a permission was enqueued, false otherwise.
 */
export declare function handleOrphanedPermissionResponse({ message, setAppState, onEnqueued, handledToolUseIds, }: {
    message: SDKControlResponse;
    setAppState: (f: (prev: AppState) => AppState) => void;
    onEnqueued?: () => void;
    handledToolUseIds: Set<string>;
}): Promise<boolean>;
export type DynamicMcpState = {
    clients: MCPServerConnection[];
    tools: Tools;
    configs: Record<string, ScopedMcpServerConfig>;
};
/**
 * State for SDK MCP servers that run in the SDK process.
 */
export type SdkMcpState = {
    configs: Record<string, McpSdkServerConfig>;
    clients: MCPServerConnection[];
    tools: Tools;
};
/**
 * Result of handleMcpSetServers - contains new state and response data.
 */
export type McpSetServersResult = {
    response: SDKControlMcpSetServersResponse;
    newSdkState: SdkMcpState;
    newDynamicState: DynamicMcpState;
    sdkServersChanged: boolean;
};
/**
 * Handles mcp_set_servers requests by processing both SDK and process-based servers.
 * SDK servers run in the SDK process; process-based servers are spawned by the CLI.
 *
 * Applies enterprise allowedMcpServers/deniedMcpServers policy — same filter as
 * --mcp-config (see filterMcpServersByPolicy call in main.tsx). Without this,
 * SDK V2 Query.setMcpServers() was a second policy bypass vector. Blocked servers
 * are reported in response.errors so the SDK consumer knows why they weren't added.
 */
export declare function handleMcpSetServers(servers: Record<string, McpServerConfigForProcessTransport>, sdkState: SdkMcpState, dynamicState: DynamicMcpState, setAppState: (f: (prev: AppState) => AppState) => void): Promise<McpSetServersResult>;
/**
 * Reconciles the current set of dynamic MCP servers with a new desired state.
 * Handles additions, removals, and config changes.
 */
export declare function reconcileMcpServers(desiredConfigs: Record<string, McpServerConfigForProcessTransport>, currentState: DynamicMcpState, setAppState: (f: (prev: AppState) => AppState) => void): Promise<{
    response: SDKControlMcpSetServersResponse;
    newState: DynamicMcpState;
}>;
export {};
//# sourceMappingURL=print.d.ts.map