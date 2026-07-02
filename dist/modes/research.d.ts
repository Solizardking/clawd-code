/**
 * Clawd Code — RESEARCH MODE
 * Deep research. Default: Z.AI GLM-5.2 with thinking mode. Streaming supported
 * for Z.AI, xAI, Anthropic, and OpenRouter.
 */
import { type ZaiReasoningEffort, type ZaiThinkingType } from '../zai.js';
interface ResearchConfig {
    provider?: string;
    model?: string;
    stream?: boolean;
    agentCount?: 4 | 16;
    xaiApiKey?: string;
    anthropicApiKey?: string;
    deepSeekApiKey?: string;
    deepSeekBaseUrl?: string;
    zaiApiKey?: string;
    zaiBaseUrl?: string;
    zaiThinking?: ZaiThinkingType;
    zaiReasoningEffort?: ZaiReasoningEffort;
}
export declare class ResearchMode {
    private config;
    constructor(config: ResearchConfig);
    run(args: string[]): Promise<void>;
    private resolveProvider;
    private printHeader;
    private runStreaming;
    private runBlocking;
}
export {};
//# sourceMappingURL=research.d.ts.map