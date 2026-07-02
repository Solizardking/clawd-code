import type { Key } from '../ink.js';
import type { KeybindingContextName, ParsedBinding, ParsedKeystroke } from './types.js';
export type ResolveResult = {
    type: 'match';
    action: string;
} | {
    type: 'none';
} | {
    type: 'unbound';
};
export type ChordResolveResult = {
    type: 'match';
    action: string;
} | {
    type: 'none';
} | {
    type: 'unbound';
} | {
    type: 'chord_started';
    pending: ParsedKeystroke[];
} | {
    type: 'chord_cancelled';
};
/**
 * Resolve a key input to an action.
 * Pure function - no state, no side effects, just matching logic.
 *
 * @param input - The character input from Ink
 * @param key - The Key object from Ink with modifier flags
 * @param activeContexts - Array of currently active contexts (e.g., ['Chat', 'Global'])
 * @param bindings - All parsed bindings to search through
 * @returns The resolution result
 */
export declare function resolveKey(input: string, key: Key, activeContexts: KeybindingContextName[], bindings: ParsedBinding[]): ResolveResult;
/**
 * Get display text for an action from bindings (e.g., "ctrl+t" for "app:toggleTodos").
 * Searches in reverse order so user overrides take precedence.
 */
export declare function getBindingDisplayText(action: string, context: KeybindingContextName, bindings: ParsedBinding[]): string | undefined;
/**
 * Compare two ParsedKeystrokes for equality. Collapses alt/meta into
 * one logical modifier — legacy terminals can't distinguish them (see
 * match.ts modifiersMatch), so "alt+k" and "meta+k" are the same key.
 * Super (cmd/win) is distinct — only arrives via kitty keyboard protocol.
 */
export declare function keystrokesEqual(a: ParsedKeystroke, b: ParsedKeystroke): boolean;
/**
 * Resolve a key with chord state support.
 *
 * This function handles multi-keystroke chord bindings like "ctrl+k ctrl+s".
 *
 * @param input - The character input from Ink
 * @param key - The Key object from Ink with modifier flags
 * @param activeContexts - Array of currently active contexts
 * @param bindings - All parsed bindings
 * @param pending - Current chord state (null if not in a chord)
 * @returns Resolution result with chord state
 */
export declare function resolveKeyWithChordState(input: string, key: Key, activeContexts: KeybindingContextName[], bindings: ParsedBinding[], pending: ParsedKeystroke[] | null): ChordResolveResult;
//# sourceMappingURL=resolver.d.ts.map