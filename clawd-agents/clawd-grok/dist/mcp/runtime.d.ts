import type { ToolSet } from "ai";
import type { McpServerConfig } from "../utils/settings";
export interface McpToolBundle {
    tools: ToolSet;
    errors: string[];
    close(): Promise<void>;
}
export declare function buildMcpToolSet(servers: McpServerConfig[]): Promise<McpToolBundle>;
