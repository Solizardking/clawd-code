import type { SDKMessage } from '../entrypoints/agentSdkTypes.js';
import type { SDKControlPermissionRequest } from '../entrypoints/sdk/controlTypes.js';
import { type RemoteMessageContent } from '../utils/teleport/api.js';
/**
 * Simple permission response for remote sessions.
 * This is a simplified version of PermissionResult for CCR communication.
 */
export type RemotePermissionResponse = {
    behavior: 'allow';
    updatedInput: Record<string, unknown>;
} | {
    behavior: 'deny';
    message: string;
};
export type RemoteSessionConfig = {
    sessionId: string;
    getAccessToken: () => string;
    orgUuid: string;
    /** True if session was created with an initial prompt that's being processed */
    hasInitialPrompt?: boolean;
    /**
     * When true, this client is a pure viewer. Ctrl+C/Escape do NOT send
     * interrupt to the remote agent; 60s reconnect timeout is disabled;
     * session title is never updated. Used by `claude assistant`.
     */
    viewerOnly?: boolean;
};
export type RemoteSessionCallbacks = {
    /** Called when an SDKMessage is received from the session */
    onMessage: (message: SDKMessage) => void;
    /** Called when a permission request is received from CCR */
    onPermissionRequest: (request: SDKControlPermissionRequest, requestId: string) => void;
    /** Called when the server cancels a pending permission request */
    onPermissionCancelled?: (requestId: string, toolUseId: string | undefined) => void;
    /** Called when connection is established */
    onConnected?: () => void;
    /** Called when connection is lost and cannot be restored */
    onDisconnected?: () => void;
    /** Called on transient WS drop while reconnect backoff is in progress */
    onReconnecting?: () => void;
    /** Called on error */
    onError?: (error: Error) => void;
};
/**
 * Manages a remote CCR session.
 *
 * Coordinates:
 * - WebSocket subscription for receiving messages from CCR
 * - HTTP POST for sending user messages to CCR
 * - Permission request/response flow
 */
export declare class RemoteSessionManager {
    private readonly config;
    private readonly callbacks;
    private websocket;
    private pendingPermissionRequests;
    constructor(config: RemoteSessionConfig, callbacks: RemoteSessionCallbacks);
    /**
     * Connect to the remote session via WebSocket
     */
    connect(): void;
    /**
     * Handle messages from WebSocket
     */
    private handleMessage;
    /**
     * Handle control requests from CCR (e.g., permission requests)
     */
    private handleControlRequest;
    /**
     * Send a user message to the remote session via HTTP POST
     */
    sendMessage(content: RemoteMessageContent, opts?: {
        uuid?: string;
    }): Promise<boolean>;
    /**
     * Respond to a permission request from CCR
     */
    respondToPermissionRequest(requestId: string, result: RemotePermissionResponse): void;
    /**
     * Check if connected to the remote session
     */
    isConnected(): boolean;
    /**
     * Send an interrupt signal to cancel the current request on the remote session
     */
    cancelSession(): void;
    /**
     * Get the session ID
     */
    getSessionId(): string;
    /**
     * Disconnect from the remote session
     */
    disconnect(): void;
    /**
     * Force reconnect the WebSocket.
     * Useful when the subscription becomes stale after container shutdown.
     */
    reconnect(): void;
}
/**
 * Create a remote session config from OAuth tokens
 */
export declare function createRemoteSessionConfig(sessionId: string, getAccessToken: () => string, orgUuid: string, hasInitialPrompt?: boolean, viewerOnly?: boolean): RemoteSessionConfig;
//# sourceMappingURL=RemoteSessionManager.d.ts.map