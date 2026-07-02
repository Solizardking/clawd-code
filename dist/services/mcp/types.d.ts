import type { Client } from '@modelcontextprotocol/sdk/client/index.js';
import type { Resource, ServerCapabilities } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod/v4';
export declare const ConfigScopeSchema: () => any;
export type ConfigScope = z.infer<ReturnType<typeof ConfigScopeSchema>>;
export declare const TransportSchema: () => any;
export type Transport = z.infer<ReturnType<typeof TransportSchema>>;
export declare const McpStdioServerConfigSchema: () => any;
export declare const McpSSEServerConfigSchema: () => any;
export declare const McpSSEIDEServerConfigSchema: () => any;
export declare const McpWebSocketIDEServerConfigSchema: () => any;
export declare const McpHTTPServerConfigSchema: () => any;
export declare const McpWebSocketServerConfigSchema: () => any;
export declare const McpSdkServerConfigSchema: () => any;
export declare const McpClaudeAIProxyServerConfigSchema: () => any;
export declare const McpServerConfigSchema: () => any;
export type McpStdioServerConfig = z.infer<ReturnType<typeof McpStdioServerConfigSchema>>;
export type McpSSEServerConfig = z.infer<ReturnType<typeof McpSSEServerConfigSchema>>;
export type McpSSEIDEServerConfig = z.infer<ReturnType<typeof McpSSEIDEServerConfigSchema>>;
export type McpWebSocketIDEServerConfig = z.infer<ReturnType<typeof McpWebSocketIDEServerConfigSchema>>;
export type McpHTTPServerConfig = z.infer<ReturnType<typeof McpHTTPServerConfigSchema>>;
export type McpWebSocketServerConfig = z.infer<ReturnType<typeof McpWebSocketServerConfigSchema>>;
export type McpSdkServerConfig = z.infer<ReturnType<typeof McpSdkServerConfigSchema>>;
export type McpClaudeAIProxyServerConfig = z.infer<ReturnType<typeof McpClaudeAIProxyServerConfigSchema>>;
export type McpServerConfig = z.infer<ReturnType<typeof McpServerConfigSchema>>;
export type ScopedMcpServerConfig = McpServerConfig & {
    scope: ConfigScope;
    pluginSource?: string;
};
export declare const McpJsonConfigSchema: () => any;
export type McpJsonConfig = z.infer<ReturnType<typeof McpJsonConfigSchema>>;
export type ConnectedMCPServer = {
    client: Client;
    name: string;
    type: 'connected';
    capabilities: ServerCapabilities;
    serverInfo?: {
        name: string;
        version: string;
    };
    instructions?: string;
    config: ScopedMcpServerConfig;
    cleanup: () => Promise<void>;
};
export type FailedMCPServer = {
    name: string;
    type: 'failed';
    config: ScopedMcpServerConfig;
    error?: string;
};
export type NeedsAuthMCPServer = {
    name: string;
    type: 'needs-auth';
    config: ScopedMcpServerConfig;
};
export type PendingMCPServer = {
    name: string;
    type: 'pending';
    config: ScopedMcpServerConfig;
    reconnectAttempt?: number;
    maxReconnectAttempts?: number;
};
export type DisabledMCPServer = {
    name: string;
    type: 'disabled';
    config: ScopedMcpServerConfig;
};
export type MCPServerConnection = ConnectedMCPServer | FailedMCPServer | NeedsAuthMCPServer | PendingMCPServer | DisabledMCPServer;
export type ServerResource = Resource & {
    server: string;
};
export interface SerializedTool {
    name: string;
    description: string;
    inputJSONSchema?: {
        [x: string]: unknown;
        type: 'object';
        properties?: {
            [x: string]: unknown;
        };
    };
    isMcp?: boolean;
    originalToolName?: string;
}
export interface SerializedClient {
    name: string;
    type: 'connected' | 'failed' | 'needs-auth' | 'pending' | 'disabled';
    capabilities?: ServerCapabilities;
}
export interface MCPCliState {
    clients: SerializedClient[];
    configs: Record<string, ScopedMcpServerConfig>;
    tools: SerializedTool[];
    resources: Record<string, ServerResource[]>;
    normalizedNames?: Record<string, string>;
}
//# sourceMappingURL=types.d.ts.map