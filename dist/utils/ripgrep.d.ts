export declare function ripgrepCommand(): {
    rgPath: string;
    rgArgs: string[];
    argv0?: string;
};
/**
 * Custom error class for ripgrep timeouts.
 * This allows callers to distinguish between "no matches" and "timed out".
 */
export declare class RipgrepTimeoutError extends Error {
    readonly partialResults: string[];
    constructor(message: string, partialResults: string[]);
}
/**
 * Stream lines from ripgrep as they arrive, calling `onLines` per stdout chunk.
 *
 * Unlike `ripGrep()` which buffers the entire stdout, this flushes complete
 * lines as soon as each chunk arrives — first results paint while rg is still
 * walking the tree (the fzf `change:reload` pattern). Partial trailing lines
 * are carried across chunk boundaries.
 *
 * Callers that want to stop early (e.g. after N matches) should abort the
 * signal — spawn's signal option kills rg. No EAGAIN retry, no internal
 * timeout, stderr is ignored; interactive callers own recovery.
 */
export declare function ripGrepStream(args: string[], target: string, abortSignal: AbortSignal, onLines: (lines: string[]) => void): Promise<void>;
export declare function ripGrep(args: string[], target: string, abortSignal: AbortSignal): Promise<string[]>;
/**
 * Count files in a directory recursively using ripgrep and round to the nearest power of 10 for privacy
 *
 * This is much more efficient than using native Node.js methods for counting files
 * in large directories since it uses ripgrep's highly optimized file traversal.
 *
 * @param path Directory path to count files in
 * @param abortSignal AbortSignal to cancel the operation
 * @param ignorePatterns Optional additional patterns to ignore (beyond .gitignore)
 * @returns Approximate file count rounded to the nearest power of 10
 */
export declare const countFilesRoundedRg: any;
/**
 * Get ripgrep status and configuration info
 * Returns current configuration immediately, with working status if available
 */
export declare function getRipgrepStatus(): {
    mode: 'system' | 'builtin' | 'embedded';
    path: string;
    working: boolean | null;
};
//# sourceMappingURL=ripgrep.d.ts.map