import type { Message } from '../../types/message.js';
import type { TranscriptShareResponse } from './TranscriptSharePrompt.js';
import type { FeedbackSurveyResponse, FeedbackSurveyType } from './utils.js';
export declare function useFeedbackSurvey(messages: Message[], isLoading: boolean, submitCount: number, surveyType?: FeedbackSurveyType, hasActivePrompt?: boolean): {
    state: 'closed' | 'open' | 'thanks' | 'transcript_prompt' | 'submitting' | 'submitted';
    lastResponse: FeedbackSurveyResponse | null;
    handleSelect: (selected: FeedbackSurveyResponse) => boolean;
    handleTranscriptSelect: (selected: TranscriptShareResponse) => void;
};
//# sourceMappingURL=useFeedbackSurvey.d.ts.map