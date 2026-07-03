import type { ModelMessage } from "ai";
export interface PersistedCompaction {
    firstKeptSeq: number;
    summary: string;
    tokensBefore: number;
    createdAt: Date;
}
export interface LoadedTranscriptState {
    messages: ModelMessage[];
    seqs: Array<number | null>;
    timestamps: Date[];
    compaction: PersistedCompaction | null;
}
export declare function buildEffectiveTranscript(messages: ModelMessage[], seqs: number[], timestamps: Date[], compaction: PersistedCompaction | null): LoadedTranscriptState;
