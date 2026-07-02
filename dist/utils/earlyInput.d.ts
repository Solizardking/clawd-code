/**
 * Early Input Capture
 *
 * This module captures terminal input that is typed before the REPL is fully
 * initialized. Users often type `claude` and immediately start typing their
 * prompt, but those early keystrokes would otherwise be lost during startup.
 *
 * Usage:
 * 1. Call startCapturingEarlyInput() as early as possible in cli.tsx
 * 2. When REPL is ready, call consumeEarlyInput() to get any buffered text
 * 3. stopCapturingEarlyInput() is called automatically when input is consumed
 */
/**
 * Start capturing stdin data early, before the REPL is initialized.
 * Should be called as early as possible in the startup sequence.
 *
 * Only captures if stdin is a TTY (interactive terminal).
 */
export declare function startCapturingEarlyInput(): void;
/**
 * Stop capturing early input.
 * Called automatically when input is consumed, or can be called manually.
 */
export declare function stopCapturingEarlyInput(): void;
/**
 * Consume any early input that was captured.
 * Returns the captured input and clears the buffer.
 * Automatically stops capturing when called.
 */
export declare function consumeEarlyInput(): string;
/**
 * Check if there is any early input available without consuming it.
 */
export declare function hasEarlyInput(): boolean;
/**
 * Seed the early input buffer with text that will appear pre-filled
 * in the prompt input when the REPL renders. Does not auto-submit.
 */
export declare function seedEarlyInput(text: string): void;
/**
 * Check if early input capture is currently active.
 */
export declare function isCapturingEarlyInput(): boolean;
//# sourceMappingURL=earlyInput.d.ts.map