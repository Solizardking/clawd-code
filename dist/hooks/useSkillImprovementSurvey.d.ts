import type { FeedbackSurveyResponse } from '../components/FeedbackSurvey/utils.js';
import type { Message } from '../types/message.js';
import type { SkillUpdate } from '../utils/hooks/skillImprovement.js';
type SkillImprovementSuggestion = {
    skillName: string;
    updates: SkillUpdate[];
};
type SetMessages = (fn: (prev: Message[]) => Message[]) => void;
export declare function useSkillImprovementSurvey(setMessages: SetMessages): {
    isOpen: boolean;
    suggestion: SkillImprovementSuggestion | null;
    handleSelect: (selected: FeedbackSurveyResponse) => void;
};
export {};
//# sourceMappingURL=useSkillImprovementSurvey.d.ts.map