import type { Key } from '../ink.js';
import type { ParsedBinding, ParsedKeystroke } from './types.js';
/**
 * Extract the normalized key name from Ink's Key + input.
 * Maps Ink's boolean flags (key.escape, key.return, etc.) to string names
 * that match our ParsedKeystroke.key format.
 */
export declare function getKeyName(input: string, key: Key): string | null;
/**
 * Check if a ParsedKeystroke matches the given Ink input + Key.
 *
 * The display text will show platform-appropriate names (opt on macOS, alt elsewhere).
 */
export declare function matchesKeystroke(input: string, key: Key, target: ParsedKeystroke): boolean;
/**
 * Check if Ink's Key + input matches a parsed binding's first keystroke.
 * For single-keystroke bindings only (Phase 1).
 */
export declare function matchesBinding(input: string, key: Key, binding: ParsedBinding): boolean;
//# sourceMappingURL=match.d.ts.map