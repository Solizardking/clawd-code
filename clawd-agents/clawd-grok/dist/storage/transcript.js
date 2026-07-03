import { getCompactionSummaryText } from "../agent/compaction";
import { getDatabase, withTransaction } from "./db";
import { extractToolResultFromOutput, getOutputKind, isOutputSuccess } from "./tool-results";
import { buildEffectiveTranscript } from "./transcript-view";
function loadMessageRows(sessionId) {
    return getDatabase()
        .prepare(`
    SELECT session_id, seq, role, message_json, created_at
    FROM messages
    WHERE session_id = ?
    ORDER BY seq ASC
  `)
        .all(sessionId);
}
function toPersistedCompaction(row) {
    if (!row)
        return null;
    return {
        firstKeptSeq: row.first_kept_seq,
        summary: row.summary,
        tokensBefore: row.tokens_before,
        createdAt: new Date(row.created_at),
    };
}
export function loadLatestCompaction(sessionId) {
    const row = getDatabase()
        .prepare(`
    SELECT session_id, first_kept_seq, summary, tokens_before, created_at
    FROM compactions
    WHERE session_id = ?
    ORDER BY id DESC
    LIMIT 1
  `)
        .get(sessionId);
    return toPersistedCompaction(row);
}
function buildEffectiveMessageRecords(sessionId) {
    const rows = loadMessageRows(sessionId);
    const messages = rows.map((row) => JSON.parse(row.message_json));
    const seqs = rows.map((row) => row.seq);
    const timestamps = rows.map((row) => new Date(row.created_at));
    const transcript = buildEffectiveTranscript(messages, seqs, timestamps, loadLatestCompaction(sessionId));
    return transcript.messages.map((message, index) => ({
        message,
        seq: transcript.seqs[index],
        timestamp: transcript.timestamps[index],
    }));
}
export function loadRawTranscript(sessionId) {
    return loadMessageRows(sessionId).map((row) => JSON.parse(row.message_json));
}
export function loadTranscriptState(sessionId) {
    const rows = loadMessageRows(sessionId);
    return buildEffectiveTranscript(rows.map((row) => JSON.parse(row.message_json)), rows.map((row) => row.seq), rows.map((row) => new Date(row.created_at)), loadLatestCompaction(sessionId));
}
export function loadTranscript(sessionId) {
    return loadTranscriptState(sessionId).messages;
}
export function getNextMessageSequence(sessionId) {
    return getNextSequence(getDatabase(), sessionId);
}
export function appendMessages(sessionId, messages) {
    if (messages.length === 0)
        return [];
    const insertedSeqs = [];
    withTransaction((db) => {
        const nextSeq = getNextSequence(db, sessionId);
        const insertMessage = db.prepare(`
      INSERT INTO messages (session_id, seq, role, message_json, created_at)
      VALUES (?, ?, ?, ?, ?)
    `);
        const insertToolCall = db.prepare(`
      INSERT OR IGNORE INTO tool_calls (
        session_id, message_seq, tool_call_id, tool_name, args_json, status, started_at, completed_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
        const updateToolCall = db.prepare(`
      UPDATE tool_calls
      SET tool_name = ?, args_json = ?, status = ?, completed_at = ?
      WHERE session_id = ? AND tool_call_id = ?
    `);
        const selectToolCall = db.prepare(`
      SELECT id, tool_call_id, tool_name, args_json
      FROM tool_calls
      WHERE session_id = ? AND tool_call_id = ?
    `);
        const insertToolResult = db.prepare(`
      INSERT INTO tool_results (tool_call_row_id, output_kind, output_json, success, created_at)
      VALUES (?, ?, ?, ?, ?)
    `);
        const updateSession = db.prepare(`
      UPDATE sessions
      SET updated_at = ?
      WHERE id = ?
    `);
        messages.forEach((message, index) => {
            const seq = nextSeq + index;
            const createdAt = new Date().toISOString();
            insertedSeqs.push(seq);
            insertMessage.run(sessionId, seq, message.role, JSON.stringify(message), createdAt);
            if (message.role === "assistant" && Array.isArray(message.content)) {
                for (const part of message.content) {
                    if (part.type !== "tool-call")
                        continue;
                    insertToolCall.run(sessionId, seq, part.toolCallId, part.toolName, JSON.stringify(part.input ?? {}), "completed", createdAt, createdAt);
                    updateToolCall.run(part.toolName, JSON.stringify(part.input ?? {}), "completed", createdAt, sessionId, part.toolCallId);
                }
            }
            if (message.role === "tool" && Array.isArray(message.content)) {
                for (const part of message.content) {
                    if (part.type !== "tool-result")
                        continue;
                    let toolCall = selectToolCall.get(sessionId, part.toolCallId);
                    if (!toolCall) {
                        insertToolCall.run(sessionId, seq, part.toolCallId, part.toolName, "{}", "completed", createdAt, createdAt);
                        toolCall = selectToolCall.get(sessionId, part.toolCallId);
                    }
                    if (!toolCall)
                        continue;
                    const extracted = extractToolResultFromOutput(part.output);
                    insertToolResult.run(toolCall.id, getOutputKind(part.output), JSON.stringify(extracted ?? part.output), extracted ? Number(extracted.success) : Number(isOutputSuccess(part.output)), createdAt);
                }
            }
        });
        updateSession.run(new Date().toISOString(), sessionId);
    });
    return insertedSeqs;
}
export function appendSystemMessage(sessionId, content) {
    return appendMessages(sessionId, [{ role: "system", content }])[0] ?? null;
}
export function appendCompaction(sessionId, firstKeptSeq, summary, tokensBefore) {
    withTransaction((db) => {
        db.prepare(`
      INSERT INTO compactions (session_id, first_kept_seq, summary, tokens_before, created_at)
      VALUES (?, ?, ?, ?, ?)
    `).run(sessionId, firstKeptSeq, summary, tokensBefore, new Date().toISOString());
        db.prepare(`
      UPDATE sessions
      SET updated_at = ?
      WHERE id = ?
    `).run(new Date().toISOString(), sessionId);
    });
}
export function buildChatEntries(sessionId) {
    const toolResults = loadStoredToolResults(sessionId);
    const callMap = new Map();
    const entries = [];
    for (const row of buildEffectiveMessageRecords(sessionId)) {
        const { message, timestamp } = row;
        if (message.role === "user") {
            const content = renderUserContent(message.content);
            if (content) {
                entries.push({ type: "user", content, timestamp });
            }
            continue;
        }
        if (message.role === "system") {
            const content = getCompactionSummaryText(message) ?? (typeof message.content === "string" ? message.content.trim() : "");
            if (content) {
                entries.push({ type: "assistant", content, timestamp });
            }
            continue;
        }
        if (message.role === "assistant") {
            const text = renderAssistantContent(message.content, callMap);
            if (text) {
                entries.push({ type: "assistant", content: text, timestamp });
            }
            continue;
        }
        if (message.role === "tool" && Array.isArray(message.content)) {
            for (const part of message.content) {
                if (part.type !== "tool-result")
                    continue;
                const toolCall = callMap.get(part.toolCallId) ?? toFallbackToolCall(part.toolCallId, part.toolName);
                const toolResult = toolResults.get(part.toolCallId) ??
                    extractToolResultFromOutput(part.output) ?? {
                    success: isOutputSuccess(part.output),
                    output: JSON.stringify(part.output),
                };
                entries.push({
                    type: "tool_result",
                    content: toolResult.success ? toolResult.output || "Success" : toolResult.error || "Error",
                    timestamp,
                    toolCall,
                    toolResult,
                });
            }
        }
    }
    return entries;
}
function getNextSequence(db, sessionId) {
    const row = db
        .prepare(`
    SELECT COALESCE(MAX(seq), 0) AS max_seq
    FROM messages
    WHERE session_id = ?
  `)
        .get(sessionId);
    return (row?.max_seq ?? 0) + 1;
}
function renderUserContent(content) {
    if (typeof content === "string")
        return content.trim();
    if (!Array.isArray(content))
        return "";
    return content
        .map((part) => {
        if (part.type === "text")
            return part.text;
        if (part.type === "image")
            return "[Image]";
        if (part.type === "file")
            return part.filename ? `[File: ${part.filename}]` : "[File]";
        return "";
    })
        .filter(Boolean)
        .join("\n")
        .trim();
}
function renderAssistantContent(content, callMap) {
    if (typeof content === "string")
        return content.trim();
    if (!Array.isArray(content))
        return "";
    const textParts = [];
    for (const part of content) {
        if (part.type === "text") {
            textParts.push(part.text);
            continue;
        }
        if (part.type === "tool-call") {
            callMap.set(part.toolCallId, {
                id: part.toolCallId,
                type: "function",
                function: {
                    name: part.toolName,
                    arguments: JSON.stringify(part.input ?? {}),
                },
            });
        }
    }
    return textParts.join("").trim();
}
function loadStoredToolResults(sessionId) {
    const rows = getDatabase()
        .prepare(`
    SELECT tc.tool_call_id, tr.output_json
    FROM tool_results tr
    JOIN tool_calls tc ON tc.id = tr.tool_call_row_id
    WHERE tc.session_id = ?
    ORDER BY tr.id ASC
  `)
        .all(sessionId);
    return new Map(rows.map((row) => [row.tool_call_id, JSON.parse(row.output_json)]));
}
function toFallbackToolCall(toolCallId, toolName) {
    return {
        id: toolCallId,
        type: "function",
        function: {
            name: toolName,
            arguments: "{}",
        },
    };
}
//# sourceMappingURL=transcript.js.map