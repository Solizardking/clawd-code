import type { StructuredPatchHunk } from 'diff';
export type GitDiffStats = {
    filesCount: number;
    linesAdded: number;
    linesRemoved: number;
};
export type PerFileStats = {
    added: number;
    removed: number;
    isBinary: boolean;
    isUntracked?: boolean;
};
export type GitDiffResult = {
    stats: GitDiffStats;
    perFileStats: Map<string, PerFileStats>;
    hunks: Map<string, StructuredPatchHunk[]>;
};
/**
 * Fetch git diff stats and hunks comparing working tree to HEAD.
 * Returns null if not in a git repo or if git commands fail.
 *
 * Returns null during merge/rebase/cherry-pick/revert operations since the
 * working tree contains incoming changes that weren't intentionally
 * made by the user.
 */
export declare function fetchGitDiff(): Promise<GitDiffResult | null>;
/**
 * Fetch git diff hunks on-demand (for DiffDialog).
 * Separated from fetchGitDiff() to avoid expensive calls during polling.
 */
export declare function fetchGitDiffHunks(): Promise<Map<string, StructuredPatchHunk[]>>;
export type NumstatResult = {
    stats: GitDiffStats;
    perFileStats: Map<string, PerFileStats>;
};
/**
 * Parse git diff --numstat output into stats.
 * Format: <added>\t<removed>\t<filename>
 * Binary files show '-' for counts.
 * Only stores first MAX_FILES entries in perFileStats.
 */
export declare function parseGitNumstat(stdout: string): NumstatResult;
/**
 * Parse unified diff output into per-file hunks.
 * Splits by "diff --git" and parses each file's hunks.
 *
 * Applies limits:
 * - MAX_FILES: stop after this many files
 * - Files >1MB: skipped entirely (not in result map)
 * - Files ≤1MB: parsed but limited to MAX_LINES_PER_FILE lines
 */
export declare function parseGitDiff(stdout: string): Map<string, StructuredPatchHunk[]>;
/**
 * Parse git diff --shortstat output into stats.
 * Format: " 1648 files changed, 52341 insertions(+), 8123 deletions(-)"
 *
 * This is O(1) memory regardless of diff size - git computes totals without
 * loading all content. Used as a quick probe before expensive operations.
 */
export declare function parseShortstat(stdout: string): GitDiffStats | null;
export type ToolUseDiff = {
    filename: string;
    status: 'modified' | 'added';
    additions: number;
    deletions: number;
    changes: number;
    patch: string;
    /** GitHub "owner/repo" when available (null for non-github.com or unknown repos) */
    repository: string | null;
};
/**
 * Fetch a structured diff for a single file against the merge base with the
 * default branch. This produces a PR-like diff showing all changes since
 * the branch diverged. Falls back to diffing against HEAD if the merge base
 * cannot be determined (e.g., on the default branch itself).
 * For untracked files, generates a synthetic diff showing all additions.
 * Returns null if not in a git repo or if git commands fail.
 */
export declare function fetchSingleFileGitDiff(absoluteFilePath: string): Promise<ToolUseDiff | null>;
//# sourceMappingURL=gitDiff.d.ts.map