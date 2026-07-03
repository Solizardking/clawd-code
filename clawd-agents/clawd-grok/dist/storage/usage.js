import { getModelInfo } from "../grok/models";
import { getDatabase } from "./db";
export function recordUsageEvent(sessionId, source, model, usage, messageSeq) {
    if (!usage)
        return;
    const inputTokens = usage.inputTokens ?? 0;
    const outputTokens = usage.outputTokens ?? 0;
    const totalTokens = usage.totalTokens ?? inputTokens + outputTokens;
    if (inputTokens <= 0 && outputTokens <= 0 && totalTokens <= 0)
        return;
    const costMicros = estimateCostMicros(model, inputTokens, outputTokens);
    getDatabase()
        .prepare(`
    INSERT INTO usage_events (
      session_id, message_seq, source, model, input_tokens, output_tokens, total_tokens, cost_micros, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
        .run(sessionId, messageSeq ?? null, source, model, inputTokens, outputTokens, totalTokens, costMicros, new Date().toISOString());
}
export function getSessionTotalTokens(sessionId) {
    const row = getDatabase()
        .prepare(`
    SELECT COALESCE(SUM(total_tokens), 0) AS total_tokens
    FROM usage_events
    WHERE session_id = ?
  `)
        .get(sessionId);
    return row?.total_tokens ?? 0;
}
export function listSessionUsage(sessionId) {
    const rows = getDatabase()
        .prepare(`
    SELECT id, session_id, message_seq, source, model, input_tokens, output_tokens, total_tokens, cost_micros, created_at
    FROM usage_events
    WHERE session_id = ?
    ORDER BY id ASC
  `)
        .all(sessionId);
    return rows.map((row) => ({
        id: row.id,
        sessionId: row.session_id,
        messageSeq: row.message_seq,
        source: row.source,
        model: row.model,
        inputTokens: row.input_tokens,
        outputTokens: row.output_tokens,
        totalTokens: row.total_tokens,
        costMicros: row.cost_micros,
        createdAt: new Date(row.created_at),
    }));
}
function estimateCostMicros(model, inputTokens, outputTokens) {
    const info = getModelInfo(model);
    if (!info)
        return 0;
    return Math.round(inputTokens * info.inputPrice + outputTokens * info.outputPrice);
}
//# sourceMappingURL=usage.js.map