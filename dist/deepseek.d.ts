/**
 * Clawd Code - DeepSeek OpenAI-compatible API client
 */
export interface DeepSeekUsage {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
    prompt_cache_hit_tokens?: number;
    prompt_cache_miss_tokens?: number;
}
export interface DeepSeekTextResponse {
    content: string;
    usage?: DeepSeekUsage;
    model?: string;
}
type DeepSeekMessage = {
    role: 'system' | 'user' | 'assistant';
    content: string;
};
export declare class DeepSeekClient {
    private readonly apiKey;
    private readonly baseUrl;
    constructor(apiKey: string, baseUrl?: string);
    chat(options: {
        model: string;
        messages: DeepSeekMessage[];
        maxTokens?: number;
        temperature?: number;
        reasoningEffort?: 'low' | 'medium' | 'high';
        thinking?: boolean;
    }): Promise<DeepSeekTextResponse>;
}
export declare function createDeepSeekClient(apiKey: string | undefined, baseUrl?: string): DeepSeekClient | null;
export {};
//# sourceMappingURL=deepseek.d.ts.map