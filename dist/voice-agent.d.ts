/**
 * Clawd Code — xAI Voice Agent Client
 *
 * Connects to xAI's Voice Agent API (wss://api.x.ai/v1/realtime) for
 * real-time bidirectional voice conversations with tool-calling support.
 *
 * Supports:
 *   - Text-mode conversation (no audio hardware needed)
 *   - Audio-mode via sox/ffmpeg system pipes (--audio flag)
 *   - Solana function tools: balance, price, positions, funding, send, trade
 *   - Session resumption across reconnects
 *   - Ephemeral token support for browser deployments
 *
 * Requires Node.js 22+ (native WebSocket global).
 *
 * Usage:
 *   clawd-code voice --agent                  # text REPL via Voice Agent
 *   clawd-code voice --agent --audio          # real-time audio via sox
 *   clawd-code voice --agent --model grok-voice-think-fast-1.0
 */
export interface VoiceAgentConfig {
    xaiApiKey: string;
    rpcUrl: string;
    model?: string;
    voice?: 'eve' | 'ara' | 'rex' | 'sal' | 'leo';
    liveTrading?: boolean;
    verbose?: boolean;
}
export declare class VoiceAgentClient {
    private readonly config;
    private ws;
    private pendingFunctionCalls;
    constructor(config: VoiceAgentConfig);
    private get model();
    private get voice();
    private checkNodeVersion;
    private send;
    private configureSession;
    private handleServerEvent;
    /** Run in text-mode REPL — no audio hardware needed */
    runText(): Promise<void>;
    /** Ephemeral token helper — fetch a short-lived token from xAI */
    static fetchEphemeralToken(apiKey: string, expiresAfterSeconds?: number): Promise<string>;
}
//# sourceMappingURL=voice-agent.d.ts.map