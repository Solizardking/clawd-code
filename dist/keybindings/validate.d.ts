import type { KeybindingBlock, ParsedBinding } from './types.js';
/**
 * Types of validation issues that can occur with keybindings.
 */
export type KeybindingWarningType = 'parse_error' | 'duplicate' | 'reserved' | 'invalid_context' | 'invalid_action';
/**
 * A warning or error about a keybinding configuration issue.
 */
export type KeybindingWarning = {
    type: KeybindingWarningType;
    severity: 'error' | 'warning';
    message: string;
    key?: string;
    context?: string;
    action?: string;
    suggestion?: string;
};
/**
 * Detect duplicate keys within the same bindings block in a JSON string.
 * JSON.parse silently uses the last value for duplicate keys,
 * so we need to check the raw string to warn users.
 *
 * Only warns about duplicates within the same context's bindings object.
 * Duplicates across different contexts are allowed (e.g., "enter" in Chat
 * and "enter" in Confirmation).
 */
export declare function checkDuplicateKeysInJson(jsonString: string): KeybindingWarning[];
/**
 * Validate user keybinding config and return all warnings.
 */
export declare function validateUserConfig(userBlocks: unknown): KeybindingWarning[];
/**
 * Check for duplicate bindings within the same context.
 * Only checks user bindings (not default + user merged).
 */
export declare function checkDuplicates(blocks: KeybindingBlock[]): KeybindingWarning[];
/**
 * Check for reserved shortcuts that may not work.
 */
export declare function checkReservedShortcuts(bindings: ParsedBinding[]): KeybindingWarning[];
/**
 * Run all validations and return combined warnings.
 */
export declare function validateBindings(userBlocks: unknown, _parsedBindings: ParsedBinding[]): KeybindingWarning[];
/**
 * Format a warning for display to the user.
 */
export declare function formatWarning(warning: KeybindingWarning): string;
/**
 * Format multiple warnings for display.
 */
export declare function formatWarnings(warnings: KeybindingWarning[]): string;
//# sourceMappingURL=validate.d.ts.map