import type { Tools } from '../Tool.js';
import type { Message } from '../types/message.js';
/**
 * Streams rendered messages in chunks, ANSI codes preserved. Each chunk is a
 * fresh renderToAnsiString — yoga layout tree + Ink's screen buffer are sized
 * to the tallest CHUNK instead of the full session. Measured (Mar 2026,
 * 538-msg session): −55% plateau RSS vs a single full render. The sink owns
 * the output — write to stdout for `[` dump-to-scrollback, appendFile for `v`.
 *
 * Messages.renderRange slices AFTER normalize→group→collapse, so tool-call
 * grouping stays correct across chunk seams; buildMessageLookups runs on
 * the full normalized array so tool_use↔tool_result resolves regardless of
 * which chunk each landed in.
 */
export declare function streamRenderedMessages(messages: Message[], tools: Tools, sink: (ansiChunk: string) => void | Promise<void>, { columns, verbose, chunkSize, onProgress }?: {
    columns?: number;
    verbose?: boolean;
    chunkSize?: number;
    onProgress?: (rendered: number) => void;
}): Promise<void>;
/**
 * Renders messages to a plain text string suitable for export.
 * Uses the same React rendering logic as the interactive UI.
 */
export declare function renderMessagesToPlainText(messages: Message[], tools?: Tools, columns?: number): Promise<string>;
//# sourceMappingURL=exportRenderer.d.ts.map