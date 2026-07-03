/** Telegram text message hard limit (characters). */
export const TELEGRAM_MAX_MESSAGE = 4096;
export function splitTelegramMessage(text) {
    if (!text)
        return [];
    const parts = [];
    for (let i = 0; i < text.length; i += TELEGRAM_MAX_MESSAGE) {
        parts.push(text.slice(i, i + TELEGRAM_MAX_MESSAGE));
    }
    return parts;
}
//# sourceMappingURL=limits.js.map