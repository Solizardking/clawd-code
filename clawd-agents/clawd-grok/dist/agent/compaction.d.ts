import { type ModelMessage } from "ai";
import { type XaiProvider } from "../grok/client";
export interface CompactionSettings {
    reserveTokens: number;
    keepRecentTokens: number;
}
export interface CutPointResult {
    firstKeptIndex: number;
    turnStartIndex: number;
    isSplitTurn: boolean;
}
export interface PreparedCompaction {
    previousSummary?: string;
    messagesToSummarize: ModelMessage[];
    turnPrefixMessages: ModelMessage[];
    keptMessages: ModelMessage[];
    firstKeptIndex: number;
    isSplitTurn: boolean;
    tokensBefore: number;
    settings: CompactionSettings;
}
export declare const DEFAULT_RESERVE_TOKENS = 16384;
export declare const DEFAULT_KEEP_RECENT_TOKENS = 20000;
export declare const COMPACTION_SUMMARY_HEADER = "[Context checkpoint summary]";
export declare function createCompactionSummaryMessage(summary: string): ModelMessage;
export declare function isCompactionSummaryMessage(message: ModelMessage | undefined): boolean;
export declare function getCompactionSummaryText(message: ModelMessage | undefined): string | null;
export declare function estimateMessageTokens(message: ModelMessage): number;
export declare function estimateConversationTokens(systemPrompt: string, messages: ModelMessage[], inFlightText?: string): number;
export declare function shouldCompactContext(contextTokens: number, contextWindow: number, settings: CompactionSettings): boolean;
export declare function findCutPoint(messages: ModelMessage[], startIndex: number, keepRecentTokens: number): CutPointResult;
export declare function prepareCompaction(messages: ModelMessage[], systemPrompt: string, settings: CompactionSettings): PreparedCompaction | null;
export declare function relaxCompactionSettings(settings: CompactionSettings): CompactionSettings;
export declare function serializeConversation(messages: ModelMessage[]): string;
export declare function generateCompactionSummary(provider: XaiProvider, modelId: string, preparation: PreparedCompaction, customInstructions?: string, signal?: AbortSignal): Promise<string>;
