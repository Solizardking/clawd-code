import type { ProcessMessageObserver } from "../agent/agent";
import type { StreamChunk, ToolCall, ToolResult } from "../types";
export type HeadlessOutputFormat = "text" | "json";
export interface HeadlessWrites {
    stdout?: string;
    stderr?: string;
}
/** Semantic JSONL events for headless `--format json` (OpenCode-style). */
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
    /** Present when `onToolStart` / `onToolFinish` observer hooks ran for this tool call. */
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
    message: string;
    timestamp: number;
};
export declare function isHeadlessOutputFormat(value: string): value is HeadlessOutputFormat;
export declare function renderHeadlessPrelude(format: HeadlessOutputFormat, sessionId?: string): HeadlessWrites;
/**
 * Headless text output only. JSON streaming uses {@link createHeadlessJsonlEmitter} + `Agent.processMessage` observer.
 */
export declare function renderHeadlessChunk(chunk: StreamChunk): HeadlessWrites;
/**
 * Buffers assistant `content` per step and emits JSONL: step_start, text, tool_use, step_finish, error.
 * Pair with `agent.processMessage(prompt, emitter.observer)` in headless JSON mode only.
 *
 * @param sessionId Agent session id (from {@link Agent.getSessionId}) — included on each JSONL line when set.
 */
export declare function createHeadlessJsonlEmitter(sessionId?: string): {
    observer: ProcessMessageObserver;
    consumeChunk(chunk: StreamChunk): HeadlessWrites;
    /** Call after the `processMessage` iterator completes to flush any trailing observer output. */
    flush(): HeadlessWrites;
};
