import type { ModelUsage } from 'src/entrypoints/agentSdkTypes.js';
export type DailyActivity = {
    date: string;
    messageCount: number;
    sessionCount: number;
    toolCallCount: number;
};
export type DailyModelTokens = {
    date: string;
    tokensByModel: {
        [modelName: string]: number;
    };
};
export type StreakInfo = {
    currentStreak: number;
    longestStreak: number;
    currentStreakStart: string | null;
    longestStreakStart: string | null;
    longestStreakEnd: string | null;
};
export type SessionStats = {
    sessionId: string;
    duration: number;
    messageCount: number;
    timestamp: string;
};
export type ClaudeCodeStats = {
    totalSessions: number;
    totalMessages: number;
    totalDays: number;
    activeDays: number;
    streaks: StreakInfo;
    dailyActivity: DailyActivity[];
    dailyModelTokens: DailyModelTokens[];
    longestSession: SessionStats | null;
    modelUsage: {
        [modelName: string]: ModelUsage;
    };
    firstSessionDate: string | null;
    lastSessionDate: string | null;
    peakActivityDay: string | null;
    peakActivityHour: number | null;
    totalSpeculationTimeSavedMs: number;
    shotDistribution?: {
        [shotCount: number]: number;
    };
    oneShotRate?: number;
};
/**
 * Aggregates stats from all Claude Code sessions across all projects.
 * Uses a disk cache to avoid reprocessing historical data.
 */
export declare function aggregateClaudeCodeStats(): Promise<ClaudeCodeStats>;
export type StatsDateRange = '7d' | '30d' | 'all';
/**
 * Aggregates stats for a specific date range.
 * For 'all', uses the cached aggregation. For other ranges, processes files directly.
 */
export declare function aggregateClaudeCodeStatsForRange(range: StatsDateRange): Promise<ClaudeCodeStats>;
/**
 * Peeks at the head of a session file to get the session start date.
 * Uses a small 4 KB read to avoid loading the full file.
 *
 * Session files typically begin with non-transcript entries (`mode`,
 * `file-history-snapshot`, `attribution-snapshot`) before the first transcript
 * message, so we scan lines until we hit one. Each complete line is JSON-parsed
 * — naive string search is unsafe here because `file-history-snapshot` entries
 * embed a nested `snapshot.timestamp` carrying the *previous* session's date
 * (written by copyFileHistoryForResume), which would cause resumed sessions to
 * be miscategorised as old and silently dropped from stats.
 *
 * Returns a YYYY-MM-DD string, or null if no transcript message fits in the
 * head (caller falls through to the full read — safe default).
 */
export declare function readSessionStartDate(filePath: string): Promise<string | null>;
//# sourceMappingURL=stats.d.ts.map