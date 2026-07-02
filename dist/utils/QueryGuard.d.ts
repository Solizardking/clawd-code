export declare class QueryGuard {
    private _status;
    private _generation;
    private _changed;
    /**
     * Reserve the guard for queue processing. Transitions idle → dispatching.
     * Returns false if not idle (another query or dispatch in progress).
     */
    reserve(): boolean;
    /**
     * Cancel a reservation when processQueueIfReady had nothing to process.
     * Transitions dispatching → idle.
     */
    cancelReservation(): void;
    /**
     * Start a query. Returns the generation number on success,
     * or null if a query is already running (concurrent guard).
     * Accepts transitions from both idle (direct user submit)
     * and dispatching (queue processor path).
     */
    tryStart(): number | null;
    /**
     * End a query. Returns true if this generation is still current
     * (meaning the caller should perform cleanup). Returns false if a
     * newer query has started (stale finally block from a cancelled query).
     */
    end(generation: number): boolean;
    /**
     * Force-end the current query regardless of generation.
     * Used by onCancel where any running query should be terminated.
     * Increments generation so stale finally blocks from the cancelled
     * query's promise rejection will see a mismatch and skip cleanup.
     */
    forceEnd(): void;
    /**
     * Is the guard active (dispatching or running)?
     * Always synchronous — not subject to React state batching delays.
     */
    get isActive(): boolean;
    get generation(): number;
    /** Subscribe to state changes. Stable reference — safe as useEffect dep. */
    subscribe: (listener: () => void) => () => void;
    /** Snapshot for useSyncExternalStore. Returns `isActive`. */
    getSnapshot: () => boolean;
    private _notify;
}
//# sourceMappingURL=QueryGuard.d.ts.map