/**
 * Cross-platform terminal clearing with scrollback support.
 * Detects modern terminals that support ESC[3J for clearing scrollback.
 */
/**
 * Returns the ANSI escape sequence to clear the terminal including scrollback.
 * Automatically detects terminal capabilities.
 */
export declare function getClearTerminalSequence(): string;
/**
 * Clears the terminal screen. On supported terminals, also clears scrollback.
 */
export declare const clearTerminal: string;
//# sourceMappingURL=clearTerminal.d.ts.map