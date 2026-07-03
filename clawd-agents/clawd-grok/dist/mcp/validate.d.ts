import type { McpRemoteTransport, McpServerConfig } from "../utils/settings";
export declare function isRemoteTransport(value: string): value is McpRemoteTransport;
export declare function toMcpServerId(label: string): string;
export declare function validateMcpServerConfig(server: McpServerConfig): {
    ok: true;
} | {
    ok: false;
    error: string;
};
