export declare function normalizeLanguageForSTT(language: string | undefined): {
    code: string;
    fellBackFrom?: string;
};
type VoiceState = 'idle' | 'recording' | 'processing';
type UseVoiceOptions = {
    onTranscript: (text: string) => void;
    onError?: (message: string) => void;
    enabled: boolean;
    focusMode: boolean;
};
type UseVoiceReturn = {
    state: VoiceState;
    handleKeyEvent: (fallbackMs?: number) => void;
};
export declare const FIRST_PRESS_FALLBACK_MS = 2000;
export declare function computeLevel(chunk: Buffer): number;
export declare function useVoice({ onTranscript, onError, enabled, focusMode, }: UseVoiceOptions): UseVoiceReturn;
export {};
//# sourceMappingURL=useVoice.d.ts.map