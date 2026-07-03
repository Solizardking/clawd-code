import { createCompactionSummaryMessage } from "../agent/compaction";
export function buildEffectiveTranscript(messages, seqs, timestamps, compaction) {
    if (!compaction) {
        return {
            messages: [...messages],
            seqs: [...seqs],
            timestamps: [...timestamps],
            compaction: null,
        };
    }
    const firstKeptIndex = seqs.findIndex((seq) => seq >= compaction.firstKeptSeq);
    const keptIndex = firstKeptIndex >= 0 ? firstKeptIndex : messages.length;
    const keptMessages = messages.slice(keptIndex);
    const keptSeqs = seqs.slice(keptIndex);
    const keptTimestamps = timestamps.slice(keptIndex);
    return {
        messages: [createCompactionSummaryMessage(compaction.summary), ...keptMessages],
        seqs: [null, ...keptSeqs],
        timestamps: [compaction.createdAt, ...keptTimestamps],
        compaction,
    };
}
//# sourceMappingURL=transcript-view.js.map