import type { SDKMessage } from '../entrypoints/agentSdkTypes.js';
import type { SDKControlCancelRequest, SDKControlRequest, SDKControlRequestInner, SDKControlResponse } from '../entrypoints/sdk/controlTypes.js';
type SessionsMessage = SDKMessage | SDKControlRequest | SDKControlResponse | SDKControlCancelRequest;
export type SessionsWebSocketCallbacks = {
    onMessage: (message: SessionsMessage) => void;
    onClose?: () => void;
    onError?: (error: Error) => void;
    onConnected?: () => void;
    /** Fired when a transient close is detected and a reconnect is scheduled.
     *  onClose fires only for permanent close (server ended / attempts exhausted). */
    onReconnecting?: () => void;
};
/**
 * WebSocket client for connecting to CCR sessions via /v1/sessions/ws/{id}/subscribe
 *
 * Protocol:
 * 1. Connect to wss://api.anthropic.com/v1/sessions/ws/{sessionId}/subscribe?organization_uuid=...
 * 2. Send auth message: { type: 'auth', credential: { type: 'oauth', token: '...' } }
 * 3. Receive SDKMessage stream from the session
 */
export declare class SessionsWebSocket {
    private readonly sessionId;
    private readonly orgUuid;
    private readonly getAccessToken;
    private readonly callbacks;
    private ws;
    private state;
    private reconnectAttempts;
    private sessionNotFoundRetries;
    private pingInterval;
    private reconnectTimer;
    constructor(sessionId: string, orgUuid: string, getAccessToken: () => string, callbacks: SessionsWebSocketCallbacks);
    /**
     * Connect to the sessions WebSocket endpoint
     */
    connect(): Promise<void>;
    /**
     * Handle incoming WebSocket message
     */
    private handleMessage;
    /**
     * Handle WebSocket close
     */
    private handleClose;
    private scheduleReconnect;
    private startPingInterval;
    /**
     * Stop ping interval
     */
    private stopPingInterval;
    /**
     * Send a control response back to the session
     */
    sendControlResponse(response: SDKControlResponse): void;
    /**
     * Send a control request to the session (e.g., interrupt)
     */
    sendControlRequest(request: SDKControlRequestInner): void;
    /**
     * Check if connected
     */
    isConnected(): boolean;
    /**
     * Close the WebSocket connection
     */
    close(): void;
    /**
     * Force reconnect - closes existing connection and establishes a new one.
     * Useful when the subscription becomes stale (e.g., after container shutdown).
     */
    reconnect(): void;
}
export {};
//# sourceMappingURL=SessionsWebSocket.d.ts.map