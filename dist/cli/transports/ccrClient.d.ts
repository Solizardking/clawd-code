import type { SDKPartialAssistantMessage, StdoutMessage } from 'src/entrypoints/sdk/controlTypes.js';
import type { RequiresActionDetails, SessionState } from '../../utils/sessionState.js';
import type { SSETransport } from './SSETransport.js';
export type CCRInitFailReason = 'no_auth_headers' | 'missing_epoch' | 'worker_register_failed';
/** Thrown by initialize(); carries a typed reason for the diag classifier. */
export declare class CCRInitError extends Error {
    readonly reason: CCRInitFailReason;
    constructor(reason: CCRInitFailReason);
}
type EventPayload = {
    uuid: string;
    type: string;
    [key: string]: unknown;
};
/**
 * Accumulator state for text_delta coalescing. Keyed by API message ID so
 * lifetime is tied to the assistant message — cleared when the complete
 * SDKAssistantMessage arrives (writeEvent), which is reliable even when
 * abort/error paths skip content_block_stop/message_stop delivery.
 */
export type StreamAccumulatorState = {
    /** API message ID (msg_...) → blocks[blockIndex] → chunk array. */
    byMessage: Map<string, string[][]>;
    /**
     * {session_id}:{parent_tool_use_id} → active message ID.
     * content_block_delta events don't carry the message ID (only
     * message_start does), so we track which message is currently streaming
     * for each scope. At most one message streams per scope at a time.
     */
    scopeToMessage: Map<string, string>;
};
export declare function createStreamAccumulator(): StreamAccumulatorState;
/**
 * Accumulate text_delta stream_events into full-so-far snapshots per content
 * block. Each flush emits ONE event per touched block containing the FULL
 * accumulated text from the start of the block — a client connecting
 * mid-stream receives a self-contained snapshot, not a fragment.
 *
 * Non-text-delta events pass through unchanged. message_start records the
 * active message ID for the scope; content_block_delta appends chunks;
 * the snapshot event reuses the first text_delta UUID seen for that block in
 * this flush so server-side idempotency remains stable across retries.
 *
 * Cleanup happens in writeEvent when the complete assistant message arrives
 * (reliable), not here on stop events (abort/error paths skip those).
 */
export declare function accumulateStreamEvents(buffer: SDKPartialAssistantMessage[], state: StreamAccumulatorState): EventPayload[];
/**
 * Clear accumulator entries for a completed assistant message. Called from
 * writeEvent when the SDKAssistantMessage arrives — the reliable end-of-stream
 * signal that fires even when abort/interrupt/error skip SSE stop events.
 */
export declare function clearStreamAccumulatorForMessage(state: StreamAccumulatorState, assistant: {
    session_id: string;
    parent_tool_use_id: string | null;
    message: {
        id: string;
    };
}): void;
export type InternalEvent = {
    event_id: string;
    event_type: string;
    payload: Record<string, unknown>;
    event_metadata?: Record<string, unknown> | null;
    is_compaction: boolean;
    created_at: string;
    agent_id?: string;
};
/**
 * Manages the worker lifecycle protocol with CCR v2:
 * - Epoch management: reads worker_epoch from CLAUDE_CODE_WORKER_EPOCH env var
 * - Runtime state reporting: PUT /sessions/{id}/worker
 * - Heartbeat: POST /sessions/{id}/worker/heartbeat for liveness detection
 *
 * All writes go through this.request().
 */
