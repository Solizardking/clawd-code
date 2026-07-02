import type { ScopedMcpServerConfig } from './types.js';
/**
 * Hook to manage MCP (Model Context Protocol) server connections and updates
 *
 * This hook:
 * 1. Initializes MCP client connections based on config
 * 2. Sets up handlers for connection lifecycle events and sync with app state
 * 3. Manages automatic reconnection for SSE connections
 * 4. Returns a reconnect function
 */
export declare function useManageMCPConnections(dynamicMcpConfig: Record<string, ScopedMcpServerConfig> | undefined, isStrictMcpConfig?: boolean): {
    reconnectMcpServer: any;
    toggleMcpServer: any;
};
//# sourceMappingURL=useManageMCPConnections.d.ts.map