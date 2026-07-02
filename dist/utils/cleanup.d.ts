export type CleanupResult = {
    messages: number;
    errors: number;
};
export declare function addCleanupResults(a: CleanupResult, b: CleanupResult): CleanupResult;
export declare function convertFileNameToDate(filename: string): Date;
export declare function cleanupOldMessageFiles(): Promise<CleanupResult>;
export declare function cleanupOldSessionFiles(): Promise<CleanupResult>;
export declare function cleanupOldPlanFiles(): Promise<CleanupResult>;
export declare function cleanupOldFileHistoryBackups(): Promise<CleanupResult>;
export declare function cleanupOldSessionEnvDirs(): Promise<CleanupResult>;
/**
 * Cleans up old debug log files from ~/.claude/debug/
 * Preserves the 'latest' symlink which points to the current session's log.
 * Debug logs can grow very large (especially with the infinite logging loop bug)
 * and accumulate indefinitely without this cleanup.
 */
export declare function cleanupOldDebugLogs(): Promise<CleanupResult>;
/**
 * Clean up old npm cache entries for Anthropic packages.
 * This helps reduce disk usage since we publish many dev versions per day.
 * Only runs once per day for Ant users.
 */
export declare function cleanupNpmCacheForAnthropicPackages(): Promise<void>;
/**
 * Throttled wrapper around cleanupOldVersions for recurring cleanup in long-running sessions.
 * Uses a marker file and lock to ensure it runs at most once per 24 hours,
 * and does not block if another process is already running cleanup.
 * The regular cleanupOldVersions() should still be used for installer flows.
 */
export declare function cleanupOldVersionsThrottled(): Promise<void>;
export declare function cleanupOldMessageFilesInBackground(): Promise<void>;
//# sourceMappingURL=cleanup.d.ts.map