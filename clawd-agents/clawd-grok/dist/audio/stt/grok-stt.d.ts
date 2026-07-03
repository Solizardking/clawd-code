export declare const DEFAULT_STT_BASE_URL = "https://api.openai.com/v1";
export interface GrokSttEngineConfig {
    apiKey: string;
    baseURL?: string;
    language?: string;
}
export interface GrokSttTranscriptionInput {
    audioPath: string;
    fileName?: string;
    mimeType?: string;
}
export interface GrokSttWord {
    text: string;
    start: number;
    end: number;
    confidence?: number;
    speaker?: number;
}
export interface GrokSttTranscriptionResult {
    text: string;
    engine: "grok-stt";
    language: string;
    duration: number;
    words?: GrokSttWord[];
}
export declare class GrokSttEngine {
    private readonly config;
    constructor(config: GrokSttEngineConfig);
    transcribe(input: GrokSttTranscriptionInput): Promise<GrokSttTranscriptionResult>;
}
export declare function inferMimeTypeFromFileName(fileName: string): string;
