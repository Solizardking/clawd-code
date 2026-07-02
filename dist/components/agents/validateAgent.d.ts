import type { Tools } from '../../Tool.js';
import type { AgentDefinition, CustomAgentDefinition } from '../../tools/AgentTool/loadAgentsDir.js';
export type AgentValidationResult = {
    isValid: boolean;
    errors: string[];
    warnings: string[];
};
export declare function validateAgentType(agentType: string): string | null;
export declare function validateAgent(agent: Omit<CustomAgentDefinition, 'location'>, availableTools: Tools, existingAgents: AgentDefinition[]): AgentValidationResult;
//# sourceMappingURL=validateAgent.d.ts.map