/**
 * Clawd Code - xAI API client
 * Supports chat completions, the Responses API, and streaming for both.
 */
export const XAI_BASE_URL = 'https://api.x.ai/v1';
export class XaiClient {
    apiKey;
    baseUrl;
    constructor(apiKey, baseUrl = XAI_BASE_URL) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }
    hasApiKey() {
        return this.apiKey.length > 0;
    }
    /** Lightweight health check — hits the public /models endpoint. */
    async ping() {
        try {
            const response = await fetch(`${this.baseUrl}/models`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${this.apiKey}` },
            });
            if (!response.ok) {
                return { ok: false, error: `xAI ${response.status}` };
            }
            const data = (await response.json());
            const models = (data.data ?? []).map((m) => m.id);
            return { ok: true, models };
        }
        catch (error) {
            return { ok: false, error: error instanceof Error ? error.message : String(error) };
        }
    }
    async chat(options) {
        const response = await this.post('/chat/completions', {
            model: options.model,
            messages: options.messages,
            max_tokens: options.maxTokens,
            temperature: options.temperature,
        });
        return {
            content: response.choices?.[0]?.message?.content?.trim() ?? '',
            citations: [],
            usage: response.usage,
            model: response.model,
        };
    }
    /**
     * Stream a chat completion (SSE). Yields text deltas + final usage.
     * Mirrors the Anthropic/OpenRouter streaming UX.
     */
    async *streamChat(options) {
        const response = await fetch(`${this.baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
                Accept: 'text/event-stream',
            },
            body: JSON.stringify({
                model: options.model,
                messages: options.messages,
                max_tokens: options.maxTokens,
                temperature: options.temperature,
                stream: true,
            }),
        });
        if (!response.ok) {
            const err = await response.text();
            throw new Error(`xAI ${response.status}: ${err}`);
        }
        const reader = response.body?.getReader();
        if (!reader)
            throw new Error('xAI stream: no response body');
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
                    const delta = parsed.choices?.[0]?.delta?.content ?? '';
                    if (parsed.usage)
                        finalUsage = parsed.usage;
                    if (parsed.model)
                        finalModel = parsed.model;
                    if (delta)
                        yield { text: delta, done: false };
                }
                catch {
                    // skip malformed SSE frames
                }
            }
        }
        yield { text: '', done: true, usage: finalUsage, model: finalModel };
    }
    async responses(options) {
        const body = {
            model: options.model,
            input: options.input,
            tools: options.tools,
            reasoning: options.reasoning,
        };
        if (options.model === 'grok-4.20-multi-agent' && options.agentCount) {
            body.agent_count = options.agentCount;
        }
        const response = await this.post('/responses', body);
        return {
            content: extractResponsesText(response).trim(),
            citations: response.citations ?? [],
            usage: response.usage,
            model: response.model,
        };
    }
    /**
     * Stream a Responses API call (SSE). Yields text deltas, reasoning summary
     * deltas, and a final usage payload. Used by research mode for live
     * progress on multi-agent runs.
     */
    async *streamResponses(options) {
        const body = {
            model: options.model,
            input: options.input,
            tools: options.tools,
            reasoning: options.reasoning,
            stream: true,
        };
        if (options.model === 'grok-4.20-multi-agent' && options.agentCount) {
            body.agent_count = options.agentCount;
        }
        const response = await fetch(`${this.baseUrl}/responses`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
                Accept: 'text/event-stream',
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            const err = await response.text();
            throw new Error(`xAI ${response.status}: ${err}`);
        }
        const reader = response.body?.getReader();
        if (!reader)
            throw new Error('xAI responses stream: no response body');
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
                let parsed;
                try {
                    parsed = JSON.parse(data);
                }
                catch {
                    continue;
                }
                if (!parsed || typeof parsed !== 'object')
                    continue;
                const event = parsed;
                const type = typeof event.type === 'string' ? event.type : '';
                if (type === 'response.output_text.delta' && typeof event.delta === 'string') {
                    yield { text: event.delta, done: false };
                }
                else if (type === 'response.reasoning_summary_text.delta' && typeof event.delta === 'string') {
                    yield { text: '', reasoning: event.delta, done: false };
                }
                else if (type === 'response.completed' && event.response && typeof event.response === 'object') {
                    const r = event.response;
                    if (r.usage)
                        finalUsage = r.usage;
                    if (typeof r.model === 'string')
                        finalModel = r.model;
                }
            }
        }
        yield { text: '', done: true, usage: finalUsage, model: finalModel };
    }
    async post(path, body) {
        const response = await fetch(`${this.baseUrl}${path}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`xAI ${response.status}: ${error}`);
        }
        return (await response.json());
    }
}
export function createXaiClient(apiKey) {
    if (!apiKey)
        return null;
    return new XaiClient(apiKey);
}
function extractResponsesText(response) {
    if (response.output_text)
        return response.output_text;
    const chunks = [];
    for (const item of response.output ?? []) {
        for (const content of item.content ?? []) {
            if (content.text)
                chunks.push(content.text);
        }
    }
    return chunks.join('\n');
}
//# sourceMappingURL=xai.js.map