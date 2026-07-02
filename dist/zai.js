/**
 * Clawd Code - Z.AI OpenAI-compatible API client
 * Supports GLM-5.2 chat, GLM-5V vision, GLM-Image generation, and thinking mode.
 */
export const ZAI_BASE_URL = 'https://api.z.ai/api/paas/v4';
export const ZAI_AGENT_BASE_URL = 'https://api.z.ai/api/v1';
export const ZAI_DEFAULT_MODEL = 'glm-5.2';
export const ZAI_FAST_MODEL = 'glm-5-turbo';
export const ZAI_VISION_MODEL = 'glm-5v-turbo';
export const ZAI_TRADE_VISION_MODEL = 'glm-5v-turbo';
export const ZAI_VISION_FAST_MODEL = 'glm-4.6v-flashx';
export const ZAI_IMAGE_MODEL = 'glm-image';
export const ZAI_IMAGE_FALLBACK_MODEL = 'cogview-4';
export const ZAI_SLIDE_AGENT_ID = 'slides_glm_agent';
function envValue(env, key, fallback) {
    const value = env[key]?.trim();
    return value || fallback;
}
function normalizeBaseUrl(url) {
    return url.replace(/\/+$/, '');
}
export function normalizeZaiThinking(value) {
    const normalized = (value ?? '').trim().toLowerCase();
    if (['0', 'false', 'off', 'no', 'disabled', 'disable'].includes(normalized))
        return 'disabled';
    return 'enabled';
}
export function normalizeZaiReasoningEffort(value) {
    const normalized = (value ?? '').trim().toLowerCase();
    if (['max', 'xhigh', 'high', 'medium', 'low', 'minimal', 'none'].includes(normalized)) {
        return normalized;
    }
    return 'max';
}
export function getZaiEnvConfig(env = process.env) {
    const model = envValue(env, 'ZAI_MODEL', ZAI_DEFAULT_MODEL);
    const visionModel = envValue(env, 'ZAI_VISION_MODEL', ZAI_VISION_MODEL);
    const tradeVisionModel = envValue(env, 'ZAI_TRADE_VISION_MODEL', visionModel || ZAI_TRADE_VISION_MODEL);
    return {
        baseUrl: normalizeBaseUrl(envValue(env, 'ZAI_BASE_URL', ZAI_BASE_URL)),
        agentBaseUrl: normalizeBaseUrl(envValue(env, 'ZAI_AGENT_BASE_URL', ZAI_AGENT_BASE_URL)),
        model,
        fastModel: envValue(env, 'ZAI_FAST_MODEL', ZAI_FAST_MODEL),
        chartModel: envValue(env, 'ZAI_CHART_MODEL', model),
        visionModel,
        tradeVisionModel,
        chartVisionModel: envValue(env, 'ZAI_CHART_VISION_MODEL', tradeVisionModel),
        visionFastModel: envValue(env, 'ZAI_VISION_FAST_MODEL', ZAI_VISION_FAST_MODEL),
        imageModel: envValue(env, 'ZAI_IMAGE_MODEL', ZAI_IMAGE_MODEL),
        thinkingType: normalizeZaiThinking(env.ZAI_THINKING),
        reasoningEffort: normalizeZaiReasoningEffort(env.ZAI_REASONING_EFFORT),
    };
}
export function buildZaiSlideAgentRequest(options) {
    const body = {
        agent_id: ZAI_SLIDE_AGENT_ID,
        stream: options.stream ?? false,
        messages: [
            {
                role: 'user',
                content: [
                    {
                        type: 'text',
                        text: options.prompt,
                    },
                ],
            },
        ],
    };
    if (options.conversationId)
        body.conversation_id = options.conversationId;
    if (options.requestId)
        body.request_id = options.requestId;
    return body;
}
export function buildZaiSlideAgentExportRequest(options) {
    return {
        agent_id: ZAI_SLIDE_AGENT_ID,
        conversation_id: options.conversationId,
        custom_variables: {
            include_pdf: options.includePdf ?? true,
            ...(options.pages?.length ? { pages: options.pages } : {}),
        },
    };
}
export function extractZaiSlideAgentText(response) {
    const chunks = [];
    for (const choice of response.choices ?? []) {
        for (const message of choice.message ?? choice.messages ?? []) {
            for (const content of message.content ?? []) {
                if (content.text)
                    chunks.push(content.text);
                if (content.object?.output)
                    chunks.push(content.object.output);
            }
        }
    }
    return chunks.join('\n').trim();
}
export function extractZaiSlideAgentUrls(response) {
    const urls = [];
    for (const choice of response.choices ?? []) {
        for (const message of choice.message ?? choice.messages ?? []) {
            for (const content of message.content ?? []) {
                const tag = content.tag_en || content.tag_cn;
                if (content.file_url)
                    urls.push({ type: 'file', url: content.file_url, tag });
                if (content.image_url)
                    urls.push({ type: 'image', url: content.image_url, tag });
            }
        }
    }
    return urls;
}
export class ZaiClient {
    apiKey;
    baseUrl;
    constructor(apiKey, baseUrl = ZAI_BASE_URL) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }
    hasApiKey() {
        return this.apiKey.length > 0;
    }
    async chat(options) {
        const response = await this.post('/chat/completions', {
            model: options.model,
            messages: options.messages,
            max_tokens: options.maxTokens,
            temperature: options.temperature,
            thinking: { type: options.thinking ?? 'enabled' },
            reasoning_effort: options.reasoningEffort,
        });
        const message = response.choices?.[0]?.message;
        return {
            content: message?.content?.trim() ?? '',
            reasoningContent: message?.reasoning_content,
            usage: response.usage,
            model: response.model,
        };
    }
    async *streamChat(options) {
        const response = await fetch(`${normalizeBaseUrl(this.baseUrl)}/chat/completions`, {
            method: 'POST',
            headers: this.headers('text/event-stream'),
            body: JSON.stringify({
                model: options.model,
                messages: options.messages,
                max_tokens: options.maxTokens,
                temperature: options.temperature,
                thinking: { type: options.thinking ?? 'enabled' },
                reasoning_effort: options.reasoningEffort,
                stream: true,
            }),
        });
        if (!response.ok) {
            const err = await response.text();
            throw new Error(`Z.AI ${response.status}: ${err}`);
        }
        const reader = response.body?.getReader();
        if (!reader)
            throw new Error('Z.AI stream: no response body');
        const decoder = new TextDecoder();
        let buffer = '';
        let finalUsage;
        let finalModel;
        while (true) {
            const { done, value } = await reader.read();
            if (done)
                break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() ?? '';
            for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed.startsWith('data:'))
                    continue;
                const data = trimmed.slice(5).trim();
                if (!data || data === '[DONE]')
                    continue;
                try {
                    const parsed = JSON.parse(data);
                    const delta = parsed.choices?.[0]?.delta;
                    if (parsed.usage)
                        finalUsage = parsed.usage;
                    if (parsed.model)
                        finalModel = parsed.model;
                    yield {
                        text: delta?.content ?? '',
                        reasoning: delta?.reasoning_content,
                        done: false,
                    };
                }
                catch {
                    // Skip malformed SSE frames.
                }
            }
        }
        yield { text: '', done: true, usage: finalUsage, model: finalModel };
    }
    async analyzeImage(options) {
        return this.chat({
            model: options.model,
            messages: [
                {
                    role: 'user',
                    content: [
                        { type: 'image_url', image_url: { url: options.imageUrl } },
                        { type: 'text', text: options.prompt },
                    ],
                },
            ],
            maxTokens: options.maxTokens,
            thinking: options.thinking,
            reasoningEffort: options.reasoningEffort,
        });
    }
    async generateImage(options) {
        const response = await this.post('/images/generations', {
            model: options.model,
            prompt: options.prompt,
            size: options.size,
        });
        const first = response.data?.[0] ?? {};
        return {
            url: first.url,
            b64Json: first.b64_json,
            model: response.model ?? options.model,
        };
    }
    headers(accept) {
        return {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'Accept-Language': 'en-US,en',
            ...(accept ? { Accept: accept } : {}),
        };
    }
    async post(path, body) {
        const response = await fetch(`${normalizeBaseUrl(this.baseUrl)}${path}`, {
            method: 'POST',
            headers: this.headers(),
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Z.AI ${response.status}: ${error}`);
        }
        return response.json();
    }
}
export class ZaiAgentClient {
    apiKey;
    baseUrl;
    constructor(apiKey, baseUrl = ZAI_AGENT_BASE_URL) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }
    hasApiKey() {
        return this.apiKey.length > 0;
    }
    async createSlidePoster(options) {
        return this.post('/agents', buildZaiSlideAgentRequest(options));
    }
    async getSlidePosterExport(options) {
        return this.post('/agents/conversation', buildZaiSlideAgentExportRequest(options));
    }
    headers() {
        return {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'Accept-Language': 'en-US,en',
        };
    }
    async post(path, body) {
        const response = await fetch(`${normalizeBaseUrl(this.baseUrl)}${path}`, {
            method: 'POST',
            headers: this.headers(),
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Z.AI Agent ${response.status}: ${error}`);
        }
        return response.json();
    }
}
export function createZaiClient(apiKey, baseUrl) {
    if (!apiKey)
        return null;
    return new ZaiClient(apiKey, baseUrl);
}
export function createZaiAgentClient(apiKey, baseUrl) {
    if (!apiKey)
        return null;
    return new ZaiAgentClient(apiKey, baseUrl);
}
export function createZaiClientFromEnv(env) {
    const config = getZaiEnvConfig(env);
    return createZaiClient(env.ZAI_API_KEY, config.baseUrl);
}
export function createZaiAgentClientFromEnv(env) {
    const config = getZaiEnvConfig(env);
    return createZaiAgentClient(env.ZAI_API_KEY, config.agentBaseUrl);
}
//# sourceMappingURL=zai.js.map