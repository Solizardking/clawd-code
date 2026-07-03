import { type XaiProvider } from "@ai-sdk/xai";
import { type ModelDefinition } from "./models";
export type { XaiProvider };
type ProviderReasoningEffort = "low" | "medium" | "high" | "xhigh";
export interface ResolvedModelRuntime {
    model: ReturnType<XaiProvider["chat"]> | ReturnType<XaiProvider["responses"]>;
    modelId: string;
    modelInfo: ModelDefinition | undefined;
    providerOptions?: {
        xai?: {
            reasoningEffort?: ProviderReasoningEffort;
        };
    };
}
export declare function createProvider(apiKey: string, baseURL?: string): XaiProvider;
export declare function resolveModelRuntime(provider: XaiProvider, modelId: string): ResolvedModelRuntime;
export interface TitleResult {
    title: string;
    modelId: string;
    usage?: {
        inputTokens?: number;
        outputTokens?: number;
        totalTokens?: number;
    };
}
export declare function generateTitle(provider: XaiProvider, userMessage: string, modelId?: string): Promise<TitleResult>;
export interface RecapResult {
    recap?: string;
    modelId: string;
    usage?: {
        inputTokens?: number;
        outputTokens?: number;
        totalTokens?: number;
    };
}
export declare function generateRecap(provider: XaiProvider, prompt: string, signal?: AbortSignal, modelId?: string): Promise<RecapResult>;
