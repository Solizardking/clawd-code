import type { Api } from "grammy";
import type { StreamChunk } from "../types/index";
export interface TelegramPartialReplyArgs {
    chatId: number | string;
    messageThreadId?: number;
    typingIndicator: boolean;
    stream: AsyncIterable<StreamChunk>;
    onAssistantMessage?: (event: {
        content: string;
        done: boolean;
    }) => void;
    onToolCalls?: (toolCalls: NonNullable<StreamChunk["toolCalls"]>) => void;
    onToolResult?: (event: {
        toolCall: NonNullable<StreamChunk["toolCall"]>;
        toolResult: NonNullable<StreamChunk["toolResult"]>;
    }) => void;
}
/**
 * Sends a live-updating preview (send + throttled editMessageText), then finalizes.
 * Falls back to buffer-then-send if the initial message cannot be sent.
 */
export declare function runTelegramPartialReply(api: Api, args: TelegramPartialReplyArgs): Promise<void>;
