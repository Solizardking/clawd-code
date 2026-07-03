import type { UsageEvent, UsageSource } from "../types/index";
export interface TokenUsageLike {
    inputTokens?: number;
    outputTokens?: number;
    totalTokens?: number;
}
export declare function recordUsageEvent(sessionId: string, source: UsageSource, model: string, usage?: TokenUsageLike, messageSeq?: number | null): void;
export declare function getSessionTotalTokens(sessionId: string): number;
export declare function listSessionUsage(sessionId: string): UsageEvent[];
