export type AnswerValue = string;
export type QuestionState = {
    selectedValue?: string | string[];
    textInputValue: string;
};
export type MultipleChoiceState = {
    currentQuestionIndex: number;
    answers: Record<string, AnswerValue>;
    questionStates: Record<string, QuestionState>;
    isInTextInput: boolean;
    nextQuestion: () => void;
    prevQuestion: () => void;
    updateQuestionState: (questionText: string, updates: Partial<QuestionState>, isMultiSelect: boolean) => void;
    setAnswer: (questionText: string, answer: string, shouldAdvance?: boolean) => void;
    setTextInputMode: (isInInput: boolean) => void;
};
export declare function useMultipleChoiceState(): MultipleChoiceState;
//# sourceMappingURL=use-multiple-choice-state.d.ts.map