/**
 * Clawd Code — Headless Output (JSONL)
 * Semantic JSONL events for `--format json` headless mode
 * (Adapted from clawd-grok/src/headless/output.ts)
 */
export class HeadlessWriter {
    format;
    sessionID;
    stepNumber = 0;
    buffer = '';
    constructor(format = "text", sessionID) {
        this.format = format;
        this.sessionID = sessionID;
    }
    setSession(id) {
        this.sessionID = id;
    }
    sessionStart(mode, model) {
        if (this.format !== "json")
            return;
        const event = {
            type: "session_start",
            sessionID: this.sessionID || "default",
            timestamp: Date.now(),
            mode,
            model,
        };
        this.writeEvent(event);
    }
    sessionFinish(status = "success") {
        if (this.format !== "json")
            return;
        const event = {
            type: "session_finish",
            sessionID: this.sessionID || "default",
            timestamp: Date.now(),
            status,
        };
        this.writeEvent(event);
    }
    stepStart() {
        this.stepNumber++;
        if (this.format === "json") {
            this.writeEvent({
                type: "step_start",
                sessionID: this.sessionID,
                stepNumber: this.stepNumber,
                timestamp: Date.now(),
            });
        }
        return this.stepNumber;
    }
    text(text) {
        if (this.format === "text") {
            process.stdout.write(text);
        }
        else {
            this.writeEvent({
                type: "text",
                sessionID: this.sessionID,
                stepNumber: this.stepNumber,
                text,
                timestamp: Date.now(),
            });
        }
    }
    toolUse(toolCall, toolResult, startedAt, finishedAt) {
        if (this.format === "text") {
            console.log(`\n[TOOL] ${toolCall.name}(${JSON.stringify(toolCall.args)})`);
            console.log(`[RESULT] ${toolResult.ok ? 'OK' : 'FAIL'}: ${toolResult.output.slice(0, 200)}`);
        }
        else {
            const timing = (startedAt && finishedAt) ? {
                startedAt,
                finishedAt,
                durationMs: finishedAt - startedAt,
            } : undefined;
            this.writeEvent({
                type: "tool_use",
                sessionID: this.sessionID,
                stepNumber: this.stepNumber,
                timestamp: Date.now(),
                toolCall,
                toolResult,
                timing,
            });
        }
    }
    stepFinish(finishReason = "stop", usage = {}) {
        if (this.format === "json") {
            this.writeEvent({
                type: "step_finish",
                sessionID: this.sessionID,
                stepNumber: this.stepNumber,
                timestamp: Date.now(),
                finishReason,
                usage,
            });
        }
    }
    error(category, code, message, retryable = false) {
        if (this.format === "text") {
            console.error(`[ERROR] ${category}/${code}: ${message}`);
        }
        else {
            this.writeEvent({
                type: "error",
                sessionID: this.sessionID,
                timestamp: Date.now(),
                error: { category, code, message, retryable },
            });
        }
    }
    writeEvent(event) {
        process.stdout.write(JSON.stringify(event) + "\n");
    }
}
//# sourceMappingURL=headless.js.map