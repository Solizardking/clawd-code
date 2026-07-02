import type { Message } from '../types/message.js';
/**
 * Generates a short session recap for the "while you were away" card.
 * Returns null on abort, empty transcript, or error.
 */
export declare function generateAwaySummary(messages: readonly Message[], signal: AbortSignal): Promise<string | null>;
//# sourceMappingURL=awaySummary.d.ts.map