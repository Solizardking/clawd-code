/**
 * Layer-3 refresh primitive: swap active plugin components in the running session.
 *
 * Three-layer model (see reconciler.ts for Layer-2):
 * - Layer 1: intent (settings)
 * - Layer 2: materialization (~/.claude/plugins/) — reconcileMarketplaces()
 * - Layer 3: active components (AppState) — this file
 *
 * Called from:
 * - /reload-plugins command (interactive, user-initiated)
 * - print.ts refreshPluginState() (headless, auto before first query with SYNC_PLUGIN_INSTALL)
 * - performBackgroundPluginInstallations() (background, auto after new marketplace install)
 *
 * NOT called from:
 * - useManagePlugins needsRefresh effect — interactive mode shows a notification;
 *   user explicitly runs /reload-plugins (PR 5c)
 * - /plugin menu — sets needsRefresh, user runs /reload-plugins (PR 5b)
 */
import type { Command } from '../../commands.js';
import type { AppState } from '../../state/AppState.js';
import type { AgentDefinitionsResult } from '../../tools/AgentTool/loadAgentsDir.js';
type SetAppState = (updater: (prev: AppState) => AppState) => void;
export type RefreshActivePluginsResult = {
    enabled_count: number;
    disabled_count: number;
    command_count: number;
    agent_count: number;
    hook_count: number;
    mcp_count: number;
    /** LSP servers provided by enabled plugins. reinitializeLspServerManager()
     * is called unconditionally so the manager picks these up (no-op if
     * manager was never initialized). */
    lsp_count: number;
    error_count: number;
    /** The refreshed agent definitions, for callers (e.g. print.ts) that also
     * maintain a local mutable reference outside AppState. */
    agentDefinitions: AgentDefinitionsResult;
    /** The refreshed plugin commands, same rationale as agentDefinitions. */
    pluginCommands: Command[];
};
/**
 * Refresh all active plugin components: commands, agents, hooks, MCP-reconnect
 * trigger, AppState plugin arrays. Clears ALL plugin caches (unlike the old
 * needsRefresh path which only cleared loadAllPlugins and returned stale data
 * from downstream memoized loaders).
 *
 * Consumes plugins.needsRefresh (sets to false).
 * Increments mcp.pluginReconnectKey so useManageMCPConnections effects re-run
 * and pick up new plugin MCP servers.
 *
 * LSP: if plugins now contribute LSP servers, reinitializeLspServerManager()
 * re-reads config. Servers are lazy-started so this is just config parsing.
 */
export declare function refreshActivePlugins(setAppState: SetAppState): Promise<RefreshActivePluginsResult>;
export {};
//# sourceMappingURL=refresh.d.ts.map