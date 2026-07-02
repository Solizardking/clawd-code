/**
 * State machine for gating message writes during an initial flush.
 *
 * When a bridge session starts, historical messages are flushed to the
 * server via a single HTTP POST. During that flush, new messages must
 * be queued to prevent them from arriving at the server interleaved
 * with the historical messages.
 *
 * Lifecycle:
 *   start() → enqueue() returns true, items are queued
 *   end()   → returns queued items for draining, enqueue() returns false
 *   drop()  → discards queued items (permanent transport close)
 *   deactivate() → clears active flag without dropping items
 *                   (transport replacement — new transport will drain)
 */
export declare class FlushGate<T> {
    private _active;
    private _pending;
    get active(): boolean;
    get pendingCount(): number;
    /** Mark flush as in-progress. enqueue() will start queuing items. */
    start(): void;
    /**
     * End the flush and return any queued items for draining.
     * Caller is responsible for sending the returned items.
     */
    end(): T[];
    /**
     * If flush is active, queue the items and return true.
     * If flush is not active, return false (caller should send directly).
     */
    enqueue(...items: T[]): boolean;
    /**
     * Discard all queued items (permanent transport close).
     * Returns the number of items dropped.
     */
    drop(): number;
    /**
     * Clear the active flag without dropping queued items.
     * Used when the transport is replaced (onWorkReceived) — the new
     * transport's flush will drain the pending items.
     */
    deactivate(): void;
}
//# sourceMappingURL=flushGate.d.ts.map