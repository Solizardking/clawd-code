import type { SettingSource } from 'src/utils/settings/constants.js';
import type { AgentMemoryScope } from '../../tools/AgentTool/agentMemory.js';
import { type AgentDefinition } from '../../tools/AgentTool/loadAgentsDir.js';
import type { EffortValue } from '../../utils/effort.js';
/**
 * Formats agent data as markdown file content
 */
export declare function formatAgentAsMarkdown(agentType: string, whenToUse: string, tools: string[] | undefined, systemPrompt: string, color?: string, model?: string, memory?: AgentMemoryScope, effort?: EffortValue): string;
/**
 * Gets the file path for a new agent based on its name
 * Used when creating new agent files
 */
export declare function getNewAgentFilePath(agent: {
    source: SettingSource;
    agentType: string;
}): string;
/**
 * Gets the actual file path for an agent (handles filename vs agentType mismatch)
 * Always use this for existing agents to get their real file location
 */
export declare function getActualAgentFilePath(agent: AgentDefinition): string;
/**
 * Gets the relative file path for a new agent based on its name
 * Used for displaying where new agent files will be created
 */
export declare function getNewRelativeAgentFilePath(agent: {
    source: SettingSource | 'built-in';
    agentType: string;
}): string;
/**
 * Gets the actual relative file path for an agent (handles filename vs agentType mismatch)
 */
export declare function getActualRelativeAgentFilePath(agent: AgentDefinition): string;
/**
 * Saves an agent to the filesystem
 * @param checkExists - If true, throws error if file already exists
 */
export declare function saveAgentToFile(source: SettingSource | 'built-in', agentType: string, whenToUse: string, tools: string[] | undefined, systemPrompt: string, checkExists?: boolean, color?: string, model?: string, memory?: AgentMemoryScope, effort?: EffortValue): Promise<void>;
/**
 * Updates an existing agent file
 */
export declare function updateAgentFile(agent: AgentDefinition, newWhenToUse: string, newTools: string[] | undefined, newSystemPrompt: string, newColor?: string, newModel?: string, newMemory?: AgentMemoryScope, newEffort?: EffortValue): Promise<void>;
/**
 * Deletes an agent file
 */
export declare function deleteAgentFromFile(agent: AgentDefinition): Promise<void>;
//# sourceMappingURL=agentFileUtils.d.ts.map