import { type StructuredPatchHunk } from 'diff';
import type { FileEdit } from '../tools/FileEditTool/types.js';
export declare const CONTEXT_LINES = 3;
export declare const DIFF_TIMEOUT_MS = 5000;
/**
 * Shifts hunk line numbers by offset. Use when getPatchForDisplay received
 * a slice of the file (e.g. readEditContext) rather than the whole file —
 * callers pass `ctx.lineOffset - 1` to convert slice-relative to file-relative.
 */
export declare function adjustHunkLineNumbers(hunks: StructuredPatchHunk[], offset: number): StructuredPatchHunk[];
/**
 * Count lines added and removed in a patch and update the total
 * For new files, pass the content string as the second parameter
 * @param patch Array of diff hunks
 * @param newFileContent Optional content string for new files
 */
export declare function countLinesChanged(patch: StructuredPatchHunk[], newFileContent?: string): void;
export declare function getPatchFromContents({ filePath, oldContent, newContent, ignoreWhitespace, singleHunk, }: {
    filePath: string;
    oldContent: string;
    newContent: string;
    ignoreWhitespace?: boolean;
    singleHunk?: boolean;
}): StructuredPatchHunk[];
/**
 * Get a patch for display with edits applied
 * @param filePath The path to the file
 * @param fileContents The contents of the file
 * @param edits An array of edits to apply to the file
 * @param ignoreWhitespace Whether to ignore whitespace changes
 * @returns An array of hunks representing the diff
 *
 * NOTE: This function will return the diff with all leading tabs
 * rendered as spaces for display
 */
export declare function getPatchForDisplay({ filePath, fileContents, edits, ignoreWhitespace, }: {
    filePath: string;
    fileContents: string;
    edits: FileEdit[];
    ignoreWhitespace?: boolean;
}): StructuredPatchHunk[];
//# sourceMappingURL=diff.d.ts.map