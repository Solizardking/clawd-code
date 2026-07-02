/**
 * Clawd Code - DeepSeek OpenAI-compatible API client
 */
export class DeepSeekClient {
    apiKey;
    baseUrl;
    constructor(apiKey, baseUrl = 'https://api.deepseek.com') {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }
    async chat(options) {
        const body = {
            model: options.model,
            messages: options.messages,
            max_tokens: options.maxTokens,
            temperature: options.temperature,
            stream: false,
        };
        if (options.thinking !== undefined) {
            body.thinking = { type: options.thinking ? 'enabled' : 'disabled' };
        }
        if (options.reasoningEffort) {
            body.reasoning_effort = options.reasoningEffort;
        }
        const response = await fetch(`${this.baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`DeepSeek ${response.status}: ${error}`);
        }
        const data = (await response.json());
        return {
            content: data.choices?.[0]?.message?.content?.trim() ?? '',
            usage: data.usage,
            model: data.model,
        };
    }
}
export function createDeepSeekClient(apiKey, baseUrl) {
    if (!apiKey)
        return null;
    return new DeepSeekClient(apiKey, baseUrl);
}
//# sourceMappingURL=deepseek.js.map