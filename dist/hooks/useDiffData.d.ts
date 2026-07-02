import type { StructuredPatchHunk } from 'diff';
import { type GitDiffStats } from '../utils/gitDiff.js';
export type DiffFile = {
    path: string;
    linesAdded: number;
    linesRemoved: number;
    isBinary: boolean;
    isLargeFile: boolean;
    isTruncated: boolean;
    isNewFile?: boolean;
    isUntracked?: boolean;
};
export type DiffData = {
    stats: GitDiffStats | null;
    files: DiffFile[];
    hunks: Map<string, StructuredPatchHunk[]>;
    loading: boolean;
};
/**
 * Hook to fetch current git diff data on demand.
 * Fetches both stats and hunks when component mounts.
 */
export declare function useDiffData(): DiffData;
//# sourceMappingURL=useDiffData.d.ts.map