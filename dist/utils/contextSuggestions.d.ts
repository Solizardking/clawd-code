import type { ContextData } from './analyzeContext.js';
export type SuggestionSeverity = 'info' | 'warning';
export type ContextSuggestion = {
    severity: SuggestionSeverity;
    title: string;
    detail: string;
    /** Estimated tokens that could be saved */
    savingsTokens?: number;
};
export declare function generateContextSuggestions(data: ContextData): ContextSuggestion[];
//# sourceMappingURL=contextSuggestions.d.ts.map