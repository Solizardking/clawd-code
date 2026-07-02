/**
 * Clawd Code — Anthropic Claude client
 * Streaming-first, zero-dependency (native fetch + SSE parsing)
 * Models: claude-sonnet-4-6 (default), claude-opus-4-8, claude-haiku-4-5-20251001
 */
export const ANTHROPIC_MODELS = [
    'claude-sonnet-4-6',
    'claude-opus-4-8',
    'claude-haiku-4-5-20251001',
];
export const DEFAULT_CLAUDE_MODEL = 'claude-sonnet-4-6';
const ANTHROPIC_BASE_URL = 'https://api.anthropic.com/v1';
const ANTHROPIC_VERSION = '2023-06-01';
export class AnthropicClient {
    apiKey;
    baseUrl;
    constructor(apiKey, baseUrl = ANTHROPIC_BASE_URL) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }
    hasApiKey() {
        return this.apiKey.length > 0;
    }
    async chat(options) {
        const body = {
            model: options.model || DEFAULT_CLAUDE_MODEL,
            max_tokens: options.maxTokens ?? 8096,
            messages: options.messages,
        };
        if (options.system)
            body.system = options.system;
        if (options.temperature !== undefined)
            body.temperature = options.temperature;
        const response = await this.post('/messages', body);
        const text = response.content
            .filter((b) => b.type === 'text')
            .map((b) => b.text ?? '')
            .join('');
        return { content: text.trim(), usage: response.usage, model: response.model };
    }
    async *stream(options) {
        const body = {
            model: options.model || DEFAULT_CLAUDE_MODEL,
            max_tokens: options.maxTokens ?? 8096,
            stream: true,
            messages: options.messages,
        };
        if (options.system)
            body.system = options.system;
        if (options.temperature !== undefined)
            body.temperature = options.temperature;
        const response = await fetch(`${this.baseUrl}/messages`, {
            method: 'POST',
            headers: {
                'x-api-key': this.apiKey,
                'anthropic-version': ANTHROPIC_VERSION,
                'content-type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            const err = await response.text();
            throw new Error(`Anthropic ${response.status}: ${err}`);
        }
        const reader = response.body?.getReader();
        if (!reader)
            throw new Error('No response body');
        const decoder = new TextDecoder();
        let buffer = '';
        let finalUsage;
        while (true) {
            const { done, value } = await reader.read();
            if (done)
                break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() ?? '';
            for (const line of lines) {
                if (!line.startsWith('data: '))
                    continue;
                const data = line.slice(6).trim();
                if (!data || data === '[DONE]')
                    continue;
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                        yield { text: parsed.delta.text, done: false };
                    }
                    else if (parsed.type === 'message_delta' && parsed.usage) {
                        finalUsage = parsed.usage;
                    }
                    else if (parsed.type === 'message_stop') {
                        yield { text: '', done: true, usage: finalUsage };
                        return;
                    }
                }
                catch {
                    // skip malformed SSE frames
                }
            }
        }
        yield { text: '', done: true, usage: finalUsage };
    }
    async post(path, body) {
        const response = await fetch(`${this.baseUrl}${path}`, {
            method: 'POST',
            headers: {
                'x-api-key': this.apiKey,
                'anthropic-version': ANTHROPIC_VERSION,
                'content-type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            const err = await response.text();
            throw new Error(`Anthropic ${response.status}: ${err}`);
        }
        return (await response.json());
    }
}
export function createAnthropicClient(apiKey) {
    if (!apiKey)
        return null;
    return new AnthropicClient(apiKey);
}
export function isClaudeModel(model) {
    return model.startsWith('claude-');
}
//# sourceMappingURL=anthropic.js.map