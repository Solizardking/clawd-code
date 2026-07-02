import { type FileHandle } from 'fs/promises';
export declare const CHUNK_SIZE: number;
export declare const MAX_SCAN_BYTES: number;
export type EditContext = {
    /** Slice of the file: contextLines before/after the match, on line boundaries. */
    content: string;
    /** 1-based line number of content's first line in the original file. */
    lineOffset: number;
    /** True if MAX_SCAN_BYTES was hit without finding the needle. */
    truncated: boolean;
};
/**
 * Finds `needle` in the file at `path` and returns a context-window slice
 * containing the match plus `contextLines` of surrounding context on each side.
 *
 * Scans in 8KB chunks with a straddle overlap so matches crossing a chunk
 * boundary are found. Capped at MAX_SCAN_BYTES. No stat — EOF detected via
 * bytesRead.
 *
 * React callers: wrap in useState lazy-init then use() + Suspense. useMemo
 * re-runs when callers pass fresh array literals.
 *
 * Returns null on ENOENT. Returns { truncated: true, content: '' } if the
 * needle isn't found within MAX_SCAN_BYTES.
 */
export declare function readEditContext(path: string, needle: string, contextLines?: number): Promise<EditContext | null>;
/**
 * Opens `path` for reading. Returns null on ENOENT. Caller owns close().
 */
export declare function openForScan(path: string): Promise<FileHandle | null>;
/**
 * Handle-accepting core of readEditContext. Caller owns open/close.
 */
export declare function scanForContext(handle: FileHandle, needle: string, contextLines: number): Promise<EditContext>;
/**
 * Reads the entire file via `handle` up to MAX_SCAN_BYTES. Returns null if the
 * file exceeds the cap. For the multi-edit path in FileEditToolDiff where
 * sequential replacements need the full string.
 *
 * Single buffer, doubles on fill — ~log2(size/8KB) allocs instead of O(n)
 * chunks + concat. Reads directly into the right offset; no intermediate copies.
 */
export declare function readCapped(handle: FileHandle): Promise<string | null>;
//# sourceMappingURL=readEditContext.d.ts.map