import type { SuggestionItem } from 'src/components/PromptInput/PromptInputFooterSuggestions.js';
export type ShellCompletionType = 'command' | 'variable' | 'file';
/**
 * Get shell completions for the given input
 * Supports bash and zsh shells (matches Shell.ts execution support)
 */
export declare function getShellCompletions(input: string, cursorOffset: number, abortSignal: AbortSignal): Promise<SuggestionItem[]>;
//# sourceMappingURL=shellCompletion.d.ts.map