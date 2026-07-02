/**
 * Side Question ("/btw") feature - allows asking quick questions without
 * interrupting the main agent context.
 *
 * Uses runForkedAgent to leverage prompt caching from the parent context
 * while keeping the side question response separate from main conversation.
 */
import type { NonNullableUsage } from '../services/api/logging.js';
import { type CacheSafeParams } from './forkedAgent.js';
/**
 * Find positions of "/btw" keyword at the start of text for highlighting.
 * Similar to findThinkingTriggerPositions in thinking.ts.
 */
export declare function findBtwTriggerPositions(text: string): Array<{
    word: string;
    start: number;
    end: number;
}>;
export type SideQuestionResult = {
    response: string | null;
    usage: NonNullableUsage;
};
/**
 * Run a side question using a forked agent.
 * Shares the parent's prompt cache — no thinking override, no cache write.
 * All tools are blocked and we cap at 1 turn.
 */
export declare function runSideQuestion({ question, cacheSafeParams, }: {
    question: string;
    cacheSafeParams: CacheSafeParams;
}): Promise<SideQuestionResult>;
//# sourceMappingURL=sideQuestion.d.ts.map