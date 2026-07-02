import type { PluginError } from '../../types/plugin.js';
import type { ValidationError } from '../../utils/settings/validation.js';
import { type ConfigScope, type McpJsonConfig, type McpServerConfig, type ScopedMcpServerConfig } from './types.js';
/**
 * Get the path to the managed MCP configuration file
 */
export declare function getEnterpriseMcpFilePath(): string;
/**
 * If the URL is a CCR proxy URL, extract the original vendor URL from the
 * mcp_url query parameter. Otherwise return the URL unchanged. This lets
 * signature-based dedup match a plugin's raw vendor URL against a connector's
 * rewritten proxy URL when both point at the same MCP server.
 */
export declare function unwrapCcrProxyUrl(url: string): string;
/**
 * Compute a dedup signature for an MCP server config.
 * Two configs with the same signature are considered "the same server" for
 * plugin deduplication. Ignores env (plugins always inject CLAUDE_PLUGIN_ROOT)
 * and headers (same URL = same server regardless of auth).
 * Returns null only for configs with neither command nor url (sdk type).
 */
export declare function getMcpServerSignature(config: McpServerConfig): string | null;
/**
 * Filter plugin MCP servers, dropping any whose signature matches a
 * manually-configured server or an earlier-loaded plugin server.
 * Manual wins over plugin; between plugins, first-loaded wins.
 *
 * Plugin servers are namespaced `plugin:name:server` so they never key-collide
 * with manual servers in the merge — this content-based check catches the case
 * where both actually launch the same underlying process/connection.
 */
export declare function dedupPluginMcpServers(pluginServers: Record<string, ScopedMcpServerConfig>, manualServers: Record<string, ScopedMcpServerConfig>): {
    servers: Record<string, ScopedMcpServerConfig>;
    suppressed: Array<{
        name: string;
        duplicateOf: string;
    }>;
};
/**
 * Filter claude.ai connectors, dropping any whose signature matches an enabled
 * manually-configured server. Manual wins: a user who wrote .mcp.json or ran
 * `claude mcp add` expressed higher intent than a connector toggled in the web UI.
 *
 * Connector keys are `claude.ai <DisplayName>` so they never key-collide with
 * manual servers in the merge — this content-based check catches the case where
 * both point at the same underlying URL (e.g. `mcp__slack__*` and
 * `mcp__claude_ai_Slack__*` both hitting mcp.slack.com, ~600 chars/turn wasted).
 *
 * Only enabled manual servers count as dedup targets — a disabled manual server
 * mustn't suppress its connector twin, or neither runs.
 */
export declare function dedupClaudeAiMcpServers(claudeAiServers: Record<string, ScopedMcpServerConfig>, manualServers: Record<string, ScopedMcpServerConfig>): {
    servers: Record<string, ScopedMcpServerConfig>;
    suppressed: Array<{
        name: string;
        duplicateOf: string;
    }>;
};
/**
 * Filter a record of MCP server configs by managed policy (allowedMcpServers /
 * deniedMcpServers). Servers blocked by policy are dropped and their names
 * returned so callers can warn the user.
 *
 * Intended for user-controlled config entry points that bypass the policy filter
 * in getClaudeCodeMcpConfigs(): --mcp-config (main.tsx) and the mcp_set_servers
 * control message (print.ts, SDK V2 Query.setMcpServers()).
 *
 * SDK-type servers are exempt — they are SDK-managed transport placeholders,
 * not CLI-managed connections. The CLI never spawns a process or opens a
 * network connection for them; tool calls route back to the SDK via
 * mcp_tool_call. URL/command-based allowlist entries are meaningless for them
 * (no url, no command), and gating by name would silently drop them during
 * installPluginsAndApplyMcpInBackground's sdkMcpConfigs carry-forward.
 *
 * The generic has no type constraint because the two callsites use different
 * config type families: main.tsx uses ScopedMcpServerConfig (service type,
 * args: string[] required), print.ts uses McpServerConfigForProcessTransport
 * (SDK wire type, args?: string[] optional). Both are structurally compatible
 * with what isMcpServerAllowedByPolicy actually reads (type/url/command/args)
 * — the policy check only reads, never requires any field to be present.
 * The `as McpServerConfig` widening is safe for that reason; the downstream
 * checks tolerate missing/undefined fields: `config` is optional, and
 * `getServerCommandArray` defaults `args` to `[]` via `?? []`.
 */
