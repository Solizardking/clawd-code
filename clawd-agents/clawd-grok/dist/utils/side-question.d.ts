import { type XaiProvider } from "../grok/client.js";
export interface SideQuestionResult {
    response: string;
    usage?: {
        totalTokens?: number;
        inputTokens?: number;
        outputTokens?: number;
    };
}
export declare function runSideQuestion(question: string, provider: XaiProvider, modelId: string, conversationContext: string, signal?: AbortSignal): Promise<SideQuestionResult>;
