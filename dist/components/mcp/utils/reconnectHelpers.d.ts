import type { Command } from '../../../commands.js';
import type { MCPServerConnection, ServerResource } from '../../../services/mcp/types.js';
import type { Tool } from '../../../Tool.js';
export interface ReconnectResult {
    message: string;
    success: boolean;
}
/**
 * Handles the result of a reconnect attempt and returns an appropriate user message
 */
export declare function handleReconnectResult(result: {
    client: MCPServerConnection;
    tools: Tool[];
    commands: Command[];
    resources?: ServerResource[];
}, serverName: string): ReconnectResult;
/**
 * Handles errors from reconnect attempts
 */
export declare function handleReconnectError(error: unknown, serverName: string): string;
//# sourceMappingURL=reconnectHelpers.d.ts.map