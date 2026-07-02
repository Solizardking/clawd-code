/**
 * Increment the reference count and start preventing sleep if needed.
 * Call this when starting work that should keep the Mac awake.
 */
export declare function startPreventSleep(): void;
/**
 * Decrement the reference count and allow sleep if no more work is pending.
 * Call this when work completes.
 */
export declare function stopPreventSleep(): void;
/**
 * Force stop preventing sleep, regardless of reference count.
 * Use this for cleanup on exit.
 */
export declare function forceStopPreventSleep(): void;
//# sourceMappingURL=preventSleep.d.ts.map