import type { StructuredPatchHunk } from 'diff';
import type { Message } from '../types/message.js';
export type TurnFileDiff = {
    filePath: string;
    hunks: StructuredPatchHunk[];
    isNewFile: boolean;
    linesAdded: number;
    linesRemoved: number;
};
export type TurnDiff = {
    turnIndex: number;
    userPromptPreview: string;
    timestamp: string;
    files: Map<string, TurnFileDiff>;
    stats: {
        filesChanged: number;
        linesAdded: number;
        linesRemoved: number;
    };
};
/**
 * Extract turn-based diffs from messages.
 * A turn is defined as a user prompt followed by assistant responses and tool results.
 * Each turn with file edits is included in the result.
 *
 * Uses incremental accumulation - only processes new messages since last render.
 */
export declare function useTurnDiffs(messages: Message[]): TurnDiff[];
//# sourceMappingURL=useTurnDiffs.d.ts.map