import type { TelegramSettings } from "../utils/settings";
export interface TelegramAudioSource {
    kind: "voice" | "audio";
    fileId: string;
    fileName?: string;
    mimeType?: string;
}
export interface TelegramFileApi {
    getFile(fileId: string): Promise<{
        file_path?: string;
    }>;
}
export interface TelegramAudioTranscription {
    promptText: string;
    userContent: string;
}
export declare function getTelegramAudioSource(message: {
    voice?: {
        file_id: string;
        mime_type?: string;
    };
    audio?: {
        file_id: string;
        file_name?: string;
        mime_type?: string;
    };
}): TelegramAudioSource | null;
export declare function formatTelegramAudioTranscript(kind: TelegramAudioSource["kind"], transcript: string): string;
export declare function transcribeTelegramAudioMessage(opts: {
    api: TelegramFileApi;
    token: string;
    source: TelegramAudioSource;
    telegramSettings: TelegramSettings | undefined;
}): Promise<TelegramAudioTranscription>;
export declare function buildTelegramAudioFileName(source: TelegramAudioSource, extension: string): string;
