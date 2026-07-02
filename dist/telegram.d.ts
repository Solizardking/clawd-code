/**
 * Clawd Code — Telegram relay
 * Long-polls the Telegram Bot API and routes text messages from an
 * allowlisted chat into the Z.AI GLM chat pipeline. No OS-level or
 * computer-use control is exposed — this is a chat/CLI relay only.
 */
/**
 * Starts the Telegram relay. Blocks the process (long-poll loop) until
 * SIGINT/SIGTERM. Only chats in TELEGRAM_ALLOWED_CHAT_ID may issue commands.
 */
export declare function runTelegramRelay(): Promise<void>;
//# sourceMappingURL=telegram.d.ts.map