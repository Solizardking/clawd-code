import { type Command } from '../commands.js';
import type { SuggestionItem, SuggestionType } from '../components/PromptInput/PromptInputFooterSuggestions.js';
import { KeyboardEvent } from '../ink/events/keyboard-event.js';
import type { AgentDefinition } from '../tools/AgentTool/loadAgentsDir.js';
import type { InlineGhostText, PromptInputMode } from '../types/textInputTypes.js';
import { type ShellCompletionType } from '../utils/bash/shellCompletion.js';
type Props = {
    onInputChange: (value: string) => void;
    onSubmit: (value: string, isSubmittingSlashCommand?: boolean) => void;
    setCursorOffset: (offset: number) => void;
    input: string;
    cursorOffset: number;
    commands: Command[];
    mode: string;
    agents: AgentDefinition[];
    setSuggestionsState: (f: (previousSuggestionsState: {
        suggestions: SuggestionItem[];
        selectedSuggestion: number;
        commandArgumentHint?: string;
    }) => {
        suggestions: SuggestionItem[];
        selectedSuggestion: number;
        commandArgumentHint?: string;
    }) => void;
    suggestionsState: {
        suggestions: SuggestionItem[];
        selectedSuggestion: number;
        commandArgumentHint?: string;
    };
    suppressSuggestions?: boolean;
    markAccepted: () => void;
    onModeChange?: (mode: PromptInputMode) => void;
};
type UseTypeaheadResult = {
    suggestions: SuggestionItem[];
    selectedSuggestion: number;
    suggestionType: SuggestionType;
    maxColumnWidth?: number;
    commandArgumentHint?: string;
    inlineGhostText?: InlineGhostText;
    handleKeyDown: (e: KeyboardEvent) => void;
};
/**
 * Extract search token from a completion token by removing @ prefix and quotes
 * @param completionToken The completion token
 * @returns The search token with @ and quotes removed
 */
export declare function extractSearchToken(completionToken: {
    token: string;
    isQuoted?: boolean;
}): string;
/**
 * Format a replacement value with proper @ prefix and quotes based on context
 * @param options Configuration for formatting
 * @param options.displayText The text to display
 * @param options.mode The current mode (bash or prompt)
 * @param options.hasAtPrefix Whether the original token has @ prefix
 * @param options.needsQuotes Whether the text needs quotes (contains spaces)
 * @param options.isQuoted Whether the original token was already quoted (user typed @"...)
 * @param options.isComplete Whether this is a complete suggestion (adds trailing space)
 * @returns The formatted replacement value
 */
export declare function formatReplacementValue(options: {
    displayText: string;
    mode: string;
    hasAtPrefix: boolean;
    needsQuotes: boolean;
    isQuoted?: boolean;
    isComplete: boolean;
}): string;
/**
 * Apply a shell completion suggestion by replacing the current word
 */
export declare function applyShellSuggestion(suggestion: SuggestionItem, input: string, cursorOffset: number, onInputChange: (value: string) => void, setCursorOffset: (offset: number) => void, completionType: ShellCompletionType | undefined): void;
/**
 * Apply a directory/path completion suggestion to the input
 * Always adds @ prefix since we're replacing the entire token (including any existing @)
 *
 * @param input The current input text
 * @param suggestionId The ID of the suggestion to apply
 * @param tokenStartPos The start position of the token being replaced
 * @param tokenLength The length of the token being replaced
 * @param isDirectory Whether the suggestion is a directory (adds / suffix) or file (adds space)
 * @returns Object with the new input text and cursor position
 */
export declare function applyDirectorySuggestion(input: string, suggestionId: string, tokenStartPos: number, tokenLength: number, isDirectory: boolean): {
    newInput: string;
    cursorPos: number;
};
/**
 * Extract a completable token at the cursor position
 * @param text The input text
 * @param cursorPos The cursor position
 * @param includeAtSymbol Whether to consider @ symbol as part of the token
 * @returns The completable token and its start position, or null if not found
 */
export declare function extractCompletionToken(text: string, cursorPos: number, includeAtSymbol?: boolean): {
    token: string;
    startPos: number;
    isQuoted?: boolean;
} | null;
/**
 * Hook for handling typeahead functionality for both commands and file paths
 */
export declare function useTypeahead({ commands, onInputChange, onSubmit, setCursorOffset, input, cursorOffset, mode, agents, setSuggestionsState, suggestionsState: { suggestions, selectedSuggestion, commandArgumentHint }, suppressSuggestions, markAccepted, onModeChange }: Props): UseTypeaheadResult;
export {};
//# sourceMappingURL=useTypeahead.d.ts.map