import type { Key } from '../../ink.js';
/**
 * Helper function to check if vim mode is currently enabled
 * @returns boolean indicating if vim mode is active
 */
export declare function isVimModeEnabled(): boolean;
export declare function getNewlineInstructions(): string;
/**
 * True when the keystroke is a printable character that does not begin
 * with whitespace — i.e., a normal letter/digit/symbol the user typed.
 * Used to gate the lazy space inserted after an image pill.
 */
export declare function isNonSpacePrintable(input: string, key: Key): boolean;
//# sourceMappingURL=utils.d.ts.map