export declare function filterMcpServersByPolicy<T>(configs: Record<string, T>): {
    allowed: Record<string, T>;
    blocked: string[];
};
/**
 * Add a new MCP server configuration
 * @param name The name of the server
 * @param config The server configuration
 * @param scope The configuration scope
 * @throws Error if name is invalid or server already exists, or if the config is invalid
 */
export declare function addMcpConfig(name: string, config: unknown, scope: ConfigScope): Promise<void>;
/**
 * Remove an MCP server configuration
 * @param name The name of the server to remove
 * @param scope The configuration scope
 * @throws Error if server not found in specified scope
 */
export declare function removeMcpConfig(name: string, scope: ConfigScope): Promise<void>;
/**
 * Get MCP configs from current directory only (no parent traversal).
 * Used by addMcpConfig and removeMcpConfig to modify the local .mcp.json file.
 * Exported for testing purposes.
 *
 * @returns Servers with scope information and any validation errors from current directory's .mcp.json
 */
export declare function getProjectMcpConfigsFromCwd(): {
    servers: Record<string, ScopedMcpServerConfig>;
    errors: ValidationError[];
};
/**
 * Get all MCP configurations from a specific scope
 * @param scope The configuration scope
 * @returns Servers with scope information and any validation errors
 */
export declare function getMcpConfigsByScope(scope: 'project' | 'user' | 'local' | 'enterprise'): {
    servers: Record<string, ScopedMcpServerConfig>;
    errors: ValidationError[];
};
/**
 * Get an MCP server configuration by name
 * @param name The name of the server
 * @returns The server configuration with scope, or undefined if not found
 */
export declare function getMcpConfigByName(name: string): ScopedMcpServerConfig | null;
/**
 * Get Claude Code MCP configurations (excludes claude.ai servers from the
 * returned set — they're fetched separately and merged by callers).
 * This is fast: only local file reads; no awaited network calls on the
 * critical path. The optional extraDedupTargets promise (e.g. the in-flight
 * claude.ai connector fetch) is awaited only after loadAllPluginsCacheOnly() completes,
 * so the two overlap rather than serialize.
 * @returns Claude Code server configurations with appropriate scopes
 */
export declare function getClaudeCodeMcpConfigs(dynamicServers?: Record<string, ScopedMcpServerConfig>, extraDedupTargets?: Promise<Record<string, ScopedMcpServerConfig>>): Promise<{
    servers: Record<string, ScopedMcpServerConfig>;
    errors: PluginError[];
}>;
/**
 * Get all MCP configurations across all scopes, including claude.ai servers.
 * This may be slow due to network calls - use getClaudeCodeMcpConfigs() for fast startup.
 * @returns All server configurations with appropriate scopes
 */
export declare function getAllMcpConfigs(): Promise<{
    servers: Record<string, ScopedMcpServerConfig>;
    errors: PluginError[];
}>;
/**
 * Parse and validate an MCP configuration object
 * @param params Parsing parameters
 * @returns Validated configuration with any errors
 */
export declare function parseMcpConfig(params: {
    configObject: unknown;
    expandVars: boolean;
    scope: ConfigScope;
    filePath?: string;
}): {
    config: McpJsonConfig | null;
    errors: ValidationError[];
};
/**
 * Parse and validate an MCP configuration from a file path
 * @param params Parsing parameters
 * @returns Validated configuration with any errors
 */
export declare function parseMcpConfigFromFilePath(params: {
    filePath: string;
    expandVars: boolean;
    scope: ConfigScope;
}): {
    config: McpJsonConfig | null;
    errors: ValidationError[];
};
export declare const doesEnterpriseMcpConfigExist: any;
/**
 * Check if MCP allowlist policy should only come from managed settings.
 * This is true when policySettings has allowManagedMcpServersOnly: true.
 * When enabled, allowedMcpServers is read exclusively from managed settings.
 * Users can still add their own MCP servers and deny servers via deniedMcpServers.
 */
export declare function shouldAllowManagedMcpServersOnly(): boolean;
/**
 * Check if all MCP servers in a config are allowed with enterprise MCP config.
 */
export declare function areMcpConfigsAllowedWithEnterpriseMcpConfig(configs: Record<string, ScopedMcpServerConfig>): boolean;
/**
 * Check if an MCP server is disabled
 * @param name The name of the server
 * @returns true if the server is disabled
 */
export declare function isMcpServerDisabled(name: string): boolean;
/**
 * Enable or disable an MCP server
 * @param name The name of the server
 * @param enabled Whether the server should be enabled
 */
export declare function setMcpServerEnabled(name: string, enabled: boolean): void;
//# sourceMappingURL=config.d.ts.map