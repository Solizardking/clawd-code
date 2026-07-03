import type { McpRemoteTransport } from "../utils/settings";
export interface McpCatalogEntry {
    id: string;
    name: string;
    description: string;
    directoryUrl: string;
    sourceUrl?: string;
    starterTransport?: McpRemoteTransport | "stdio";
}
export declare const POPULAR_MCP_CATALOG: McpCatalogEntry[];
