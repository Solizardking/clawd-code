/**
 * Model definitions and provider routing metadata for the Clawd harness.
 */
export declare const PROVIDERS: readonly ["xai", "zai", "openai", "openrouter", "deepseek", "custom"];
export type ProviderId = (typeof PROVIDERS)[number];
export interface ProviderDefinition {
    id: ProviderId;
    name: string;
    description: string;
    envKey: string;
    envBaseURL?: string;
    defaultBaseURL: string;
    openAICompatible: boolean;
    supportsNativeSearch?: boolean;
    supportsNativeMedia?: boolean;
}
export interface ModelDefinition {
    id: string;
    provider: ProviderId;
    name: string;
    description: string;
    contextWindow: number;
    inputPrice: number;
    outputPrice: number;
    reasoning?: boolean;
    multiAgent?: boolean;
    responsesOnly?: boolean;
    supportsClientTools?: boolean;
    supportsMaxOutputTokens?: boolean;
    reasoningEfforts?: string[];
    bestFor?: string[];
    aliases?: string[];
}
export declare const DEFAULT_MODEL = "grok-4.3";
export declare const DEFAULT_PROVIDER: ProviderId;
export declare const PROVIDER_DEFINITIONS: ProviderDefinition[];
export declare const MODELS: ModelDefinition[];
export declare function getModel(id: string): ModelDefinition | undefined;
export declare function getModelInfo(id: string): ModelDefinition | undefined;
export declare function normalizeModelId(id: string): string;
export declare function listModelIds(): string[];
export declare function getModelIds(): string[];
export declare function isProviderId(value: string | undefined): value is ProviderId;
export declare function normalizeProviderId(value: string | undefined): ProviderId | undefined;
export declare function getProviderDefinition(id: ProviderId): ProviderDefinition;
export declare function getModelProvider(id: string): ProviderId | undefined;
export declare function resolveModelRoute(modelId: string, provider?: ProviderId): {
    provider: ProviderId;
    modelId: string;
};
export declare function listProviders(): ProviderDefinition[];
export declare function getSupportedReasoningEfforts(id: string): string[];
export declare function getEffectiveReasoningEffort(id: string, effort?: string): string | undefined;
