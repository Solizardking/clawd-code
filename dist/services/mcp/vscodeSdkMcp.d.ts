import type { MCPServerConnection } from './types.js';
export declare const LogEventNotificationSchema: () => any;
/**
 * Sends a file_updated notification to the VSCode MCP server. This is used to
 * notify VSCode when files are edited or written by Claude.
 */
export declare function notifyVscodeFileUpdated(filePath: string, oldContent: string | null, newContent: string | null): void;
/**
 * Sets up the speicial internal VSCode MCP for bidirectional communication using notifications.
 */
export declare function setupVscodeSdkMcp(sdkClients: MCPServerConnection[]): void;
//# sourceMappingURL=vscodeSdkMcp.d.ts.map