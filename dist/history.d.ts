import type { HistoryEntry, PastedContent } from './utils/config.js';
/**
 * Claude Code parses history for pasted content references to match back to
 * pasted content. The references look like:
 *   Text: [Pasted text #1 +10 lines]
 *   Image: [Image #2]
 * The numbers are expected to be unique within a single prompt but not across
 * prompts. We choose numeric, auto-incrementing IDs as they are more
 * user-friendly than other ID options.
 */
export declare function getPastedTextRefNumLines(text: string): number;
export declare function formatPastedTextRef(id: number, numLines: number): string;
export declare function formatImageRef(id: number): string;
export declare function parseReferences(input: string): Array<{
    id: number;
    match: string;
    index: number;
}>;
/**
 * Replace [Pasted text #N] placeholders in input with their actual content.
 * Image refs are left alone — they become content blocks, not inlined text.
 */
export declare function expandPastedTextRefs(input: string, pastedContents: Record<number, PastedContent>): string;
export declare function makeHistoryReader(): AsyncGenerator<HistoryEntry>;
export type TimestampedHistoryEntry = {
    display: string;
    timestamp: number;
    resolve: () => Promise<HistoryEntry>;
};
/**
 * Current-project history for the ctrl+r picker: deduped by display text,
 * newest first, with timestamps. Paste contents are resolved lazily via
 * `resolve()` — the picker only reads display+timestamp for the list.
 */
export declare function getTimestampedHistory(): AsyncGenerator<TimestampedHistoryEntry>;
/**
 * Get history entries for the current project, with current session's entries first.
 *
 * Entries from the current session are yielded before entries from other sessions,
 * so concurrent sessions don't interleave their up-arrow history. Within each group,
 * order is newest-first. Scans the same MAX_HISTORY_ITEMS window as before —
 * entries are reordered within that window, not beyond it.
 */
export declare function getHistory(): AsyncGenerator<HistoryEntry>;
export declare function addToHistory(command: HistoryEntry | string): void;
export declare function clearPendingHistoryEntries(): void;
/**
 * Undo the most recent addToHistory call. Used by auto-restore-on-interrupt:
 * when Esc rewinds the conversation before any response arrives, the submit is
 * semantically undone — the history entry should be too, otherwise Up-arrow
 * shows the restored text twice (once from the input box, once from disk).
 *
 * Fast path pops from the pending buffer. If the async flush already won the
 * race (TTFT is typically >> disk write latency), the entry's timestamp is
 * added to a skip-set consulted by getHistory. One-shot: clears the tracked
 * entry so a second call is a no-op.
 */
export declare function removeLastFromHistory(): void;
//# sourceMappingURL=history.d.ts.map