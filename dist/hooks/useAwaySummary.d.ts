import type { Message } from '../types/message.js';
type SetMessages = (updater: (prev: Message[]) => Message[]) => void;
/**
 * Appends a "while you were away" summary message after the terminal has been
 * blurred for 5 minutes. Fires only when (a) 5min since blur, (b) no turn in
 * progress, and (c) no existing away_summary since the last user message.
 *
 * Focus state 'unknown' (terminal doesn't support DECSET 1004) is a no-op.
 */
export declare function useAwaySummary(messages: readonly Message[], setMessages: SetMessages, isLoading: boolean): void;
export {};
//# sourceMappingURL=useAwaySummary.d.ts.map