export declare class CCRClient {
    private workerEpoch;
    private readonly heartbeatIntervalMs;
    private readonly heartbeatJitterFraction;
    private heartbeatTimer;
    private heartbeatInFlight;
    private closed;
    private consecutiveAuthFailures;
    private currentState;
    private readonly sessionBaseUrl;
    private readonly sessionId;
    private readonly http;
    private streamEventBuffer;
    private streamEventTimer;
    private streamTextAccumulator;
    private readonly workerState;
    private readonly eventUploader;
    private readonly internalEventUploader;
    private readonly deliveryUploader;
    /**
     * Called when the server returns 409 (a newer worker epoch superseded ours).
     * Default: process.exit(1) — correct for spawn-mode children where the
     * parent bridge re-spawns. In-process callers (replBridge) MUST override
     * this to close gracefully instead; exit would kill the user's REPL.
     */
    private readonly onEpochMismatch;
    /**
     * Auth header source. Defaults to the process-wide session-ingress token
     * (CLAUDE_CODE_SESSION_ACCESS_TOKEN env var). Callers managing multiple
     * concurrent sessions with distinct JWTs MUST inject this — the env-var
     * path is a process global and would stomp across sessions.
     */
    private readonly getAuthHeaders;
    constructor(transport: SSETransport, sessionUrl: URL, opts?: {
        onEpochMismatch?: () => never;
        heartbeatIntervalMs?: number;
        heartbeatJitterFraction?: number;
        /**
         * Per-instance auth header source. Omit to read the process-wide
         * CLAUDE_CODE_SESSION_ACCESS_TOKEN (single-session callers — REPL,
         * daemon). Required for concurrent multi-session callers.
         */
        getAuthHeaders?: () => Record<string, string>;
    });
    /**
     * Initialize the session worker:
     * 1. Take worker_epoch from the argument, or fall back to
     *    CLAUDE_CODE_WORKER_EPOCH (set by env-manager / bridge spawner)
     * 2. Report state as 'idle'
     * 3. Start heartbeat timer
     *
     * In-process callers (replBridge) pass the epoch directly — they
     * registered the worker themselves and there is no parent process
     * setting env vars.
     */
    initialize(epoch?: number): Promise<Record<string, unknown> | null>;
    private getWorkerState;
    /**
     * Send an authenticated HTTP request to CCR. Handles auth headers,
     * 409 epoch mismatch, and error logging. Returns { ok: true } on 2xx.
     * On 429, reads Retry-After (integer seconds) so the uploader can honor
     * the server's backoff hint instead of blindly exponentiating.
     */
    private request;
    /** Report worker state to CCR via PUT /sessions/{id}/worker. */
    reportState(state: SessionState, details?: RequiresActionDetails): void;
    /** Report external metadata to CCR via PUT /worker. */
    reportMetadata(metadata: Record<string, unknown>): void;
    /**
     * Handle epoch mismatch (409 Conflict). A newer CC instance has replaced
     * this one — exit immediately.
     */
    private handleEpochMismatch;
    /** Start periodic heartbeat. */
    private startHeartbeat;
    /** Stop heartbeat timer. */
    private stopHeartbeat;
    /** Send a heartbeat via POST /sessions/{id}/worker/heartbeat. */
    private sendHeartbeat;
    /**
     * Write a StdoutMessage as a client event via POST /sessions/{id}/worker/events.
     * These events are visible to frontend clients via the SSE stream.
     * Injects a UUID if missing to ensure server-side idempotency on retry.
     *
     * stream_event messages are held in a 100ms delay buffer and accumulated
     * (text_deltas for the same content block emit a full-so-far snapshot per
     * flush). A non-stream_event write flushes the buffer first so downstream
     * ordering is preserved.
     */
    writeEvent(message: StdoutMessage): Promise<void>;
    /** Wrap a StdoutMessage as a ClientEvent, injecting a UUID if missing. */
    private toClientEvent;
    /**
     * Drain the stream_event delay buffer: accumulate text_deltas into
     * full-so-far snapshots, clear the timer, enqueue the resulting events.
     * Called from the timer, from writeEvent on a non-stream message, and from
     * flush(). close() drops the buffer — call flush() first if you need
     * delivery.
     */
    private flushStreamEventBuffer;
    /**
     * Write an internal worker event via POST /sessions/{id}/worker/internal-events.
     * These events are NOT visible to frontend clients — they store worker-internal
     * state (transcript messages, compaction markers) needed for session resume.
     */
    writeInternalEvent(eventType: string, payload: Record<string, unknown>, { isCompaction, agentId, }?: {
        isCompaction?: boolean;
        agentId?: string;
    }): Promise<void>;
    /**
     * Flush pending internal events. Call between turns and on shutdown
     * to ensure transcript entries are persisted.
     */
    flushInternalEvents(): Promise<void>;
    /**
     * Flush pending client events (writeEvent queue). Call before close()
     * when the caller needs delivery confirmation — close() abandons the
     * queue. Resolves once the uploader drains or rejects; returns
     * regardless of whether individual POSTs succeeded (check server state
     * separately if that matters).
     */
    flush(): Promise<void>;
    /**
     * Read foreground agent internal events from
     * GET /sessions/{id}/worker/internal-events.
     * Returns transcript entries from the last compaction boundary, or null on failure.
     * Used for session resume.
     */
    readInternalEvents(): Promise<InternalEvent[] | null>;
    /**
     * Read all subagent internal events from
     * GET /sessions/{id}/worker/internal-events?subagents=true.
     * Returns a merged stream across all non-foreground agents, each from its
     * compaction point. Used for session resume.
     */
    readSubagentInternalEvents(): Promise<InternalEvent[] | null>;
    /**
     * Paginated GET with retry. Fetches all pages from a list endpoint,
     * retrying each page on failure with exponential backoff + jitter.
     */
    private paginatedGet;
    /**
     * Single GET request with retry. Returns the parsed response body
     * on success, null if all retries are exhausted.
     */
    private getWithRetry;
    /**
     * Report delivery status for a client-to-worker event.
     * POST /v1/code/sessions/{id}/worker/events/delivery (batch endpoint)
     */
    reportDelivery(eventId: string, status: 'received' | 'processing' | 'processed'): void;
    /** Get the current epoch (for external use). */
    getWorkerEpoch(): number;
    /** Internal-event queue depth — shutdown-snapshot backpressure signal. */
    get internalEventsPending(): number;
    /** Clean up uploaders and timers. */
    close(): void;
}
export {};
//# sourceMappingURL=ccrClient.d.ts.map