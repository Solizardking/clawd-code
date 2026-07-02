/**
 * Clawd Code — CODE MODE
 * Write, review, and ship production code
 * Default provider: Z.AI GLM-5.2. Streams via SSE like Anthropic & OpenRouter.
 */
import { type ZaiReasoningEffort, type ZaiThinkingType } from '../zai.js';
interface CodeConfig {
    provider?: string;
    model?: string;
    stream?: boolean;
    xaiApiKey?: string;
    anthropicApiKey?: string;
    deepSeekApiKey?: string;
    deepSeekBaseUrl?: string;
    zaiApiKey?: string;
    zaiBaseUrl?: string;
    zaiThinking?: ZaiThinkingType;
    zaiReasoningEffort?: ZaiReasoningEffort;
}
export declare class CodeMode {
    private config;
    constructor(config: CodeConfig);
    run(args: string[]): Promise<void>;
    private resolveProvider;
    private generateStreaming;
    private generateBlocking;
    private fallbackCode;
}
export {};
//# sourceMappingURL=code.d.ts.map