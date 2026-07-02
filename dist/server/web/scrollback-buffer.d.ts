/**
 * Circular byte buffer for PTY scrollback replay.
 * Stores the last `capacity` bytes of PTY output; oldest bytes are silently
 * discarded when the buffer is full.
 */
export declare class ScrollbackBuffer {
    private buf;
    private writePos;
    private stored;
    readonly capacity: number;
    constructor(capacityBytes?: number);
    /**
     * Append PTY output to the buffer.
     * Uses 'binary' (latin1) encoding to preserve raw byte values from node-pty.
     */
    write(data: string): void;
    /**
     * Returns all buffered bytes in chronological order (oldest first).
     * The returned Buffer is a copy and safe to send over a WebSocket.
     */
    read(): Buffer;
}
//# sourceMappingURL=scrollback-buffer.d.ts.map