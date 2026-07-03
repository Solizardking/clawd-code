import type { TelegramSettings } from "../../utils/settings";
import { type GrokSttTranscriptionResult } from "./grok-stt";
export interface AudioTranscriptionInput {
    audioPath: string;
    fileName?: string;
    mimeType?: string;
}
export type AudioTranscriptionResult = GrokSttTranscriptionResult;
export interface AudioTranscriptionEngine {
    transcribe(input: AudioTranscriptionInput): Promise<AudioTranscriptionResult>;
}
export declare function createTelegramAudioInputEngine(telegramSettings: TelegramSettings | undefined): AudioTranscriptionEngine;
