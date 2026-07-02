/**
 * Shared permission rule matching utilities for shell tools.
 *
 * Extracts common logic for:
 * - Parsing permission rules (exact, prefix, wildcard)
 * - Matching commands against rules
 * - Generating permission suggestions
 */
import type { PermissionUpdate } from './PermissionUpdateSchema.js';
/**
 * Parsed permission rule discriminated union.
 */
export type ShellPermissionRule = {
    type: 'exact';
    command: string;
} | {
    type: 'prefix';
    prefix: string;
} | {
    type: 'wildcard';
    pattern: string;
};
/**
 * Extract prefix from legacy :* syntax (e.g., "npm:*" -> "npm")
 * This is maintained for backwards compatibility.
 */
export declare function permissionRuleExtractPrefix(permissionRule: string): string | null;
/**
 * Check if a pattern contains unescaped wildcards (not legacy :* syntax).
 * Returns true if the pattern contains * that are not escaped with \ or part of :* at the end.
 */
export declare function hasWildcards(pattern: string): boolean;
/**
 * Match a command against a wildcard pattern.
 * Wildcards (*) match any sequence of characters.
 * Use \* to match a literal asterisk character.
 * Use \\ to match a literal backslash.
 *
 * @param pattern - The permission rule pattern with wildcards
 * @param command - The command to match against
 * @returns true if the command matches the pattern
 */
export declare function matchWildcardPattern(pattern: string, command: string, caseInsensitive?: boolean): boolean;
/**
 * Parse a permission rule string into a structured rule object.
 */
export declare function parsePermissionRule(permissionRule: string): ShellPermissionRule;
/**
 * Generate permission update suggestion for an exact command match.
 */
export declare function suggestionForExactCommand(toolName: string, command: string): PermissionUpdate[];
/**
 * Generate permission update suggestion for a prefix match.
 */
export declare function suggestionForPrefix(toolName: string, prefix: string): PermissionUpdate[];
//# sourceMappingURL=shellRuleMatching.d.ts.map