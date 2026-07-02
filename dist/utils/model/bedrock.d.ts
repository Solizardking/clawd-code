export declare const getBedrockInferenceProfiles: any;
export declare function findFirstMatch(profiles: string[], substring: string): string | null;
export declare function createBedrockRuntimeClient(): Promise<any>;
export declare const getInferenceProfileBackingModel: any;
/**
 * Check if a model ID is a foundation model (e.g., "anthropic.claude-sonnet-4-5-20250929-v1:0")
 */
export declare function isFoundationModel(modelId: string): boolean;
/**
 * Cross-region inference profile prefixes for Bedrock.
 * These prefixes allow routing requests to models in specific regions.
 */
declare const BEDROCK_REGION_PREFIXES: readonly ["us", "eu", "apac", "global"];
/**
 * Extract the model/inference profile ID from a Bedrock ARN.
 * If the input is not an ARN, returns it unchanged.
 *
 * ARN format: arn:aws:bedrock:<region>:<account>:inference-profile/<profile-id>
 * Also handles: arn:aws:bedrock:<region>:<account>:application-inference-profile/<profile-id>
 * And foundation model ARNs: arn:aws:bedrock:<region>::foundation-model/<model-id>
 */
export declare function extractModelIdFromArn(modelId: string): string;
export type BedrockRegionPrefix = (typeof BEDROCK_REGION_PREFIXES)[number];
/**
 * Extract the region prefix from a Bedrock cross-region inference model ID.
 * Handles both plain model IDs and full ARN format.
 * For example:
 * - "eu.anthropic.claude-sonnet-4-5-20250929-v1:0" → "eu"
 * - "us.anthropic.claude-3-7-sonnet-20250219-v1:0" → "us"
 * - "arn:aws:bedrock:ap-northeast-2:123:inference-profile/global.anthropic.claude-opus-4-6-v1" → "global"
 * - "anthropic.claude-3-5-sonnet-20241022-v2:0" → undefined (foundation model)
 * - "claude-sonnet-4-5-20250929" → undefined (first-party format)
 */
export declare function getBedrockRegionPrefix(modelId: string): BedrockRegionPrefix | undefined;
/**
 * Apply a region prefix to a Bedrock model ID.
 * If the model already has a different region prefix, it will be replaced.
 * If the model is a foundation model (anthropic.*), the prefix will be added.
 * If the model is not a Bedrock model, it will be returned as-is.
 *
 * For example:
 * - applyBedrockRegionPrefix("us.anthropic.claude-sonnet-4-5-v1:0", "eu") → "eu.anthropic.claude-sonnet-4-5-v1:0"
 * - applyBedrockRegionPrefix("anthropic.claude-sonnet-4-5-v1:0", "eu") → "eu.anthropic.claude-sonnet-4-5-v1:0"
 * - applyBedrockRegionPrefix("claude-sonnet-4-5-20250929", "eu") → "claude-sonnet-4-5-20250929" (not a Bedrock model)
 */
export declare function applyBedrockRegionPrefix(modelId: string, prefix: BedrockRegionPrefix): string;
export {};
//# sourceMappingURL=bedrock.d.ts.map