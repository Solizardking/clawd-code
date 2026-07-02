import type { StdoutMessage } from 'src/entrypoints/sdk/controlTypes.js';
import { WebSocketTransport, type WebSocketTransportOptions } from './WebSocketTransport.js';
/**
 * Hybrid transport: WebSocket for reads, HTTP POST for writes.
 *
 * Write flow:
 *
 *   write(stream_event) ─┐
 *                        │ (100ms timer)
 *                        │
 *                        ▼
 *   write(other) ────► uploader.enqueue()  (SerialBatchEventUploader)
 *                        ▲    │
 *   writeBatch() ────────┘    │ serial, batched, retries indefinitely,
 *                             │ backpressure at maxQueueSize
 *                             ▼
 *                        postOnce()  (single HTTP POST, throws on retryable)
 *
 * stream_event messages accumulate in streamEventBuffer for up to 100ms
 * before enqueue (reduces POST count for high-volume content deltas). A
 * non-stream write flushes any buffered stream_events first to preserve order.
 *
 * Serialization + retry + backpressure are delegated to SerialBatchEventUploader
 * (same primitive CCR uses). At most one POST in-flight; events arriving during
 * a POST batch into the next one. On failure, the uploader re-queues and retries
 * with exponential backoff + jitter. If the queue fills past maxQueueSize,
 * enqueue() blocks — giving awaiting callers backpressure.
 *
 * Why serialize? Bridge mode fires writes via `void transport.write()`
 * (fire-and-forget). Without this, concurrent POSTs → concurrent Firestore
 * writes to the same document → collisions → retry storms → pages oncall.
 */
export declare class HybridTransport extends WebSocketTransport {
    private postUrl;
    private uploader;
    private streamEventBuffer;
    private streamEventTimer;
    constructor(url: URL, headers?: Record<string, string>, sessionId?: string, refreshHeaders?: () => Record<string, string>, options?: WebSocketTransportOptions & {
        maxConsecutiveFailures?: number;
        onBatchDropped?: (batchSize: number, failures: number) => void;
    });
    /**
     * Enqueue a message and wait for the queue to drain. Returning flush()
     * preserves the contract that `await write()` resolves after the event is
     * POSTed (relied on by tests and replBridge's initial flush). Fire-and-forget
     * callers (`void transport.write()`) are unaffected — they don't await,
     * so the later resolution doesn't add latency.
     */
    write(message: StdoutMessage): Promise<void>;
    writeBatch(messages: StdoutMessage[]): Promise<void>;
    /** Snapshot before/after writeBatch() to detect silent drops. */
    get droppedBatchCount(): number;
    /**
     * Block until all pending events are POSTed. Used by bridge's initial
     * history flush so onStateChange('connected') fires after persistence.
     */
    flush(): Promise<void>;
    /** Take ownership of buffered stream_events and clear the delay timer. */
    private takeStreamEvents;
    /** Delay timer fired — enqueue accumulated stream_events. */
    private flushStreamEvents;
    close(): void;
    /**
     * Single-attempt POST. Throws on retryable failures (429, 5xx, network)
     * so SerialBatchEventUploader re-queues and retries. Returns on success
     * and on permanent failures (4xx non-429, no token) so the uploader moves on.
     */
    private postOnce;
}
//# sourceMappingURL=HybridTransport.d.ts.map