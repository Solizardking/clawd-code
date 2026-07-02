/**
 * Pure-TypeScript port of vendor/file-index-src (Rust NAPI module).
 *
 * The native module wraps nucleo (https://github.com/helix-editor/nucleo) for
 * high-performance fuzzy file searching. This port reimplements the same API
 * and scoring behavior without native dependencies.
 *
 * Key API:
 *   new FileIndex()
 *   .loadFromFileList(fileList: string[]): void   — dedupe + index paths
 *   .search(query: string, limit: number): SearchResult[]
 *
 * Score semantics: lower = better. Score is position-in-results / result-count,
 * so the best match is 0.0. Paths containing "test" get a 1.05× penalty (capped
 * at 1.0) so non-test files rank slightly higher.
 */
export type SearchResult = {
    path: string;
    score: number;
};
declare const CHUNK_MS = 4;
export declare class FileIndex {
    private paths;
    private lowerPaths;
    private charBits;
    private pathLens;
    private topLevelCache;
    private readyCount;
    /**
     * Load paths from an array of strings.
     * This is the main way to populate the index — ripgrep collects files, we just search them.
     * Automatically deduplicates paths.
     */
    loadFromFileList(fileList: string[]): void;
    /**
     * Async variant: yields to the event loop every ~8–12k paths so large
     * indexes (270k+ files) don't block the main thread for >10ms at a time.
     * Identical result to loadFromFileList.
     *
     * Returns { queryable, done }:
     *   - queryable: resolves as soon as the first chunk is indexed (search
     *     returns partial results). For a 270k-path list this is ~5–10ms of
     *     sync work after the paths array is available.
     *   - done: resolves when the entire index is built.
     */
    loadFromFileListAsync(fileList: string[]): {
        queryable: Promise<void>;
        done: Promise<void>;
    };
    private buildAsync;
    private buildIndex;
    private resetArrays;
    private indexPath;
    /**
     * Search for files matching the query using fuzzy matching.
     * Returns top N results sorted by match score.
     */
    search(query: string, limit: number): SearchResult[];
}
export declare function yieldToEventLoop(): Promise<void>;
export { CHUNK_MS };
export default FileIndex;
export type { FileIndex as FileIndexType };
//# sourceMappingURL=index.d.ts.map