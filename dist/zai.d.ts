/**
 * Clawd Code - Z.AI OpenAI-compatible API client
 * Supports GLM-5.2 chat, GLM-5V vision, GLM-Image generation, and thinking mode.
 */
export declare const ZAI_BASE_URL = "https://api.z.ai/api/paas/v4";
export declare const ZAI_AGENT_BASE_URL = "https://api.z.ai/api/v1";
export declare const ZAI_DEFAULT_MODEL = "glm-5.2";
export declare const ZAI_FAST_MODEL = "glm-5-turbo";
export declare const ZAI_VISION_MODEL = "glm-5v-turbo";
export declare const ZAI_TRADE_VISION_MODEL = "glm-5v-turbo";
export declare const ZAI_VISION_FAST_MODEL = "glm-4.6v-flashx";
export declare const ZAI_IMAGE_MODEL = "glm-image";
export declare const ZAI_IMAGE_FALLBACK_MODEL = "cogview-4";
export declare const ZAI_SLIDE_AGENT_ID = "slides_glm_agent";
export type ZaiThinkingType = 'enabled' | 'disabled';
export type ZaiReasoningEffort = 'max' | 'xhigh' | 'high' | 'medium' | 'low' | 'minimal' | 'none';
export type ZaiMessageContent = string | Array<{
    type: 'text';
    text: string;
} | {
    type: 'image_url';
    image_url: {
        url: string;
    };
}>;
export interface ZaiMessage {
    role: 'system' | 'user' | 'assistant';
    content: ZaiMessageContent;
}
export interface ZaiUsage {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
}
export interface ZaiTextResponse {
    content: string;
    reasoningContent?: string;
    usage?: ZaiUsage;
    model?: string;
}
export interface ZaiImageResponse {
    url?: string;
    b64Json?: string;
    model?: string;
}
export interface ZaiEnvConfig {
    baseUrl: string;
    agentBaseUrl: string;
    model: string;
    fastModel: string;
    chartModel: string;
    visionModel: string;
    tradeVisionModel: string;
    chartVisionModel: string;
    visionFastModel: string;
    imageModel: string;
    thinkingType: ZaiThinkingType;
    reasoningEffort: ZaiReasoningEffort;
}
export interface ZaiSlideAgentPage {
    position: number;
    width?: number;
    height?: number;
}
export interface ZaiSlideAgentRequestOptions {
    prompt: string;
    stream?: boolean;
    conversationId?: string;
    requestId?: string;
}
export interface ZaiSlideAgentExportOptions {
    conversationId: string;
    includePdf?: boolean;
    pages?: ZaiSlideAgentPage[];
}
export type ZaiSlideAgentContentItem = {
    type?: string;
    tag_cn?: string;
    tag_en?: string;
    text?: string;
    file_url?: string;
    image_url?: string;
    object?: {
        tool_name?: string;
        input?: string;
        output?: string;
        position?: number[];
    };
};
export interface ZaiSlideAgentMessage {
    role?: string;
    phase?: string;
    content?: ZaiSlideAgentContentItem[];
}
export interface ZaiSlideAgentChoice {
    index?: number;
    finish_reason?: string;
    message?: ZaiSlideAgentMessage[];
    messages?: ZaiSlideAgentMessage[];
}
export interface ZaiSlideAgentResponse {
    id?: string;
    conversation_id?: string;
    agent_id?: string;
    choices?: ZaiSlideAgentChoice[];
    error?: {
        code?: string;
        message?: string;
    };
}
export declare function normalizeZaiThinking(value: string | undefined): ZaiThinkingType;
export declare function normalizeZaiReasoningEffort(value: string | undefined): ZaiReasoningEffort;
export declare function getZaiEnvConfig(env?: Record<string, string | undefined>): ZaiEnvConfig;
export declare function buildZaiSlideAgentRequest(options: ZaiSlideAgentRequestOptions): Record<string, unknown>;
export declare function buildZaiSlideAgentExportRequest(options: ZaiSlideAgentExportOptions): Record<string, unknown>;
export declare function extractZaiSlideAgentText(response: ZaiSlideAgentResponse): string;
export declare function extractZaiSlideAgentUrls(response: ZaiSlideAgentResponse): Array<{
    type: 'file' | 'image';
    url: string;
    tag?: string;
}>;
export declare class ZaiClient {
    private readonly apiKey;
    private readonly baseUrl;
    constructor(apiKey: string, baseUrl?: string);
    hasApiKey(): boolean;
    chat(options: {
        model: string;
        messages: ZaiMessage[];
        maxTokens?: number;
        temperature?: number;
        thinking?: ZaiThinkingType;
        reasoningEffort?: ZaiReasoningEffort;
    }): Promise<ZaiTextResponse>;
    streamChat(options: {
        model: string;
        messages: ZaiMessage[];
        maxTokens?: number;
        temperature?: number;
        thinking?: ZaiThinkingType;
        reasoningEffort?: ZaiReasoningEffort;
    }): AsyncGenerator<{
        text: string;
        reasoning?: string;
        done: boolean;
        usage?: ZaiUsage;
        model?: string;
    }>;
    analyzeImage(options: {
        model: string;
        prompt: string;
        imageUrl: string;
        maxTokens?: number;
        thinking?: ZaiThinkingType;
        reasoningEffort?: ZaiReasoningEffort;
    }): Promise<ZaiTextResponse>;
    generateImage(options: {
        model: string;
        prompt: string;
        size?: string;
    }): Promise<ZaiImageResponse>;
    private headers;
    private post;
}
export declare class ZaiAgentClient {
    private readonly apiKey;
    private readonly baseUrl;
    constructor(apiKey: string, baseUrl?: string);
    hasApiKey(): boolean;
    createSlidePoster(options: ZaiSlideAgentRequestOptions): Promise<ZaiSlideAgentResponse>;
    getSlidePosterExport(options: ZaiSlideAgentExportOptions): Promise<ZaiSlideAgentResponse>;
    private headers;
    private post;
}
export declare function createZaiClient(apiKey: string | undefined, baseUrl?: string): ZaiClient | null;
export declare function createZaiAgentClient(apiKey: string | undefined, baseUrl?: string): ZaiAgentClient | null;
export declare function createZaiClientFromEnv(env: Record<string, string | undefined>): ZaiClient | null;
export declare function createZaiAgentClientFromEnv(env: Record<string, string | undefined>): ZaiAgentClient | null;
//# sourceMappingURL=zai.d.ts.map