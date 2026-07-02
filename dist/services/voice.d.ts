export declare function _resetArecordProbeForTesting(): void;
export declare function _resetAlsaCardsForTesting(): void;
export declare function checkVoiceDependencies(): Promise<{
    available: boolean;
    missing: string[];
    installCommand: string | null;
}>;
export type RecordingAvailability = {
    available: boolean;
    reason: string | null;
};
export declare function requestMicrophonePermission(): Promise<boolean>;
export declare function checkRecordingAvailability(): Promise<RecordingAvailability>;
export declare function startRecording(onData: (chunk: Buffer) => void, onEnd: () => void, options?: {
    silenceDetection?: boolean;
}): Promise<boolean>;
export declare function stopRecording(): void;
//# sourceMappingURL=voice.d.ts.map