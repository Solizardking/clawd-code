import type { ContentBlockParam } from '@anthropic-ai/sdk/resources/index.mjs';
import { type FetchLike } from '@modelcontextprotocol/sdk/shared/transport.js';
import { type ElicitRequestURLParams, type ElicitResult, type JSONRPCMessage, type PromptMessage } from '@modelcontextprotocol/sdk/types.js';
import type { Command } from '../../commands.js';
import type { AppState } from '../../state/AppState.js';
import { type Tool } from '../../Tool.js';
import { type MCPProgress } from '../../tools/MCPTool/MCPTool.js';
import { TelemetrySafeError_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS } from '../../utils/errors.js';
import { type MCPToolResult } from '../../utils/mcpValidation.js';
import type { ConnectedMCPServer, MCPServerConnection, McpSdkServerConfig, ScopedMcpServerConfig, ServerResource } from './types.js';
/**
 * Custom error class to indicate that an MCP tool call failed due to
 * authentication issues (e.g., expired OAuth token returning 401).
 * This error should be caught at the tool execution layer to update
 * the client's status to 'needs-auth'.
 */
export declare class McpAuthError extends Error {
    serverName: string;
    constructor(serverName: string, message: string);
}
/**
 * Thrown when an MCP tool returns `isError: true`. Carries the result's `_meta`
 * so SDK consumers can still receive it — per the MCP spec, `_meta` is on the
 * base Result type and is valid on error results.
 */
export declare class McpToolCallError_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS extends TelemetrySafeError_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS {
    readonly mcpMeta?: {
        _meta?: Record<string, unknown>;
    } | undefined;
    constructor(message: string, telemetryMessage: string, mcpMeta?: {
        _meta?: Record<string, unknown>;
    } | undefined);
}
/**
 * Detects whether an error is an MCP "Session not found" error (HTTP 404 + JSON-RPC code -32001).
 * Per the MCP spec, servers return 404 when a session ID is no longer valid.
 * We check both signals to avoid false positives from generic 404s (wrong URL, server gone, etc.).
 */
export declare function isMcpSessionExpiredError(error: Error): boolean;
export declare function clearMcpAuthCache(): void;
/**
 * Fetch wrapper for claude.ai proxy connections. Attaches the OAuth bearer
 * token and retries once on 401 via handleOAuth401Error (force-refresh).
 *
 * The Anthropic API path has this retry (withRetry.ts, grove.ts) to handle
 * memoize-cache staleness and clock drift. Without the same here, a single
 * stale token mass-401s every claude.ai connector and sticks them all in the
 * 15-min needs-auth cache.
 */
export declare function createClaudeAiProxyFetch(innerFetch: FetchLike): FetchLike;
/**
 * Wraps a fetch function to apply a fresh timeout signal to each request.
 * This avoids the bug where a single AbortSignal.timeout() created at connection
 * time becomes stale after 60 seconds, causing all subsequent requests to fail
 * immediately with "The operation timed out." Uses a 60-second timeout.
 *
 * Also ensures the Accept header required by the MCP Streamable HTTP spec is
 * present on POSTs. The MCP SDK sets this inside StreamableHTTPClientTransport.send(),
 * but it is attached to a Headers instance that passes through an object spread here,
 * and some runtimes/agents have been observed dropping it before it reaches the wire.
 * See https://github.com/anthropics/claude-agent-sdk-typescript/issues/202.
 * Normalizing here (the last wrapper before fetch()) guarantees it is sent.
 *
 * GET requests are excluded from the timeout since, for MCP transports, they are
 * long-lived SSE streams meant to stay open indefinitely. (Auth-related GETs use
 * a separate fetch wrapper with its own timeout in auth.ts.)
 *
 * @param baseFetch - The fetch function to wrap
 */
export declare function wrapFetchWithTimeout(baseFetch: FetchLike): FetchLike;
export declare function getMcpServerConnectionBatchSize(): number;
/**
 * Generates the cache key for a server connection
 * @param name Server name
 * @param serverRef Server configuration
 * @returns Cache key string
 */
export declare function getServerCacheKey(name: string, serverRef: ScopedMcpServerConfig): string;
/**
 * TODO (ollie): The memoization here increases complexity by a lot, and im not sure it really improves performance
 * Attempts to connect to a single MCP server
 * @param name Server name
 * @param serverRef Scoped server configuration
 * @returns A wrapped client (either connected or failed)
 */
export declare const connectToServer: any;
/**
 * Clears the memoize cache for a specific server
 * @param name Server name
 * @param serverRef Server configuration
 */
export declare function clearServerCache(name: string, serverRef: ScopedMcpServerConfig): Promise<void>;
/**
 * Ensures a valid connected client for an MCP server.
 * For most server types, uses the memoization cache if available, or reconnects
 * if the cache was cleared (e.g., after onclose). This ensures tool/resource
 * calls always use a valid connection.
 *
 * SDK MCP servers run in-process and are handled separately via setupSdkMcpClients,
 * so they are returned as-is without going through connectToServer.
 *
 * @param client The connected MCP server client
 * @returns Connected MCP server client (same or reconnected)
 * @throws Error if server cannot be connected
 */
export declare function ensureConnectedClient(client: ConnectedMCPServer): Promise<ConnectedMCPServer>;
/**
 * Compares two MCP server configurations to determine if they are equivalent.
 * Used to detect when a server needs to be reconnected due to config changes.
 */
export declare function areMcpConfigsEqual(a: ScopedMcpServerConfig, b: ScopedMcpServerConfig): boolean;
/**
 * Encode MCP tool input for the auto-mode security classifier.
 * Exported so the auto-mode eval scripts can mirror production encoding
 * for `mcp__*` tool stubs without duplicating this logic.
 */
