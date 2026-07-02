import { type Command } from '../../commands.js';
import type { SuggestionItem } from '../../components/PromptInput/PromptInputFooterSuggestions.js';
/**
 * Represents a slash command found mid-input (not at the start)
 */
export type MidInputSlashCommand = {
    token: string;
    startPos: number;
    partialCommand: string;
};
/**
 * Finds a slash command token that appears mid-input (not at position 0).
 * A mid-input slash command is a "/" preceded by whitespace, where the cursor
 * is at or after the "/".
 *
 * @param input The full input string
 * @param cursorOffset The current cursor position
 * @returns The mid-input slash command info, or null if not found
 */
export declare function findMidInputSlashCommand(input: string, cursorOffset: number): MidInputSlashCommand | null;
/**
 * Finds the best matching command for a partial command string.
 * Delegates to generateCommandSuggestions and filters to prefix matches.
 *
 * @param partialCommand The partial command typed by the user (without "/")
 * @param commands Available commands
 * @returns The completion suffix (e.g., "mit" for partial "com" matching "commit"), or null
 */
export declare function getBestCommandMatch(partialCommand: string, commands: Command[]): {
    suffix: string;
    fullCommand: string;
} | null;
/**
 * Checks if input is a command (starts with slash)
 */
export declare function isCommandInput(input: string): boolean;
/**
 * Checks if a command input has arguments
 * A command with just a trailing space is considered to have no arguments
 */
export declare function hasCommandArgs(input: string): boolean;
/**
 * Formats a command with proper notation
 */
export declare function formatCommand(command: string): string;
/**
 * Generate command suggestions based on input
 */
export declare function generateCommandSuggestions(input: string, commands: Command[]): SuggestionItem[];
/**
 * Apply selected command to input
 */
export declare function applyCommandSuggestion(suggestion: string | SuggestionItem, shouldExecute: boolean, commands: Command[], onInputChange: (value: string) => void, setCursorOffset: (offset: number) => void, onSubmit: (value: string, isSubmittingSlashCommand?: boolean) => void): void;
/**
 * Find all /command patterns in text for highlighting.
 * Returns array of {start, end} positions.
 * Requires whitespace or start-of-string before the slash to avoid
 * matching paths like /usr/bin.
 */
export declare function findSlashCommandPositions(text: string): Array<{
    start: number;
    end: number;
}>;
//# sourceMappingURL=commandSuggestions.d.ts.map