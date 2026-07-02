/**
 * Clawd Code — VOICE MODE
 *
 * Two sub-modes:
 *   TTS mode (default)  — Local sherpa-onnx or sag CLI text-to-speech
 *   Agent mode (--agent) — xAI Voice Agent API (grok-voice-think-fast-1.0)
 *                          Real-time Solana tools: balance, price, trade, send
 *
 * Usage:
 *   clawd-code voice "Hello from Clawd"             # TTS
 *   clawd-code voice --agent                         # xAI Voice Agent REPL
 *   clawd-code voice --agent --voice ara             # choose voice
 *   clawd-code voice --agent --model grok-voice-think-fast-1.0
 */
interface VoiceConfig {
    xaiApiKey?: string;
    rpcUrl?: string;
    liveTrading?: boolean;
    model?: string;
}
export declare class VoiceMode {
    private config;
    constructor(config: VoiceConfig);
    run(args: string[]): Promise<void>;
    private runVoiceAgent;
    private runTTS;
    private generateLocalTTS;
    private generateSagTTS;
}
export {};
//# sourceMappingURL=voice.d.ts.map