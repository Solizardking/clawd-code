import type { PermissionMode } from '../permissions/PermissionMode.js';
import { type ModelAlias } from './aliases.js';
export declare const AGENT_MODEL_OPTIONS: readonly ["sonnet", "opus", "haiku", "best", "sonnet[1m]", "opus[1m]", "opusplan", "inherit"];
export type AgentModelAlias = (typeof AGENT_MODEL_OPTIONS)[number];
export type AgentModelOption = {
    value: AgentModelAlias;
    label: string;
    description: string;
};
/**
 * Get the default subagent model. Returns 'inherit' so subagents inherit
 * the model from the parent thread.
 */
export declare function getDefaultSubagentModel(): string;
/**
 * Get the effective model string for an agent.
 *
 * For Bedrock, if the parent model uses a cross-region inference prefix (e.g., "eu.", "us."),
 * that prefix is inherited by subagents using alias models (e.g., "sonnet", "haiku", "opus").
 * This ensures subagents use the same region as the parent, which is necessary when
 * IAM permissions are scoped to specific cross-region inference profiles.
 */
export declare function getAgentModel(agentModel: string | undefined, parentModel: string, toolSpecifiedModel?: ModelAlias, permissionMode?: PermissionMode): string;
export declare function getAgentModelDisplay(model: string | undefined): string;
/**
 * Get available model options for agents
 */
export declare function getAgentModelOptions(): AgentModelOption[];
//# sourceMappingURL=agent.d.ts.map