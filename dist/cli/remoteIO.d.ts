import type { StdoutMessage } from 'src/entrypoints/sdk/controlTypes.js';
import { StructuredIO } from './structuredIO.js';
/**
 * Bidirectional streaming for SDK mode with session tracking
 * Supports WebSocket transport
 */
export declare class RemoteIO extends StructuredIO {
    private url;
    private transport;
    private inputStream;
    private readonly isBridge;
    private readonly isDebug;
    private ccrClient;
    private keepAliveTimer;
    constructor(streamUrl: string, initialPrompt?: AsyncIterable<string>, replayUserMessages?: boolean);
    flushInternalEvents(): Promise<void>;
    get internalEventsPending(): number;
    /**
     * Send output to the transport.
     * In bridge mode, control_request messages are always echoed to stdout so the
     * bridge parent can detect permission requests. Other messages are echoed only
     * in debug mode.
     */
    write(message: StdoutMessage): Promise<void>;
    /**
     * Clean up connections gracefully
     */
    close(): void;
}
//# sourceMappingURL=remoteIO.d.ts.map