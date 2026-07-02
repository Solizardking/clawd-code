/**
 * Generate a hash for paste content to use as filename.
 * Exported so callers can get the hash synchronously before async storage.
 */
export declare function hashPastedText(content: string): string;
/**
 * Store pasted text content to disk.
 * The hash should be pre-computed with hashPastedText() so the caller
 * can use it immediately without waiting for the async disk write.
 */
export declare function storePastedText(hash: string, content: string): Promise<void>;
/**
 * Retrieve pasted text content by its hash.
 * Returns null if not found or on error.
 */
export declare function retrievePastedText(hash: string): Promise<string | null>;
/**
 * Clean up old paste files that are no longer referenced.
 * This is a simple time-based cleanup - removes files older than cutoffDate.
 */
export declare function cleanupOldPastes(cutoffDate: Date): Promise<void>;
//# sourceMappingURL=pasteStore.d.ts.map