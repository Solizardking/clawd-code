import type { Message } from '../../types/message.js';
import type { TranscriptShareResponse } from './TranscriptSharePrompt.js';
import type { FeedbackSurveyResponse } from './utils.js';
export declare function useMemorySurvey(messages: Message[], isLoading: boolean, hasActivePrompt?: boolean, { enabled }?: {
    enabled?: boolean;
}): {
    state: 'closed' | 'open' | 'thanks' | 'transcript_prompt' | 'submitting' | 'submitted';
    lastResponse: FeedbackSurveyResponse | null;
    handleSelect: (selected: FeedbackSurveyResponse) => void;
    handleTranscriptSelect: (selected: TranscriptShareResponse) => void;
};
//# sourceMappingURL=useMemorySurvey.d.ts.map