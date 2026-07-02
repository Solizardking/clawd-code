import type { Message } from '../../types/message.js';
type TranscriptShareResult = {
    success: boolean;
    transcriptId?: string;
};
export type TranscriptShareTrigger = 'bad_feedback_survey' | 'good_feedback_survey' | 'frustration' | 'memory_survey';
export declare function submitTranscriptShare(messages: Message[], trigger: TranscriptShareTrigger, appearanceId: string): Promise<TranscriptShareResult>;
export {};
//# sourceMappingURL=submitTranscriptShare.d.ts.map