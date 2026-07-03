/**
 * xAI Grok model definitions and metadata.
 */
export interface ModelDefinition {
    id: string;
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
    aliases?: string[];
}
export declare const DEFAULT_MODEL = "grok-4.3";
export declare const MODELS: ModelDefinition[];
export declare function getModel(id: string): ModelDefinition | undefined;
export declare function getModelInfo(id: string): ModelDefinition | undefined;
export declare function normalizeModelId(id: string): string;
export declare function listModelIds(): string[];
export declare function getModelIds(): string[];
export declare function getSupportedReasoningEfforts(id: string): string[];
export declare function getEffectiveReasoningEffort(id: string, effort?: string): string | undefined;
