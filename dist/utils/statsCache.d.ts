import type { ModelUsage } from '../entrypoints/agentSdkTypes.js';
import type { DailyActivity, DailyModelTokens, SessionStats } from './stats.js';
export declare const STATS_CACHE_VERSION = 3;
/**
 * Execute a function while holding the stats cache lock.
 * Only one operation can hold the lock at a time.
 */
export declare function withStatsCacheLock<T>(fn: () => Promise<T>): Promise<T>;
/**
 * Persisted stats cache stored on disk.
 * Contains aggregated historical stats that won't change.
 * All fields are bounded to prevent unbounded file growth.
 */
export type PersistedStatsCache = {
    version: number;
    lastComputedDate: string | null;
    dailyActivity: DailyActivity[];
    dailyModelTokens: DailyModelTokens[];
    modelUsage: {
        [modelName: string]: ModelUsage;
    };
    totalSessions: number;
    totalMessages: number;
    longestSession: SessionStats | null;
    firstSessionDate: string | null;
    hourCounts: {
        [hour: number]: number;
    };
    totalSpeculationTimeSavedMs: number;
    shotDistribution?: {
        [shotCount: number]: number;
    };
};
export declare function getStatsCachePath(): string;
/**
 * Load the stats cache from disk.
 * Returns an empty cache if the file doesn't exist or is invalid.
 */
export declare function loadStatsCache(): Promise<PersistedStatsCache>;
/**
 * Save the stats cache to disk atomically.
 * Uses a temp file + rename pattern to prevent corruption.
 */
export declare function saveStatsCache(cache: PersistedStatsCache): Promise<void>;
/**
 * Merge new stats into an existing cache.
 * Used when incrementally adding new days to the cache.
 */
export declare function mergeCacheWithNewStats(existingCache: PersistedStatsCache, newStats: {
    dailyActivity: DailyActivity[];
    dailyModelTokens: DailyModelTokens[];
    modelUsage: {
        [modelName: string]: ModelUsage;
    };
    sessionStats: SessionStats[];
    hourCounts: {
        [hour: number]: number;
    };
    totalSpeculationTimeSavedMs: number;
    shotDistribution?: {
        [shotCount: number]: number;
    };
}, newLastComputedDate: string): PersistedStatsCache;
/**
 * Extract the date portion (YYYY-MM-DD) from a Date object.
 */
export declare function toDateString(date: Date): string;
/**
 * Get today's date in YYYY-MM-DD format.
 */
export declare function getTodayDateString(): string;
/**
 * Get yesterday's date in YYYY-MM-DD format.
 */
export declare function getYesterdayDateString(): string;
/**
 * Check if a date string is before another date string.
 * Both should be in YYYY-MM-DD format.
 */
export declare function isDateBefore(date1: string, date2: string): boolean;
//# sourceMappingURL=statsCache.d.ts.map