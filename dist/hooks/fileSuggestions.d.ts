import type { SuggestionItem } from '../components/PromptInput/PromptInputFooterSuggestions.js';
import { FileIndex } from '../native-ts/file-index/index.js';
export declare const onIndexBuildComplete: (listener: () => void) => () => void;
/**
 * Clear all file suggestion caches.
 * Call this when resuming a session to ensure fresh file discovery.
 */
export declare function clearFileSuggestionCaches(): void;
/**
 * Content hash of a path list. A length|first|last sample misses renames of
 * middle files (same length, same endpoints → stale entry stuck in nucleo).
 *
 * Samples every Nth path (plus length). On a 346k-path list this hashes ~700
 * paths instead of 14MB — enough to catch git operations (checkout, rebase,
 * add/rm) while running in <1ms. A single mid-list rename that happens to
 * fall between samples will miss the rebuild, but the 5s refresh floor picks
 * it up on the next cycle.
 */
export declare function pathListSignature(paths: string[]): string;
/**
 * This function collects all parent directories for each file path
 * and returns a list of unique directory names with a trailing separator.
 * For example, if the input is ['src/index.js', 'src/utils/helpers.js'],
 * the output will be ['src/', 'src/utils/'].
 * @param files An array of file paths
 * @returns An array of unique directory names with a trailing separator
 */
export declare function getDirectoryNames(files: string[]): string[];
/**
 * Async variant: yields every ~10k files so 270k+ file lists don't block
 * the main thread for >10ms at a time.
 */
export declare function getDirectoryNamesAsync(files: string[]): Promise<string[]>;
/**
 * Gets both files and their directory paths for providing path suggestions
 * Uses git ls-files for git repos (fast) or ripgrep as fallback
 * Returns a FileIndex populated for fast fuzzy search
 */
export declare function getPathsForSuggestions(): Promise<FileIndex>;
/**
 * Finds the longest common prefix among an array of suggestion items
 */
export declare function findLongestCommonPrefix(suggestions: SuggestionItem[]): string;
export declare function startBackgroundCacheRefresh(): void;
/**
 * Generate file suggestions for the current input and cursor position
 * @param partialPath The partial file path to match
 * @param showOnEmpty Whether to show suggestions even if partialPath is empty (used for @ symbol)
 */
export declare function generateFileSuggestions(partialPath: string, showOnEmpty?: boolean): Promise<SuggestionItem[]>;
/**
 * Apply a file suggestion to the input
 */
export declare function applyFileSuggestion(suggestion: string | SuggestionItem, input: string, partialPath: string, startPos: number, onInputChange: (value: string) => void, setCursorOffset: (offset: number) => void): void;
//# sourceMappingURL=fileSuggestions.d.ts.map