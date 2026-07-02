import type { SuggestionItem } from 'src/components/PromptInput/PromptInputFooterSuggestions.js';
export type DirectoryEntry = {
    name: string;
    path: string;
    type: 'directory';
};
export type PathEntry = {
    name: string;
    path: string;
    type: 'directory' | 'file';
};
export type CompletionOptions = {
    basePath?: string;
    maxResults?: number;
};
export type PathCompletionOptions = CompletionOptions & {
    includeFiles?: boolean;
    includeHidden?: boolean;
};
type ParsedPath = {
    directory: string;
    prefix: string;
};
/**
 * Parses a partial path into directory and prefix components
 */
export declare function parsePartialPath(partialPath: string, basePath?: string): ParsedPath;
/**
 * Scans a directory and returns subdirectories
 * Uses LRU cache to avoid repeated filesystem calls
 */
export declare function scanDirectory(dirPath: string): Promise<DirectoryEntry[]>;
/**
 * Main function to get directory completion suggestions
 */
export declare function getDirectoryCompletions(partialPath: string, options?: CompletionOptions): Promise<SuggestionItem[]>;
/**
 * Clears the directory cache
 */
export declare function clearDirectoryCache(): void;
/**
 * Checks if a string looks like a path (starts with path-like prefixes)
 */
export declare function isPathLikeToken(token: string): boolean;
/**
 * Scans a directory and returns both files and subdirectories
 * Uses LRU cache to avoid repeated filesystem calls
 */
export declare function scanDirectoryForPaths(dirPath: string, includeHidden?: boolean): Promise<PathEntry[]>;
/**
 * Get path completion suggestions for files and directories
 */
export declare function getPathCompletions(partialPath: string, options?: PathCompletionOptions): Promise<SuggestionItem[]>;
/**
 * Clears both directory and path caches
 */
export declare function clearPathCache(): void;
export {};
//# sourceMappingURL=directoryCompletion.d.ts.map