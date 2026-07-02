import type { Tool, ToolPermissionContext } from '../Tool.js';
import type { AgentDefinitionsResult } from '../tools/AgentTool/loadAgentsDir.js';
export type ContextWarning = {
    type: 'claudemd_files' | 'agent_descriptions' | 'mcp_tools' | 'unreachable_rules';
    severity: 'warning' | 'error';
    message: string;
    details: string[];
    currentValue: number;
    threshold: number;
};
export type ContextWarnings = {
    claudeMdWarning: ContextWarning | null;
    agentWarning: ContextWarning | null;
    mcpWarning: ContextWarning | null;
    unreachableRulesWarning: ContextWarning | null;
};
/**
 * Check all context warnings for the doctor command
 */
export declare function checkContextWarnings(tools: Tool[], agentInfo: AgentDefinitionsResult | null, getToolPermissionContext: () => Promise<ToolPermissionContext>): Promise<ContextWarnings>;
//# sourceMappingURL=doctorContextWarnings.d.ts.map