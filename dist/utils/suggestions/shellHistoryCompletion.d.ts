/**
 * Result of shell history completion lookup
 */
export type ShellHistoryMatch = {
    /** The full command from history */
    fullCommand: string;
    /** The suffix to display as ghost text (the part after user's input) */
    suffix: string;
};
/**
 * Clear the shell history cache (useful when history is updated)
 */
export declare function clearShellHistoryCache(): void;
/**
 * Add a command to the front of the shell history cache without
 * flushing the entire cache.  If the command already exists in the
 * cache it is moved to the front (deduped).  When the cache hasn't
 * been populated yet this is a no-op – the next lookup will read
 * the full history which already includes the new command.
 */
export declare function prependToShellHistoryCache(command: string): void;
/**
 * Find the best matching shell command from history for the given input
 *
 * @param input The current user input (without '!' prefix)
 * @returns The best match, or null if no match found
 */
export declare function getShellHistoryCompletion(input: string): Promise<ShellHistoryMatch | null>;
//# sourceMappingURL=shellHistoryCompletion.d.ts.map