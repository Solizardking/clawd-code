import { InputFile } from "grammy";
import type { ToolResult } from "../types/index";
interface TelegramSendApi {
    sendPhoto: (chatId: number | string, photo: InputFile, other?: Record<string, unknown>) => Promise<unknown>;
    sendVideo: (chatId: number | string, video: InputFile, other?: Record<string, unknown>) => Promise<unknown>;
    sendAnimation: (chatId: number | string, animation: InputFile, other?: Record<string, unknown>) => Promise<unknown>;
    sendDocument: (chatId: number | string, document: InputFile, other?: Record<string, unknown>) => Promise<unknown>;
}
export interface TelegramFileContext {
    api: TelegramSendApi;
    chatId: number | string;
    messageThreadId?: number;
}
export declare function sendFileToTelegram(ctx: TelegramFileContext, filePath: string): Promise<ToolResult>;
export {};
