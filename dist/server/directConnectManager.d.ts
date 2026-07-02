import type { SDKMessage } from '../entrypoints/agentSdkTypes.js';
import type { SDKControlPermissionRequest } from '../entrypoints/sdk/controlTypes.js';
import type { RemotePermissionResponse } from '../remote/RemoteSessionManager.js';
import type { RemoteMessageContent } from '../utils/teleport/api.js';
export type DirectConnectConfig = {
    serverUrl: string;
    sessionId: string;
    wsUrl: string;
    authToken?: string;
};
export type DirectConnectCallbacks = {
    onMessage: (message: SDKMessage) => void;
    onPermissionRequest: (request: SDKControlPermissionRequest, requestId: string) => void;
    onConnected?: () => void;
    onDisconnected?: () => void;
    onError?: (error: Error) => void;
};
export declare class DirectConnectSessionManager {
    private ws;
    private config;
    private callbacks;
    constructor(config: DirectConnectConfig, callbacks: DirectConnectCallbacks);
    connect(): void;
    sendMessage(content: RemoteMessageContent): boolean;
    respondToPermissionRequest(requestId: string, result: RemotePermissionResponse): void;
    /**
     * Send an interrupt signal to cancel the current request
     */
    sendInterrupt(): void;
    private sendErrorResponse;
    disconnect(): void;
    isConnected(): boolean;
}
//# sourceMappingURL=directConnectManager.d.ts.map