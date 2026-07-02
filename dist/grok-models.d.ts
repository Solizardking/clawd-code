/**
 * Clawd Code — Model Registry
 * Z.AI GLM + xAI Grok + Anthropic Claude + DeepSeek + OpenRouter model definitions
 *
 * Default model: Z.AI GLM-5.2 for code/REPL/trade/research.
 * Single source of truth used by cli.ts, modes/*, and the /inspect command.
 */
export type ClawdProvider = 'zai' | 'xai' | 'anthropic' | 'deepseek' | 'openrouter';
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
    reasoningEfforts?: string[];
    aliases?: string[];
    provider: ClawdProvider;
    streaming?: boolean;
    /** Best-fit mode for this model (used by `clawd-code inspect` recommendations). */
    bestFor?: 'code' | 'research' | 'voice' | 'image' | 'general';
}
/** General-purpose default (code mode, REPL, trade). GLM-5.2 — 1M context, thinking, streaming. */
export declare const DEFAULT_MODEL = "glm-5.2";
/** Default for research mode. */
export declare const DEFAULT_RESEARCH_MODEL = "glm-5.2";
/** Default for image generation mode. */
export declare const DEFAULT_IMAGE_MODEL = "glm-image";
/** Default for voice agent mode (realtime voice). */
export declare const DEFAULT_VOICE_MODEL = "grok-voice-think-fast-1.0";
/** Default for fast/cheap tasks. */
export declare const DEFAULT_FAST_MODEL = "glm-5-turbo";
/** Default for chart, screenshot, and multimodal analysis. */
export declare const DEFAULT_VISION_MODEL = "glm-5v-turbo";
/** Default for trading chart vision analysis. */
export declare const DEFAULT_TRADE_VISION_MODEL = "glm-5v-turbo";
/** Default provider (Z.AI / GLM). */
export declare const DEFAULT_PROVIDER: ClawdProvider;
export declare const MODELS: ModelDefinition[];
export declare function getModel(id: string): ModelDefinition | undefined;
export declare function normalizeModelId(id: string): string;
export declare function listModelIds(): string[];
export declare function listModelsByProvider(provider: ClawdProvider): ModelDefinition[];
/** Best default model for a given mode. */
export declare function defaultModelFor(mode: 'code' | 'research' | 'voice' | 'image' | 'general' | 'repl' | 'trade' | 'vision'): string;
export declare function getSupportedReasoningEfforts(id: string): string[];
export declare function getEffectiveReasoningEffort(id: string, effort?: string): string | undefined;
export declare function isMultiAgentModel(id: string): boolean;
export declare function isResponsesOnlyModel(id: string): boolean;
export declare function isStreamingSupported(id: string): boolean;
/**
 * If the requested model is not usable for the given mode (e.g. responses-only
 * models can't do client-side tool calls in code mode), return a sensible
 * fallback. Otherwise return the requested id unchanged.
 */
export declare function resolveModelForMode(requested: string, mode: 'code' | 'repl' | 'trade' | 'research' | 'voice' | 'image' | 'general'): string;
export declare function printModelsTable(): void;
//# sourceMappingURL=grok-models.d.ts.map