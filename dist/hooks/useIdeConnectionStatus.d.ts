import type { MCPServerConnection } from '../services/mcp/types.js';
export type IdeStatus = 'connected' | 'disconnected' | 'pending' | null;
type IdeConnectionResult = {
    status: IdeStatus;
    ideName: string | null;
};
export declare function useIdeConnectionStatus(mcpClients?: MCPServerConnection[]): IdeConnectionResult;
export {};
//# sourceMappingURL=useIdeConnectionStatus.d.ts.map