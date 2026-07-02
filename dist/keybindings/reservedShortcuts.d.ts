/**
 * Shortcuts that are typically intercepted by the OS, terminal, or shell
 * and will likely never reach the application.
 */
export type ReservedShortcut = {
    key: string;
    reason: string;
    severity: 'error' | 'warning';
};
/**
 * Shortcuts that cannot be rebound - they are hardcoded in Claude Code.
 */
export declare const NON_REBINDABLE: ReservedShortcut[];
/**
 * Terminal control shortcuts that are intercepted by the terminal/OS.
 * These will likely never reach the application.
 *
 * Note: ctrl+s (XOFF) and ctrl+q (XON) are NOT included here because:
 * - Most modern terminals disable flow control by default
 * - We use ctrl+s for the stash feature
 */
export declare const TERMINAL_RESERVED: ReservedShortcut[];
/**
 * macOS-specific shortcuts that the OS intercepts.
 */
export declare const MACOS_RESERVED: ReservedShortcut[];
/**
 * Get all reserved shortcuts for the current platform.
 * Includes non-rebindable shortcuts and terminal-reserved shortcuts.
 */
export declare function getReservedShortcuts(): ReservedShortcut[];
/**
 * Normalize a key string for comparison (lowercase, sorted modifiers).
 * Chords (space-separated steps like "ctrl+x ctrl+b") are normalized
 * per-step — splitting on '+' first would mangle "x ctrl" into a mainKey
 * overwritten by the next step, collapsing the chord into its last key.
 */
export declare function normalizeKeyForComparison(key: string): string;
//# sourceMappingURL=reservedShortcuts.d.ts.map