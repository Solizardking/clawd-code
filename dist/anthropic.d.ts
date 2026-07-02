/**
 * Clawd Code — Anthropic Claude client
 * Streaming-first, zero-dependency (native fetch + SSE parsing)
 * Models: claude-sonnet-4-6 (default), claude-opus-4-8, claude-haiku-4-5-20251001
 */
export interface AnthropicMessage {
    role: 'user' | 'assistant';
    content: string;
}
export interface AnthropicUsage {
    input_tokens: number;
    output_tokens: number;
}
export interface AnthropicTextResponse {
    content: string;
    usage?: AnthropicUsage;
    model?: string;
}
export type AnthropicModel = 'claude-sonnet-4-6' | 'claude-opus-4-8' | 'claude-haiku-4-5-20251001';
export declare const ANTHROPIC_MODELS: AnthropicModel[];
export declare const DEFAULT_CLAUDE_MODEL: AnthropicModel;
export declare class AnthropicClient {
    private readonly apiKey;
    private readonly baseUrl;
    constructor(apiKey: string, baseUrl?: string);
    hasApiKey(): boolean;
    chat(options: {
        model: string;
        system?: string;
        messages: AnthropicMessage[];
        maxTokens?: number;
        temperature?: number;
    }): Promise<AnthropicTextResponse>;
    stream(options: {
        model: string;
        system?: string;
        messages: AnthropicMessage[];
        maxTokens?: number;
        temperature?: number;
    }): AsyncGenerator<{
        text: string;
        done: boolean;
        usage?: AnthropicUsage;
    }>;
    private post;
}
export declare function createAnthropicClient(apiKey: string | undefined): AnthropicClient | null;
export declare function isClaudeModel(model: string): boolean;
//# sourceMappingURL=anthropic.d.ts.map