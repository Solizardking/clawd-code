import { createMCPClient } from "@ai-sdk/mcp";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { validateMcpServerConfig } from "./validate";
function mcpToolPrefix(server) {
    return `mcp_${server.id.replace(/[^a-zA-Z0-9_-]/g, "_")}`;
}
function toTransport(server) {
    if (server.transport === "stdio") {
        return new StdioClientTransport({
            command: server.command ?? "",
            args: server.args,
            env: server.env,
            cwd: server.cwd,
            stderr: "pipe",
        });
    }
    return {
        type: server.transport,
        url: server.url ?? "",
        headers: server.headers,
    };
}
export async function buildMcpToolSet(servers) {
    const tools = {};
    const errors = [];
    const clients = [];
    for (const server of servers) {
        if (!server.enabled)
            continue;
        const validation = validateMcpServerConfig(server);
        if (!validation.ok) {
            errors.push(`${server.label}: ${validation.error}`);
            continue;
        }
        try {
            const client = await createMCPClient({
                transport: toTransport(server),
                name: `clawd-${server.id}`,
                version: "1.0.0",
            });
            clients.push(client);
            const mcpTools = await client.tools();
            const prefix = mcpToolPrefix(server);
            for (const [name, tool] of Object.entries(mcpTools)) {
                const prefixedName = `${prefix}__${name}`;
                tools[prefixedName] = {
                    ...tool,
                    description: `[MCP ${server.label}] ${tool.description ?? name}`,
                };
            }
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            errors.push(`${server.label}: ${message}`);
        }
    }
    return {
        tools,
        errors,
        async close() {
            await Promise.all(clients.map((client) => client.close().catch(() => { })));
        },
    };
}
//# sourceMappingURL=runtime.js.map