/**
 * Clawd Code — Headless Output (JSONL)
 * Semantic JSONL events for `--format json` headless mode
 * (Adapted from clawd-grok/src/headless/output.ts)
 */
export type HeadlessOutputFormat = "text" | "json";
export interface ToolCall {
    id: string;
    name: string;
    args: Record<string, any>;
}
export interface ToolResult {
    ok: boolean;
    output: string;
    error?: string;
}
/** Semantic JSONL events for headless --format json (Clawd headless style) */
export type HeadlessJsonEvent = {
    type: "step_start";
    sessionID?: string;
    stepNumber: number;
    timestamp: number;
} | {
    type: "text";
    sessionID?: string;
    stepNumber: number;
    text: string;
    timestamp: number;
} | {
    type: "tool_use";
    sessionID?: string;
    stepNumber: number;
    timestamp: number;
    toolCall: ToolCall;
    toolResult: ToolResult;
    timing?: {
        startedAt?: number;
        finishedAt?: number;
        durationMs?: number;
    };
} | {
    type: "step_finish";
    sessionID?: string;
    stepNumber: number;
    timestamp: number;
    finishReason: string;
    usage: {
        inputTokens?: number;
        outputTokens?: number;
        totalTokens?: number;
        costUsdTicks?: number;
    };
} | {
    type: "error";
    sessionID?: string;
    timestamp: number;
    error: {
        category: string;
        code: string;
        message: string;
        retryable: boolean;
    };
} | {
    type: "session_start";
    sessionID: string;
    timestamp: number;
    mode: string;
    model: string;
} | {
    type: "session_finish";
    sessionID: string;
    timestamp: number;
    status: "success" | "error" | "aborted";
};
export declare class HeadlessWriter {
    private format;
    private sessionID?;
    private stepNumber;
    private buffer;
    constructor(format?: HeadlessOutputFormat, sessionID?: string);
    setSession(id: string): void;
    sessionStart(mode: string, model: string): void;
    sessionFinish(status?: "success" | "error" | "aborted"): void;
    stepStart(): number;
    text(text: string): void;
    toolUse(toolCall: ToolCall, toolResult: ToolResult, startedAt?: number, finishedAt?: number): void;
    stepFinish(finishReason?: string, usage?: {
        inputTokens?: number;
        outputTokens?: number;
        totalTokens?: number;
        costUsdTicks?: number;
    }): void;
    error(category: string, code: string, message: string, retryable?: boolean): void;
    private writeEvent;
}
//# sourceMappingURL=headless.d.ts.map