import type { Message } from '../../types/message.js';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type PermissionExplanation = {
    riskLevel: RiskLevel;
    explanation: string;
    reasoning: string;
    risk: string;
};
type GenerateExplanationParams = {
    toolName: string;
    toolInput: unknown;
    toolDescription?: string;
    messages?: Message[];
    signal: AbortSignal;
};
/**
 * Check if the permission explainer feature is enabled.
 * Enabled by default; users can opt out via config.
 */
export declare function isPermissionExplainerEnabled(): boolean;
/**
 * Generate a permission explanation using Haiku with structured output.
 * Returns null if the feature is disabled, request is aborted, or an error occurs.
 */
export declare function generatePermissionExplanation({ toolName, toolInput, toolDescription, messages, signal, }: GenerateExplanationParams): Promise<PermissionExplanation | null>;
export {};
//# sourceMappingURL=permissionExplainer.d.ts.map