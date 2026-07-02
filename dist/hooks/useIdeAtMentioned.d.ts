import type { MCPServerConnection } from '../services/mcp/types.js';
export type IDEAtMentioned = {
    filePath: string;
    lineStart?: number;
    lineEnd?: number;
};
/**
 * A hook that tracks IDE at-mention notifications by directly registering
 * with MCP client notification handlers,
 */
export declare function useIdeAtMentioned(mcpClients: MCPServerConnection[], onAtMentioned: (atMentioned: IDEAtMentioned) => void): void;
//# sourceMappingURL=useIdeAtMentioned.d.ts.map