import { type XaiProvider as NativeXaiProvider } from "@ai-sdk/xai";
import { type ModelDefinition, type ProviderId } from "./models";
type XaiChatModel = ReturnType<NativeXaiProvider["chat"]>;
type XaiResponsesModel = ReturnType<NativeXaiProvider["responses"]>;
type XaiImageModel = ReturnType<NativeXaiProvider["image"]>;
type XaiVideoModel = ReturnType<NativeXaiProvider["video"]>;
export interface ClawdProvider {
    id: ProviderId;
    name: string;
    baseURL?: string;
    chat: (modelId: string) => XaiChatModel;
    responses?: NativeXaiProvider["responses"];
    image?: (modelId: string) => XaiImageModel;
    video?: (modelId: string) => XaiVideoModel;
    tools?: NativeXaiProvider["tools"];
}
export type { ClawdProvider as XaiProvider };
type ProviderReasoningEffort = "low" | "medium" | "high" | "xhigh";
export interface ResolvedModelRuntime {
    model: XaiChatModel | XaiResponsesModel;
    modelId: string;
    modelInfo: ModelDefinition | undefined;
    provider: ProviderId;
    providerOptions?: {
        xai?: {
            reasoningEffort?: ProviderReasoningEffort;
        };
    };
}
export declare function createProvider(apiKey: string, baseURL?: string, providerId?: ProviderId): ClawdProvider;
export declare function resolveModelRuntime(provider: ClawdProvider, modelId: string): ResolvedModelRuntime;
export declare function resolveResponsesRuntime(provider: ClawdProvider, modelId: string): ResolvedModelRuntime;
export interface TitleResult {
    title: string;
    modelId: string;
    usage?: {
        inputTokens?: number;
        outputTokens?: number;
        totalTokens?: number;
    };
}
export declare function generateTitle(provider: ClawdProvider, userMessage: string, modelId?: string): Promise<TitleResult>;
export interface RecapResult {
    recap?: string;
    modelId: string;
    usage?: {
        inputTokens?: number;
        outputTokens?: number;
        totalTokens?: number;
    };
}
export declare function generateRecap(provider: ClawdProvider, prompt: string, signal?: AbortSignal, modelId?: string): Promise<RecapResult>;
