/**
 * Coalescing uploader for PUT /worker (session state + metadata).
 *
 * - 1 in-flight PUT + 1 pending patch
 * - New calls coalesce into pending (never grows beyond 1 slot)
 * - On success: send pending if exists
 * - On failure: exponential backoff (clamped), retries indefinitely
 *   until success or close(). Absorbs any pending patches before each retry.
 * - No backpressure needed — naturally bounded at 2 slots
 *
 * Coalescing rules:
 * - Top-level keys (worker_status, external_metadata) — last value wins
 * - Inside external_metadata / internal_metadata — RFC 7396 merge:
 *   keys are added/overwritten, null values preserved (server deletes)
 */
type WorkerStateUploaderConfig = {
    send: (body: Record<string, unknown>) => Promise<boolean>;
    /** Base delay for exponential backoff (ms) */
    baseDelayMs: number;
    /** Max delay cap (ms) */
    maxDelayMs: number;
    /** Random jitter range added to retry delay (ms) */
    jitterMs: number;
};
export declare class WorkerStateUploader {
    private inflight;
    private pending;
    private closed;
    private readonly config;
    constructor(config: WorkerStateUploaderConfig);
    /**
     * Enqueue a patch to PUT /worker. Coalesces with any existing pending
     * patch. Fire-and-forget — callers don't need to await.
     */
    enqueue(patch: Record<string, unknown>): void;
    close(): void;
    private drain;
    /** Retries indefinitely with exponential backoff until success or close(). */
    private sendWithRetry;
    private retryDelay;
}
export {};
//# sourceMappingURL=WorkerStateUploader.d.ts.map