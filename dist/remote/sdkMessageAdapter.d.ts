import type { SDKMessage, SDKResultMessage } from '../entrypoints/agentSdkTypes.js';
import type { Message, StreamEvent } from '../types/message.js';
/**
 * Result of converting an SDKMessage
 */
export type ConvertedMessage = {
    type: 'message';
    message: Message;
} | {
    type: 'stream_event';
    event: StreamEvent;
} | {
    type: 'ignored';
};
type ConvertOptions = {
    /** Convert user messages containing tool_result content blocks into UserMessages.
     * Used by direct connect mode where tool results come from the remote server
     * and need to be rendered locally. CCR mode ignores user messages since they
     * are handled differently. */
    convertToolResults?: boolean;
    /**
     * Convert user text messages into UserMessages for display. Used when
     * converting historical events where user-typed messages need to be shown.
     * In live WS mode these are already added locally by the REPL so they're
     * ignored by default.
     */
    convertUserTextMessages?: boolean;
};
/**
 * Convert an SDKMessage to REPL message format
 */
export declare function convertSDKMessage(msg: SDKMessage, opts?: ConvertOptions): ConvertedMessage;
/**
 * Check if an SDKMessage indicates the session has ended
 */
export declare function isSessionEndMessage(msg: SDKMessage): boolean;
/**
 * Check if an SDKResultMessage indicates success
 */
export declare function isSuccessResult(msg: SDKResultMessage): boolean;
/**
 * Extract the result text from a successful SDKResultMessage
 */
export declare function getResultText(msg: SDKResultMessage): string | null;
export {};
//# sourceMappingURL=sdkMessageAdapter.d.ts.map