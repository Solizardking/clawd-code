type Props = {
    inputValue: string;
    isAssistantResponding: boolean;
};
export declare function usePromptSuggestion({ inputValue, isAssistantResponding, }: Props): {
    suggestion: string | null;
    markAccepted: () => void;
    markShown: () => void;
    logOutcomeAtSubmission: (finalInput: string, opts?: {
        skipReset: boolean;
    }) => void;
};
export {};
//# sourceMappingURL=usePromptSuggestion.d.ts.map