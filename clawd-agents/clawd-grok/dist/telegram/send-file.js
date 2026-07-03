import { existsSync, statSync } from "fs";
import { InputFile } from "grammy";
import path from "path";
const MAX_PHOTO_BYTES = 10 * 1024 * 1024;
const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;
const PHOTO_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const VIDEO_EXTENSIONS = new Set([".mp4"]);
const ANIMATION_EXTENSIONS = new Set([".gif"]);
function threadOpts(messageThreadId) {
    return messageThreadId !== undefined ? { message_thread_id: messageThreadId } : {};
}
export async function sendFileToTelegram(ctx, filePath) {
    if (!existsSync(filePath)) {
        return { success: false, output: `File not found: ${filePath}` };
    }
    const sizeBytes = statSync(filePath).size;
    if (sizeBytes > MAX_UPLOAD_BYTES) {
        return {
            success: false,
            output: `File too large for Telegram (${(sizeBytes / 1024 / 1024).toFixed(1)} MB, max 50 MB): ${filePath}`,
        };
    }
    const ext = path.extname(filePath).toLowerCase();
    const fileName = path.basename(filePath);
    const inputFile = new InputFile(filePath, fileName);
    const opts = threadOpts(ctx.messageThreadId);
    try {
        if (PHOTO_EXTENSIONS.has(ext) && sizeBytes <= MAX_PHOTO_BYTES) {
            await ctx.api.sendPhoto(ctx.chatId, inputFile, opts);
            return { success: true, output: `Sent photo to Telegram: ${fileName}` };
        }
        if (ANIMATION_EXTENSIONS.has(ext)) {
            await ctx.api.sendAnimation(ctx.chatId, inputFile, opts);
            return { success: true, output: `Sent animation to Telegram: ${fileName}` };
        }
        if (VIDEO_EXTENSIONS.has(ext)) {
            await ctx.api.sendVideo(ctx.chatId, inputFile, opts);
            return { success: true, output: `Sent video to Telegram: ${fileName}` };
        }
        await ctx.api.sendDocument(ctx.chatId, inputFile, opts);
        return { success: true, output: `Sent document to Telegram: ${fileName}` };
    }
    catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        return { success: false, output: `Failed to send ${fileName} to Telegram: ${msg}` };
    }
}
//# sourceMappingURL=send-file.js.map