import type { Api } from "grammy";
/** Repeats `sendChatAction(typing)` until `stop()` is called. No-op when `enabled` is false. */
export declare function startTypingRefresh(api: Api, chatId: number | string, messageThreadId: number | undefined, enabled: boolean): () => void;
