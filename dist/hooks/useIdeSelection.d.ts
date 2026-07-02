import type { MCPServerConnection } from '../services/mcp/types.js';
export type SelectionPoint = {
    line: number;
    character: number;
};
export type SelectionData = {
    selection: {
        start: SelectionPoint;
        end: SelectionPoint;
    } | null;
    text?: string;
    filePath?: string;
};
export type IDESelection = {
    lineCount: number;
    lineStart?: number;
    text?: string;
    filePath?: string;
};
/**
 * A hook that tracks IDE text selection information by directly registering
 * with MCP client notification handlers
 */
export declare function useIdeSelection(mcpClients: MCPServerConnection[], onSelect: (selection: IDESelection) => void): void;
//# sourceMappingURL=useIdeSelection.d.ts.map