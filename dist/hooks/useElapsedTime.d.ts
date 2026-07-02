/**
 * Hook that returns formatted elapsed time since startTime.
 * Uses useSyncExternalStore with interval-based updates for efficiency.
 *
 * @param startTime - Unix timestamp in ms
 * @param isRunning - Whether to actively update the timer
 * @param ms - How often should we trigger updates?
 * @param pausedMs - Total paused duration to subtract
 * @param endTime - If set, freezes the duration at this timestamp (for
 *   terminal tasks). Without this, viewing a 2-min task 30 min after
 *   completion would show "32m".
 * @returns Formatted duration string (e.g., "1m 23s")
 */
export declare function useElapsedTime(startTime: number, isRunning: boolean, ms?: number, pausedMs?: number, endTime?: number): string;
//# sourceMappingURL=useElapsedTime.d.ts.map