export declare function mcpToolInputToAutoClassifierInput(input: Record<string, unknown>, toolName: string): string;
export declare const fetchToolsForClient: {
    (client: MCPServerConnection): Promise<Tool[]>;
    cache: {
        clear: () => void;
        size: () => number;
        delete: (key: string) => boolean;
        get: (key: string) => Promise<Tool[]> | undefined;
        has: (key: string) => boolean;
    };
};
export declare const fetchResourcesForClient: {
    (client: MCPServerConnection): Promise<any[]>;
    cache: {
        clear: () => void;
        size: () => number;
        delete: (key: string) => boolean;
        get: (key: string) => Promise<any[]> | undefined;
        has: (key: string) => boolean;
    };
};
export declare const fetchCommandsForClient: {
    (client: MCPServerConnection): Promise<Command[]>;
    cache: {
        clear: () => void;
        size: () => number;
        delete: (key: string) => boolean;
        get: (key: string) => Promise<Command[]> | undefined;
        has: (key: string) => boolean;
    };
};
/**
 * Call an IDE tool directly as an RPC
 * @param toolName The name of the tool to call
 * @param args The arguments to pass to the tool
 * @param client The IDE client to use for the RPC call
 * @returns The result of the tool call
 */
export declare function callIdeRpc(toolName: string, args: Record<string, unknown>, client: ConnectedMCPServer): Promise<string | ContentBlockParam[] | undefined>;
/**
 * Note: This should not be called by UI components directly, they should use the reconnectMcpServer
 * function from useManageMcpConnections.
 * @param name Server name
 * @param config Server configuration
 * @returns Object containing the client connection and its resources
 */
export declare function reconnectMcpServerImpl(name: string, config: ScopedMcpServerConfig): Promise<{
    client: MCPServerConnection;
    tools: Tool[];
    commands: Command[];
    resources?: ServerResource[];
}>;
export declare function getMcpToolsCommandsAndResources(onConnectionAttempt: (params: {
    client: MCPServerConnection;
    tools: Tool[];
    commands: Command[];
    resources?: ServerResource[];
}) => void, mcpConfigs?: Record<string, ScopedMcpServerConfig>): Promise<void>;
export declare function prefetchAllMcpResources(mcpConfigs: Record<string, ScopedMcpServerConfig>): Promise<{
    clients: MCPServerConnection[];
    tools: Tool[];
    commands: Command[];
}>;
/**
 * Transform result content from an MCP tool or MCP prompt into message blocks
 */
export declare function transformResultContent(resultContent: PromptMessage['content'], serverName: string): Promise<Array<ContentBlockParam>>;
/**
 * Processes MCP tool result into a normalized format.
 */
export type MCPResultType = 'toolResult' | 'structuredContent' | 'contentArray';
export type TransformedMCPResult = {
    content: MCPToolResult;
    type: MCPResultType;
    schema?: string;
};
/**
 * Generates a compact, jq-friendly type signature for a value.
 * e.g. "{title: string, items: [{id: number, name: string}]}"
 */
export declare function inferCompactSchema(value: unknown, depth?: number): string;
export declare function transformMCPResult(result: unknown, tool: string, // Tool name for validation (e.g., "search")
name: string): Promise<TransformedMCPResult>;
export declare function processMCPResult(result: unknown, tool: string, // Tool name for validation (e.g., "search")
name: string): Promise<MCPToolResult>;
/**
 * Call an MCP tool, handling UrlElicitationRequiredError (-32042) by
 * displaying the URL elicitation to the user, waiting for the completion
 * notification, and retrying the tool call.
 */
type MCPToolCallResult = {
    content: MCPToolResult;
    _meta?: Record<string, unknown>;
    structuredContent?: Record<string, unknown>;
};
/** @internal Exported for testing. */
export declare function callMCPToolWithUrlElicitationRetry({ client: connectedClient, clientConnection, tool, args, meta, signal, setAppState, onProgress, callToolFn, handleElicitation, }: {
    client: ConnectedMCPServer;
    clientConnection: MCPServerConnection;
    tool: string;
    args: Record<string, unknown>;
    meta?: Record<string, unknown>;
    signal: AbortSignal;
    setAppState: (f: (prev: AppState) => AppState) => void;
    onProgress?: (data: MCPProgress) => void;
    /** Injectable for testing. Defaults to callMCPTool. */
    callToolFn?: (opts: {
        client: ConnectedMCPServer;
        tool: string;
        args: Record<string, unknown>;
        meta?: Record<string, unknown>;
        signal: AbortSignal;
        onProgress?: (data: MCPProgress) => void;
    }) => Promise<MCPToolCallResult>;
    /** Handler for URL elicitations when no hook handles them.
     * In print/SDK mode, delegates to structuredIO. In REPL, falls back to queue. */
    handleElicitation?: (serverName: string, params: ElicitRequestURLParams, signal: AbortSignal) => Promise<ElicitResult>;
}): Promise<MCPToolCallResult>;
/**
 * Sets up SDK MCP clients by creating transports and connecting them.
 * This is used for SDK MCP servers that run in the same process as the SDK.
 *
 * @param sdkMcpConfigs - The SDK MCP server configurations
 * @param sendMcpMessage - Callback to send MCP messages through the control channel
 * @returns Connected clients, their tools, and transport map for message routing
 */
export declare function setupSdkMcpClients(sdkMcpConfigs: Record<string, McpSdkServerConfig>, sendMcpMessage: (serverName: string, message: JSONRPCMessage) => Promise<JSONRPCMessage>): Promise<{
    clients: MCPServerConnection[];
    tools: Tool[];
}>;
export {};
//# sourceMappingURL=client.d.ts.map