import type { StdoutMessage } from 'src/entrypoints/sdk/controlTypes.js';
import type { HybridTransport } from '../cli/transports/HybridTransport.js';
import type { SessionState } from '../utils/sessionState.js';
/**
 * Transport abstraction for replBridge. Covers exactly the surface that
 * replBridge.ts uses against HybridTransport so the v1/v2 choice is
 * confined to the construction site.
 *
 * - v1: HybridTransport (WS reads + POST writes to Session-Ingress)
 * - v2: SSETransport (reads) + CCRClient (writes to CCR v2 /worker/*)
 *
 * The v2 write path goes through CCRClient.writeEvent → SerialBatchEventUploader,
 * NOT through SSETransport.write() — SSETransport.write() targets the
 * Session-Ingress POST URL shape, which is wrong for CCR v2.
 */
export type ReplBridgeTransport = {
    write(message: StdoutMessage): Promise<void>;
    writeBatch(messages: StdoutMessage[]): Promise<void>;
    close(): void;
    isConnectedStatus(): boolean;
    getStateLabel(): string;
    setOnData(callback: (data: string) => void): void;
    setOnClose(callback: (closeCode?: number) => void): void;
    setOnConnect(callback: () => void): void;
    connect(): void;
    /**
     * High-water mark of the underlying read stream's event sequence numbers.
     * replBridge reads this before swapping transports so the new one can
     * resume from where the old one left off (otherwise the server replays
     * the entire session history from seq 0).
     *
     * v1 returns 0 — Session-Ingress WS doesn't use SSE sequence numbers;
     * replay-on-reconnect is handled by the server-side message cursor.
     */
    getLastSequenceNum(): number;
    /**
     * Monotonic count of batches dropped via maxConsecutiveFailures.
     * Snapshot before writeBatch() and compare after to detect silent drops
     * (writeBatch() resolves normally even when batches were dropped).
     * v2 returns 0 — the v2 write path doesn't set maxConsecutiveFailures.
     */
    readonly droppedBatchCount: number;
    /**
     * PUT /worker state (v2 only; v1 is a no-op). `requires_action` tells
     * the backend a permission prompt is pending — claude.ai shows the
     * "waiting for input" indicator. REPL/daemon callers don't need this
     * (user watches the REPL locally); multi-session worker callers do.
     */
    reportState(state: SessionState): void;
    /** PUT /worker external_metadata (v2 only; v1 is a no-op). */
    reportMetadata(metadata: Record<string, unknown>): void;
    /**
     * POST /worker/events/{id}/delivery (v2 only; v1 is a no-op). Populates
     * CCR's processing_at/processed_at columns. `received` is auto-fired by
     * CCRClient on every SSE frame and is not exposed here.
     */
    reportDelivery(eventId: string, status: 'processing' | 'processed'): void;
    /**
     * Drain the write queue before close() (v2 only; v1 resolves
     * immediately — HybridTransport POSTs are already awaited per-write).
     */
    flush(): Promise<void>;
};
/**
 * v1 adapter: HybridTransport already has the full surface (it extends
 * WebSocketTransport which has setOnConnect + getStateLabel). This is a
 * no-op wrapper that exists only so replBridge's `transport` variable
 * has a single type.
 */
export declare function createV1ReplTransport(hybrid: HybridTransport): ReplBridgeTransport;
/**
 * v2 adapter: wrap SSETransport (reads) + CCRClient (writes, heartbeat,
 * state, delivery tracking).
 *
 * Auth: v2 endpoints validate the JWT's session_id claim (register_worker.go:32)
 * and worker role (environment_auth.py:856). OAuth tokens have neither.
 * This is the inverse of the v1 replBridge path, which deliberately uses OAuth.
 * The JWT is refreshed when the poll loop re-dispatches work — the caller
 * invokes createV2ReplTransport again with the fresh token.
 *
 * Registration happens here (not in the caller) so the entire v2 handshake
 * is one async step. registerWorker failure propagates — replBridge will
 * catch it and stay on the poll loop.
 */
export declare function createV2ReplTransport(opts: {
    sessionUrl: string;
    ingressToken: string;
    sessionId: string;
    /**
     * SSE sequence-number high-water mark from the previous transport.
     * Passed to the new SSETransport so its first connect() sends
     * from_sequence_num / Last-Event-ID and the server resumes from where
     * the old stream left off. Without this, every transport swap asks the
     * server to replay the entire session history from seq 0.
     */
    initialSequenceNum?: number;
    /**
     * Worker epoch from POST /bridge response. When provided, the server
     * already bumped epoch (the /bridge call IS the register — see server
     * PR #293280). When omitted (v1 CCR-v2 path via replBridge.ts poll loop),
     * call registerWorker as before.
     */
    epoch?: number;
    /** CCRClient heartbeat interval. Defaults to 20s when omitted. */
    heartbeatIntervalMs?: number;
    /** ±fraction per-beat jitter. Defaults to 0 (no jitter) when omitted. */
    heartbeatJitterFraction?: number;
    /**
     * When true, skip opening the SSE read stream — only the CCRClient write
     * path is activated. Use for mirror-mode attachments that forward events
     * but never receive inbound prompts or control requests.
     */
    outboundOnly?: boolean;
    /**
     * Per-instance auth header source. When provided, CCRClient + SSETransport
     * read auth from this closure instead of the process-wide
     * CLAUDE_CODE_SESSION_ACCESS_TOKEN env var. Required for callers managing
     * multiple concurrent sessions — the env-var path stomps across sessions.
     * When omitted, falls back to the env var (single-session callers).
     */
    getAuthToken?: () => string | undefined;
}): Promise<ReplBridgeTransport>;
//# sourceMappingURL=replBridgeTransport.d.ts.map