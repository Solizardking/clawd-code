/**
 * Clawd Code — OpenRouter Adapter
 * OpenAI-compatible API for OpenRouter models (with reasoning support)
 * Default free model: nvidia/nemotron-3-ultra-550b-a55b:free
 */
export interface OpenRouterMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
    reasoning_details?: unknown;
}
export interface OpenRouterRequest {
    model: string;
    messages: OpenRouterMessage[];
    stream?: boolean;
    reasoning?: {
        enabled: boolean;
        effort?: 'low' | 'medium' | 'high';
    };
    max_tokens?: number;
    temperature?: number;
    top_p?: number;
}
export interface OpenRouterUsage {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
    reasoning_tokens?: number;
}
export interface OpenRouterResponse {
    id: string;
    model: string;
    choices: Array<{
        index: number;
        message: {
            role: 'assistant';
            content: string;
            reasoning_details?: unknown;
        };
        finish_reason: string;
    }>;
    usage?: OpenRouterUsage;
}
export declare const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";
export declare const OPENROUTER_NEMO_MODEL1 = "nvidia/nemotron-3-ultra-550b-a55b:free";
export declare const OPENROUTER_NEMO_MODEL2 = "nvidia/nemotron-3-ultra-550b-a55b";
export declare const OPENROUTER_NEMO_MODEL3 = "nvidia/nemotron-3-super-120b-a12b:free";
export declare const OPENROUTER_FABLE5 = "anthropic/claude-fable-5";
export declare const OPENROUTER_FABLE_LATESY = "~anthropic/claude-fable-latest";
export declare const OPENROUTER_FABLE_LATEST = "~anthropic/claude-fable-latest";
export declare const OPENROUTER_AUTO_MODEL = "auto";
export declare const DEFAULT_FREE_MODEL = "nvidia/nemotron-3-ultra-550b-a55b:free";
export type OpenRouterPromptMode = 'code' | 'research' | 'repl' | 'trade' | 'general';
export type OpenRouterRoute = 'fast' | 'balanced' | 'intelligent' | 'explicit';
export interface OpenRouterNemoModels {
    model1: string;
    model2: string;
    model3: string;
    balanced: string;
    intelligent: string;
    fast: string;
}
export interface OpenRouterFableModels {
    fable5: string;
    latest: string;
}
export interface OpenRouterProviderModels extends OpenRouterNemoModels, OpenRouterFableModels {
}
export interface OpenRouterModelSelection {
    model: string;
    route: OpenRouterRoute;
    reason: string;
    explicit: boolean;
    reasoning?: OpenRouterRequest['reasoning'];
}
export declare function getOpenRouterNemoModels(env?: Record<string, string | undefined>): OpenRouterNemoModels;
export declare function getOpenRouterFableModels(env?: Record<string, string | undefined>): OpenRouterFableModels;
export declare function getOpenRouterProviderModels(env?: Record<string, string | undefined>): OpenRouterProviderModels;
export declare function isOpenRouterAutoModel(model: string | undefined): boolean;
export declare function classifyOpenRouterPrompt(prompt: string, mode?: OpenRouterPromptMode): Exclude<OpenRouterRoute, 'explicit'>;
export declare function selectOpenRouterModel(options: {
    prompt: string;
    mode?: OpenRouterPromptMode;
    requestedModel?: string;
    env?: Record<string, string | undefined>;
}): OpenRouterModelSelection;
export declare class OpenRouterClient {
    private apiKey;
    private baseUrl;
    private defaultModel;
    constructor(apiKey: string, baseUrl?: string, defaultModel?: string);
    /**
     * Send a chat completion request (non-streaming)
     */
    chat(request: Omit<OpenRouterRequest, 'stream'>): Promise<OpenRouterResponse>;
    /**
     * Stream a chat completion (yields text deltas + reasoning tokens)
     */
    stream(request: Omit<OpenRouterRequest, 'stream'>): AsyncGenerator<{
        content: string;
        reasoning?: string;
        usage?: OpenRouterUsage;
        done: boolean;
    }>;
    /**
     * Quick prompt helper — returns just the text content
     */
    prompt(userMessage: string, options?: {
        model?: string;
        systemPrompt?: string;
        reasoning?: boolean;
        reasoningEffort?: 'low' | 'medium' | 'high';
        maxTokens?: number;
    }): Promise<{
        content: string;
        reasoning_details?: unknown;
        usage?: OpenRouterUsage;
        model: string;
    }>;
    getDefaultModel(): string;
    hasApiKey(): boolean;
}
/**
 * Create an OpenRouter client from env vars
 */
export declare function createOpenRouterClient(env: Record<string, string>): OpenRouterClient | null;
//# sourceMappingURL=openrouter.d.ts.map