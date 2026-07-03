export function isHeadlessOutputFormat(value) {
    return value === "text" || value === "json";
}
export function renderHeadlessPrelude(format, sessionId) {
    if (format === "json") {
        return {};
    }
    return {
        stdout: "\x1b[36m⏳ Processing...\x1b[0m\n",
        stderr: sessionId ? `\x1b[2mSession: ${sessionId}\x1b[0m\n` : undefined,
    };
}
/**
 * Headless text output only. JSON streaming uses {@link createHeadlessJsonlEmitter} + `Agent.processMessage` observer.
 */
export function renderHeadlessChunk(chunk) {
    switch (chunk.type) {
        case "content":
            return chunk.content ? { stdout: chunk.content } : {};
        case "tool_calls":
            return chunk.toolCalls?.length
                ? {
                    stderr: chunk.toolCalls.map((tc) => `\x1b[33m▸ ${formatToolCallLabel(tc)}\x1b[0m\n`).join(""),
                }
                : {};
        case "tool_result": {
            if (!chunk.toolResult) {
                return {};
            }
            const icon = chunk.toolResult.success ? "▸" : "✗";
            const color = chunk.toolResult.success ? "\x1b[32m" : "\x1b[31m";
            const label = chunk.toolCall ? formatToolCallLabel(chunk.toolCall) : "tool";
            const mediaLines = chunk.toolResult.media?.map((asset) => {
                const suffix = asset.url ? ` (${asset.url})` : "";
                return `  ${asset.path}${suffix}`;
            }) ?? [];
            const stderr = [`${color}${icon} ${label}\x1b[0m`, ...mediaLines].join("\n");
            return { stderr: `${stderr}\n` };
        }
        case "error":
            return chunk.content ? { stderr: `\x1b[31m${chunk.content}\x1b[0m\n` } : {};
        case "done":
            return { stdout: "\n" };
        case "reasoning":
            return {};
        default:
            return {};
    }
}
function truncate(text, max) {
    return text.length <= max ? text : `${text.slice(0, max - 1)}…`;
}
function formatToolCallLabel(tc) {
    const name = tc.function.name;
    try {
        const args = JSON.parse(tc.function.arguments || "{}");
        if (name === "bash" && typeof args.command === "string") {
            const cmd = args.command.replace(/\n/g, " ").trim();
            return `bash: ${truncate(cmd, 80)}`;
        }
        if (name === "task" && typeof args.agent === "string") {
            const desc = typeof args.description === "string" ? ` — ${args.description}` : "";
            return `task: ${args.agent}${truncate(desc, 60)}`;
        }
        if (name === "read_file" && typeof args.path === "string") {
            return `read: ${args.path}`;
        }
        if ((name === "write_file" || name === "edit_file") && typeof args.path === "string") {
            return `${name === "write_file" ? "write" : "edit"}: ${args.path}`;
        }
    }
    catch { }
    return name;
}
function jsonLine(event) {
    return `${JSON.stringify(event)}\n`;
}
/**
 * Buffers assistant `content` per step and emits JSONL: step_start, text, tool_use, step_finish, error.
 * Pair with `agent.processMessage(prompt, emitter.observer)` in headless JSON mode only.
 *
 * @param sessionId Agent session id (from {@link Agent.getSessionId}) — included on each JSONL line when set.
 */
export function createHeadlessJsonlEmitter(sessionId) {
    let pending = "";
    let currentStep = 0;
    let textBuffer = "";
    /** Tool call id → timing from {@link ProcessMessageObserver.onToolStart} / {@link ProcessMessageObserver.onToolFinish}. */
    const toolTiming = new Map();
    function withSession(event) {
        return sessionId ? { ...event, sessionID: sessionId } : event;
    }
    const observer = {
        onStepStart(info) {
            currentStep = info.stepNumber;
            textBuffer = "";
            pending += jsonLine(withSession({
                type: "step_start",
                stepNumber: info.stepNumber,
                timestamp: info.timestamp,
            }));
        },
        onStepFinish(info) {
            if (textBuffer.length > 0) {
                pending += jsonLine(withSession({
                    type: "text",
                    stepNumber: info.stepNumber,
                    text: textBuffer,
                    timestamp: Date.now(),
                }));
                textBuffer = "";
            }
            pending += jsonLine(withSession({
                type: "step_finish",
                stepNumber: info.stepNumber,
                timestamp: info.timestamp,
                finishReason: info.finishReason,
                usage: info.usage,
            }));
        },
        onToolStart(info) {
            const prev = toolTiming.get(info.toolCall.id) ?? {};
            toolTiming.set(info.toolCall.id, { ...prev, startedAt: info.timestamp });
        },
        onToolFinish(info) {
            const prev = toolTiming.get(info.toolCall.id) ?? {};
            toolTiming.set(info.toolCall.id, { ...prev, finishedAt: info.timestamp });
        },
    };
    function drainPending() {
        const out = pending;
        pending = "";
        return out;
    }
    function flush() {
        const stdout = drainPending();
        return stdout ? { stdout } : {};
    }
    function consumeChunk(chunk) {
        let stdout = drainPending();
        switch (chunk.type) {
            case "content":
                textBuffer += chunk.content ?? "";
                break;
            case "tool_calls": {
                if (textBuffer.length > 0) {
                    stdout += jsonLine(withSession({
                        type: "text",
                        stepNumber: currentStep,
                        text: textBuffer,
                        timestamp: Date.now(),
                    }));
                    textBuffer = "";
                }
                break;
            }
            case "tool_result": {
                if (chunk.toolCall && chunk.toolResult) {
                    const id = chunk.toolCall.id;
                    const timingEntry = toolTiming.get(id);
                    toolTiming.delete(id);
                    let timing;
                    if (timingEntry) {
                        const startedAt = timingEntry.startedAt;
                        const finishedAt = timingEntry.finishedAt;
                        if (startedAt !== undefined || finishedAt !== undefined) {
                            timing = {};
                            if (startedAt !== undefined)
                                timing.startedAt = startedAt;
                            if (finishedAt !== undefined)
                                timing.finishedAt = finishedAt;
                            if (startedAt !== undefined && finishedAt !== undefined) {
                                timing.durationMs = finishedAt - startedAt;
                            }
                        }
                    }
                    const eventTime = timingEntry?.finishedAt ?? timingEntry?.startedAt ?? Date.now();
                    stdout += jsonLine(withSession({
                        type: "tool_use",
                        stepNumber: currentStep,
                        timestamp: eventTime,
                        toolCall: chunk.toolCall,
                        toolResult: chunk.toolResult,
                        ...(timing ? { timing } : {}),
                    }));
                }
                break;
            }
            case "error":
                stdout += jsonLine(withSession({
                    type: "error",
                    message: chunk.content ?? "",
                    timestamp: Date.now(),
                }));
                break;
            case "reasoning":
            case "done":
                break;
            default:
                break;
        }
        return stdout ? { stdout } : {};
    }
    return { observer, consumeChunk, flush };
}
//# sourceMappingURL=output.js.map