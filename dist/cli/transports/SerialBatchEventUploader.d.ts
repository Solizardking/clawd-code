/**
 * Serial ordered event uploader with batching, retry, and backpressure.
 *
 * - enqueue() adds events to a pending buffer
 * - At most 1 POST in-flight at a time
 * - Drains up to maxBatchSize items per POST
 * - New events accumulate while in-flight
 * - On failure: exponential backoff (clamped), retries indefinitely
 *   until success or close() — unless maxConsecutiveFailures is set,
 *   in which case the failing batch is dropped and drain advances
 * - flush() blocks until pending is empty and kicks drain if needed
 * - Backpressure: enqueue() blocks when maxQueueSize is reached
 */
/**
 * Throw from config.send() to make the uploader wait a server-supplied
 * duration before retrying (e.g. 429 with Retry-After). When retryAfterMs
 * is set, it overrides exponential backoff for that attempt — clamped to
 * [baseDelayMs, maxDelayMs] and jittered so a misbehaving server can
 * neither hot-loop nor stall the client, and many sessions sharing a rate
 * limit don't all pounce at the same instant. Without retryAfterMs, behaves
 * like any other thrown error (exponential backoff).
 */
export declare class RetryableError extends Error {
    readonly retryAfterMs?: number | undefined;
    constructor(message: string, retryAfterMs?: number | undefined);
}
type SerialBatchEventUploaderConfig<T> = {
    /** Max items per POST (1 = no batching) */
    maxBatchSize: number;
    /**
     * Max serialized bytes per POST. First item always goes in regardless of
     * size; subsequent items only if cumulative JSON bytes stay under this.
     * Undefined = no byte limit (count-only batching).
     */
    maxBatchBytes?: number;
    /** Max pending items before enqueue() blocks */
    maxQueueSize: number;
    /** The actual HTTP call — caller controls payload format */
    send: (batch: T[]) => Promise<void>;
    /** Base delay for exponential backoff (ms) */
    baseDelayMs: number;
    /** Max delay cap (ms) */
    maxDelayMs: number;
    /** Random jitter range added to retry delay (ms) */
    jitterMs: number;
    /**
     * After this many consecutive send() failures, drop the failing batch
     * and move on to the next pending item with a fresh failure budget.
     * Undefined = retry indefinitely (default).
     */
    maxConsecutiveFailures?: number;
    /** Called when a batch is dropped for hitting maxConsecutiveFailures. */
    onBatchDropped?: (batchSize: number, failures: number) => void;
};
export declare class SerialBatchEventUploader<T> {
    private pending;
    private pendingAtClose;
    private draining;
    private closed;
    private backpressureResolvers;
    private sleepResolve;
    private flushResolvers;
    private droppedBatches;
    private readonly config;
    constructor(config: SerialBatchEventUploaderConfig<T>);
    /**
     * Monotonic count of batches dropped via maxConsecutiveFailures. Callers
     * can snapshot before flush() and compare after to detect silent drops
     * (flush() resolves normally even when batches were dropped).
     */
    get droppedBatchCount(): number;
    /**
     * Pending queue depth. After close(), returns the count at close time —
     * close() clears the queue but shutdown diagnostics may read this after.
     */
    get pendingCount(): number;
    /**
     * Add events to the pending buffer. Returns immediately if space is
     * available. Blocks (awaits) if the buffer is full — caller pauses
     * until drain frees space.
     */
    enqueue(events: T | T[]): Promise<void>;
    /**
     * Block until all pending events have been sent.
     * Used at turn boundaries and graceful shutdown.
     */
    flush(): Promise<void>;
    /**
     * Drop pending events and stop processing.
     * Resolves any blocked enqueue() and flush() callers.
     */
    close(): void;
    /**
     * Drain loop. At most one instance runs at a time (guarded by this.draining).
     * Sends batches serially. On failure, backs off and retries indefinitely.
     */
    private drain;
    /**
     * Pull the next batch from pending. Respects both maxBatchSize and
     * maxBatchBytes. The first item is always taken; subsequent items only
     * if adding them keeps the cumulative JSON size under maxBatchBytes.
     *
     * Un-serializable items (BigInt, circular refs, throwing toJSON) are
     * dropped in place — they can never be sent and leaving them at
     * pending[0] would poison the queue and hang flush() forever.
     */
    private takeBatch;
    private retryDelay;
    private releaseBackpressure;
    private sleep;
}
export {};
//# sourceMappingURL=SerialBatchEventUploader.d.ts.map