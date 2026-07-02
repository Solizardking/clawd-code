/**
 * Clawd Code - xAI API client
 * Supports chat completions, the Responses API, and streaming for both.
 */
export interface XaiUsage {
    input_tokens?: number;
    output_tokens?: number;
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
    reasoning_tokens?: number;
}
export interface XaiTextResponse {
    content: string;
    citations: string[];
    usage?: XaiUsage;
    model?: string;
}
export type XaiMessage = {
    role: 'system' | 'user' | 'assistant';
    content: string;
};
export declare const XAI_BASE_URL = "https://api.x.ai/v1";
export declare class XaiClient {
    private readonly apiKey;
    private readonly baseUrl;
    constructor(apiKey: string, baseUrl?: string);
    hasApiKey(): boolean;
    /** Lightweight health check — hits the public /models endpoint. */
    ping(): Promise<{
        ok: boolean;
        models?: string[];
        error?: string;
    }>;
    chat(options: {
        model: string;
        messages: XaiMessage[];
        maxTokens?: number;
        temperature?: number;
    }): Promise<XaiTextResponse>;
    /**
     * Stream a chat completion (SSE). Yields text deltas + final usage.
     * Mirrors the Anthropic/OpenRouter streaming UX.
     */
    streamChat(options: {
        model: string;
        messages: XaiMessage[];
        maxTokens?: number;
        temperature?: number;
    }): AsyncGenerator<{
        text: string;
        done: boolean;
        usage?: XaiUsage;
        model?: string;
    }>;
    responses(options: {
        model: string;
        input: Array<{
            role: 'user' | 'system';
            content: string;
        }>;
        tools?: Array<{
            type: 'web_search' | 'x_search' | 'code_interpreter';
        }>;
        reasoning?: {
            effort: 'low' | 'medium' | 'high' | 'none';
        };
        agentCount?: 4 | 16;
    }): Promise<XaiTextResponse>;
    /**
     * Stream a Responses API call (SSE). Yields text deltas, reasoning summary
     * deltas, and a final usage payload. Used by research mode for live
     * progress on multi-agent runs.
     */
    streamResponses(options: {
        model: string;
        input: Array<{
            role: 'user' | 'system';
            content: string;
        }>;
        tools?: Array<{
            type: 'web_search' | 'x_search' | 'code_interpreter';
        }>;
        reasoning?: {
            effort: 'low' | 'medium' | 'high' | 'none';
        };
        agentCount?: 4 | 16;
    }): AsyncGenerator<{
        text: string;
        reasoning?: string;
        done: boolean;
        usage?: XaiUsage;
        model?: string;
    }>;
    private post;
}
export declare function createXaiClient(apiKey: string | undefined): XaiClient | null;
//# sourceMappingURL=xai.d.ts.map