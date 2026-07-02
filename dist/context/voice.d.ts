export type VoiceState = {
    voiceState: 'idle' | 'recording' | 'processing';
    voiceError: string | null;
    voiceInterimTranscript: string;
    voiceAudioLevels: number[];
    voiceWarmingUp: boolean;
};
export declare function VoiceProvider(t0: any): any;
/**
 * Subscribe to a slice of voice state. Only re-renders when the selected
 * value changes (compared via Object.is).
 */
export declare function useVoiceState(selector: any): any;
/**
 * Get the voice state setter. Stable reference — never causes re-renders.
 * store.setState is synchronous: callers can read getVoiceState() immediately
 * after to observe the new value (VoiceKeybindingHandler relies on this).
 */
export declare function useSetVoiceState(): any;
/**
 * Get a synchronous reader for fresh state inside callbacks. Unlike
 * useVoiceState (which subscribes), this doesn't cause re-renders — use
 * inside event handlers that need to read state set earlier in the same tick.
 */
export declare function useGetVoiceState(): any;
//# sourceMappingURL=voice.d.ts.map