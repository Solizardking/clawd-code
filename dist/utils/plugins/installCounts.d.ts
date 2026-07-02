/**
 * Plugin install counts data layer
 *
 * This module fetches and caches plugin install counts from the official
 * Claude plugins statistics repository. The cache is refreshed if older
 * than 24 hours.
 *
 * Cache location: ~/.claude/plugins/install-counts-cache.json
 */
/**
 * Get plugin install counts as a Map.
 * Uses cached data if available and less than 24 hours old.
 * Returns null on errors so UI can hide counts rather than show misleading zeros.
 *
 * @returns Map of plugin ID (name@marketplace) to install count, or null if unavailable
 */
export declare function getInstallCounts(): Promise<Map<string, number> | null>;
/**
 * Format an install count for display.
 *
 * @param count - The raw install count
 * @returns Formatted string:
 *   - <1000: raw number (e.g., "42")
 *   - >=1000: K suffix with 1 decimal (e.g., "1.2K", "36.2K")
 *   - >=1000000: M suffix with 1 decimal (e.g., "1.2M")
 */
export declare function formatInstallCount(count: number): string;
//# sourceMappingURL=installCounts.d.ts.map