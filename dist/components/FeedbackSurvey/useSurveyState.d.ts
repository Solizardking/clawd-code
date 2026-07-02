import type { TranscriptShareResponse } from './TranscriptSharePrompt.js';
import type { FeedbackSurveyResponse } from './utils.js';
type SurveyState = 'closed' | 'open' | 'thanks' | 'transcript_prompt' | 'submitting' | 'submitted';
type UseSurveyStateOptions = {
    hideThanksAfterMs: number;
    onOpen: (appearanceId: string) => void | Promise<void>;
    onSelect: (appearanceId: string, selected: FeedbackSurveyResponse) => void | Promise<void>;
    shouldShowTranscriptPrompt?: (selected: FeedbackSurveyResponse) => boolean;
    onTranscriptPromptShown?: (appearanceId: string, surveyResponse: FeedbackSurveyResponse) => void;
    onTranscriptSelect?: (appearanceId: string, selected: TranscriptShareResponse, surveyResponse: FeedbackSurveyResponse | null) => boolean | Promise<boolean>;
};
export declare function useSurveyState({ hideThanksAfterMs, onOpen, onSelect, shouldShowTranscriptPrompt, onTranscriptPromptShown, onTranscriptSelect }: UseSurveyStateOptions): {
    state: SurveyState;
    lastResponse: FeedbackSurveyResponse | null;
    open: () => void;
    handleSelect: (selected: FeedbackSurveyResponse) => boolean;
    handleTranscriptSelect: (selected: TranscriptShareResponse) => void;
};
export {};
//# sourceMappingURL=useSurveyState.d.ts.map