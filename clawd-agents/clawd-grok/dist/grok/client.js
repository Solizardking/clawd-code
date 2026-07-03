import { createXai } from "@ai-sdk/xai";
import { generateText } from "ai";
import { getReasoningEffortForModel } from "../utils/settings";
import { getEffectiveReasoningEffort, getModelInfo, normalizeModelId } from "./models";
const DEFAULT_TITLE_MODEL = "grok-4.20-non-reasoning";
const DEFAULT_RECAP_MODEL = "grok-4.20-non-reasoning";
const RETIRED_MODEL_MAP = {
    "grok-4-0709": "grok-4.3",
    "grok-code-fast-1": "grok-4.3",
    "grok-4-1-fast-reasoning": "grok-4.3",
    "grok-3": "grok-4.20-non-reasoning",
};
export function createProvider(apiKey, baseURL) {
    return createXai({
        apiKey,
        baseURL: baseURL || process.env.AI_BASE_URL || process.env.GROK_BASE_URL || "https://api.x.ai/v1",
    });
}
export function resolveModelRuntime(provider, modelId) {
    const normalizedModelId = RETIRED_MODEL_MAP[modelId] ?? normalizeModelId(modelId);
    const info = getModelInfo(normalizedModelId);
    const chatModel = provider.chat(normalizedModelId);
    const normalizedFromAlias = normalizedModelId !== modelId;
    const configuredEffort = getReasoningEffortForModel(normalizedModelId);
    const reasoningEffort = normalizedFromAlias
        ? undefined
        : getEffectiveReasoningEffort(normalizedModelId, configuredEffort);
    return {
        model: chatModel,
        modelId: normalizedModelId,
        modelInfo: info,
        providerOptions: reasoningEffort
            ? {
                xai: {
                    reasoningEffort,
                },
            }
            : undefined,
    };
}
export async function generateTitle(provider, userMessage, modelId = DEFAULT_TITLE_MODEL) {
    try {
        const result = await generateText({
            model: provider.chat(modelId),
            system: "Generate a short, descriptive title (max 6 words) for this conversation. Return only the title.",
            messages: [{ role: "user", content: userMessage.slice(0, 500) }],
            maxOutputTokens: 32,
        });
        return {
            title: result.text?.trim() || "New session",
            modelId,
            usage: result.usage
                ? {
                    inputTokens: result.usage.inputTokens ??
                        result.usage.promptTokens,
                    outputTokens: result.usage.outputTokens ??
                        result.usage.completionTokens,
                    totalTokens: result.usage.totalTokens,
                }
                : undefined,
        };
    }
    catch {
        return { title: "New session", modelId };
    }
}
export async function generateRecap(provider, prompt, signal, modelId = DEFAULT_RECAP_MODEL) {
    try {
        const result = await generateText({
            model: provider.chat(modelId),
            prompt,
            maxOutputTokens: 120,
            abortSignal: signal,
            system: "You generate concise session recaps. Maximum 3 sentences total. Return only the recap text.",
        });
        return {
            recap: result.text?.trim().replace(/^["']|["']$/g, "") || "",
            modelId,
            usage: result.usage
                ? {
                    inputTokens: result.usage.inputTokens ??
                        result.usage.promptTokens,
                    outputTokens: result.usage.outputTokens ??
                        result.usage.completionTokens,
                    totalTokens: result.usage.totalTokens,
                }
                : undefined,
        };
    }
    catch {
        return { recap: "", modelId };
    }
}
//# sourceMappingURL=client.js.map