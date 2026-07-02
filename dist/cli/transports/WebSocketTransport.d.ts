import type { StdoutMessage } from 'src/entrypoints/sdk/controlTypes.js';
import type { Transport } from './Transport.js';
export type WebSocketTransportOptions = {
    /** When false, the transport does not attempt automatic reconnection on
     *  disconnect. Use this when the caller has its own recovery mechanism
     *  (e.g. the REPL bridge poll loop). Defaults to true. */
    autoReconnect?: boolean;
    /** Gates the tengu_ws_transport_* telemetry events. Set true at the
     *  REPL-bridge construction site so only Remote Control sessions (the
     *  Cloudflare-idle-timeout population) emit; print-mode workers stay
     *  silent. Defaults to false. */
    isBridge?: boolean;
};
type WebSocketTransportState = 'idle' | 'connected' | 'reconnecting' | 'closing' | 'closed';
export declare class WebSocketTransport implements Transport {
    private ws;
    private lastSentId;
    protected url: URL;
    protected state: WebSocketTransportState;
    protected onData?: (data: string) => void;
    private onCloseCallback?;
    private onConnectCallback?;
    private headers;
    private sessionId?;
    private autoReconnect;
    private isBridge;
    private reconnectAttempts;
    private reconnectStartTime;
    private reconnectTimer;
    private lastReconnectAttemptTime;
    private lastActivityTime;
    private pingInterval;
    private pongReceived;
    private keepAliveInterval;
    private messageBuffer;
    private isBunWs;
    private connectStartTime;
    private refreshHeaders?;
    constructor(url: URL, headers?: Record<string, string>, sessionId?: string, refreshHeaders?: () => Record<string, string>, options?: WebSocketTransportOptions);
    connect(): Promise<void>;
    private onBunOpen;
    private onBunMessage;
    private onBunError;
    private onBunClose;
    private onNodeOpen;
    private onNodeMessage;
    private onNodeError;
    private onNodeClose;
    private onPong;
    private handleOpenEvent;
    protected sendLine(line: string): boolean;
    /**
     * Remove all listeners attached in connect() for the given WebSocket.
     * Without this, each reconnect orphans the old WS object + its closures
     * until GC — these accumulate under network instability. Mirrors the
     * pattern in src/utils/mcpWebSocketTransport.ts.
     */
    private removeWsListeners;
    protected doDisconnect(): void;
    private handleConnectionError;
    close(): void;
    private replayBufferedMessages;
    isConnectedStatus(): boolean;
    isClosedStatus(): boolean;
    setOnData(callback: (data: string) => void): void;
    setOnConnect(callback: () => void): void;
    setOnClose(callback: (closeCode?: number) => void): void;
    getStateLabel(): string;
    write(message: StdoutMessage): Promise<void>;
    private getControlMessageDetailLabel;
    private startPingInterval;
    private stopPingInterval;
    private startKeepaliveInterval;
    private stopKeepaliveInterval;
}
export {};
//# sourceMappingURL=WebSocketTransport.d.ts.map