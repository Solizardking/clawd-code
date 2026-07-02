import type { SettingSource } from 'src/utils/settings/constants.js';
import { type McpServerConfig } from '../../services/mcp/types.js';
import type { ToolUseContext } from '../../Tool.js';
import { type EffortValue } from '../../utils/effort.js';
import { type PermissionMode } from '../../utils/permissions/PermissionMode.js';
import { type HooksSettings } from '../../utils/settings/types.js';
import { type AgentColorName } from './agentColorManager.js';
import { type AgentMemoryScope } from './agentMemory.js';
export type AgentMcpServerSpec = string | {
    [name: string]: McpServerConfig;
};
export type BaseAgentDefinition = {
    agentType: string;
    whenToUse: string;
    tools?: string[];
    disallowedTools?: string[];
    skills?: string[];
    mcpServers?: AgentMcpServerSpec[];
    hooks?: HooksSettings;
    color?: AgentColorName;
    model?: string;
    effort?: EffortValue;
    permissionMode?: PermissionMode;
    maxTurns?: number;
    filename?: string;
    baseDir?: string;
    criticalSystemReminder_EXPERIMENTAL?: string;
    requiredMcpServers?: string[];
    background?: boolean;
    initialPrompt?: string;
    memory?: AgentMemoryScope;
    isolation?: 'worktree' | 'remote';
    pendingSnapshotUpdate?: {
        snapshotTimestamp: string;
    };
    /** Omit CLAUDE.md hierarchy from the agent's userContext. Read-only agents
     * (Explore, Plan) don't need commit/PR/lint guidelines — the main agent has
     * full CLAUDE.md and interprets their output. Saves ~5-15 Gtok/week across
     * 34M+ Explore spawns. Kill-switch: tengu_slim_subagent_claudemd. */
    omitClaudeMd?: boolean;
};
export type BuiltInAgentDefinition = BaseAgentDefinition & {
    source: 'built-in';
    baseDir: 'built-in';
    callback?: () => void;
    getSystemPrompt: (params: {
        toolUseContext: Pick<ToolUseContext, 'options'>;
    }) => string;
};
export type CustomAgentDefinition = BaseAgentDefinition & {
    getSystemPrompt: () => string;
    source: SettingSource;
    filename?: string;
    baseDir?: string;
};
export type PluginAgentDefinition = BaseAgentDefinition & {
    getSystemPrompt: () => string;
    source: 'plugin';
    filename?: string;
    plugin: string;
};
export type AgentDefinition = BuiltInAgentDefinition | CustomAgentDefinition | PluginAgentDefinition;
export declare function isBuiltInAgent(agent: AgentDefinition): agent is BuiltInAgentDefinition;
export declare function isCustomAgent(agent: AgentDefinition): agent is CustomAgentDefinition;
export declare function isPluginAgent(agent: AgentDefinition): agent is PluginAgentDefinition;
export type AgentDefinitionsResult = {
    activeAgents: AgentDefinition[];
    allAgents: AgentDefinition[];
    failedFiles?: Array<{
        path: string;
        error: string;
    }>;
    allowedAgentTypes?: string[];
};
export declare function getActiveAgentsFromList(allAgents: AgentDefinition[]): AgentDefinition[];
/**
 * Checks if an agent's required MCP servers are available.
 * Returns true if no requirements or all requirements are met.
 * @param agent The agent to check
 * @param availableServers List of available MCP server names (e.g., from mcp.clients)
 */
export declare function hasRequiredMcpServers(agent: AgentDefinition, availableServers: string[]): boolean;
/**
 * Filters agents based on MCP server requirements.
 * Only returns agents whose required MCP servers are available.
 * @param agents List of agents to filter
 * @param availableServers List of available MCP server names
 */
export declare function filterAgentsByMcpRequirements(agents: AgentDefinition[], availableServers: string[]): AgentDefinition[];
export declare const getAgentDefinitionsWithOverrides: any;
export declare function clearAgentDefinitionsCache(): void;
/**
 * Parses agent definition from JSON data
 */
export declare function parseAgentFromJson(name: string, definition: unknown, source?: SettingSource): CustomAgentDefinition | null;
/**
 * Parses multiple agents from a JSON object
 */
export declare function parseAgentsFromJson(agentsJson: unknown, source?: SettingSource): AgentDefinition[];
/**
 * Parses agent definition from markdown file data
 */
export declare function parseAgentFromMarkdown(filePath: string, baseDir: string, frontmatter: Record<string, unknown>, content: string, source: SettingSource): CustomAgentDefinition | null;
//# sourceMappingURL=loadAgentsDir.d.ts.map