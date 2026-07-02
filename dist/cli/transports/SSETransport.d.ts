import type { StdoutMessage } from 'src/entrypoints/sdk/controlTypes.js';
import type { Transport } from './Transport.js';
type SSEFrame = {
    event?: string;
    id?: string;
    data?: string;
};
/**
 * Incrementally parse SSE frames from a text buffer.
 * Returns parsed frames and the remaining (incomplete) buffer.
 *
 * @internal exported for testing
 */
export declare function parseSSEFrames(buffer: string): {
    frames: SSEFrame[];
    remaining: string;
};
/**
 * Payload for `event: client_event` frames, matching the StreamClientEvent
 * proto message in session_stream.proto. This is the only event type sent
 * to worker subscribers — delivery_update, session_update, ephemeral_event,
 * and catch_up_truncated are client-channel-only (see notifier.go and
 * event_stream.go SubscriberClient guard).
 */
export type StreamClientEvent = {
    event_id: string;
    sequence_num: number;
    event_type: string;
    source: string;
    payload: Record<string, unknown>;
    created_at: string;
};
/**
 * Transport that uses SSE for reading and HTTP POST for writing.
 *
 * Reads events via Server-Sent Events from the CCR v2 event stream endpoint.
 * Writes events via HTTP POST with retry logic (same pattern as HybridTransport).
 *
 * Each `event: client_event` frame carries a StreamClientEvent proto JSON
 * directly in `data:`. The transport extracts `payload` and passes it to
 * `onData` as newline-delimited JSON for StructuredIO consumers.
 *
 * Supports automatic reconnection with exponential backoff and Last-Event-ID
 * for resumption after disconnection.
 */
export declare class SSETransport implements Transport {
    private readonly url;
    private state;
    private onData?;
    private onCloseCallback?;
    private onEventCallback?;
    private headers;
    private sessionId?;
    private refreshHeaders?;
    private readonly getAuthHeaders;
    private abortController;
    private lastSequenceNum;
    private seenSequenceNums;
    private reconnectAttempts;
    private reconnectStartTime;
    private reconnectTimer;
    private livenessTimer;
    private postUrl;
    constructor(url: URL, headers?: Record<string, string>, sessionId?: string, refreshHeaders?: () => Record<string, string>, initialSequenceNum?: number, 
    /**
     * Per-instance auth header source. Omit to read the process-wide
     * CLAUDE_CODE_SESSION_ACCESS_TOKEN (single-session callers). Required
     * for concurrent multi-session callers — the env-var path is a process
     * global and would stomp across sessions.
     */
    getAuthHeaders?: () => Record<string, string>);
    /**
     * High-water mark of sequence numbers seen on this stream. Callers that
     * recreate the transport (e.g. replBridge onWorkReceived) read this before
     * close() and pass it as `initialSequenceNum` to the next instance so the
     * server resumes from the right point instead of replaying everything.
     */
    getLastSequenceNum(): number;
    connect(): Promise<void>;
    /**
     * Read and process the SSE stream body.
     */
    private readStream;
    /**
     * Handle a single SSE frame. The event: field names the variant; data:
     * carries the inner proto JSON directly (no envelope).
     *
     * Worker subscribers only receive client_event frames (see notifier.go) —
     * any other event type indicates a server-side change that CC doesn't yet
     * understand. Log a diagnostic so we notice in telemetry.
     */
    private handleSSEFrame;
    /**
     * Handle connection errors with exponential backoff and time budget.
     */
    private handleConnectionError;
    /**
     * Bound timeout callback. Hoisted from an inline closure so that
     * resetLivenessTimer (called per-frame) does not allocate a new closure
     * on every SSE frame.
     */
    private readonly onLivenessTimeout;
    /**
     * Reset the liveness timer. If no SSE frame arrives within the timeout,
     * treat the connection as dead and reconnect.
     */
    private resetLivenessTimer;
    private clearLivenessTimer;
    write(message: StdoutMessage): Promise<void>;
    isConnectedStatus(): boolean;
    isClosedStatus(): boolean;
    setOnData(callback: (data: string) => void): void;
    setOnClose(callback: (closeCode?: number) => void): void;
    setOnEvent(callback: (event: StreamClientEvent) => void): void;
    close(): void;
}
export {};
//# sourceMappingURL=SSETransport.d.ts.map