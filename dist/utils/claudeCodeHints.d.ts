/**
 * Claude Code hints protocol.
 *
 * CLIs and SDKs running under Claude Code can emit a self-closing
 * `<claude-code-hint />` tag to stderr (merged into stdout by the shell
 * tools). The harness scans tool output for these tags, strips them before
 * the output reaches the model, and surfaces an install prompt to the
 * user — no inference, no proactive execution.
 *
 * This file provides both the parser and a small module-level store for
 * the pending hint. The store is a single slot (not a queue) — we surface
 * at most one prompt per session, so there's no reason to accumulate.
 * React subscribes via useSyncExternalStore.
 *
 * See docs/claude-code-hints.md for the vendor-facing spec.
 */
export type ClaudeCodeHintType = 'plugin';
export type ClaudeCodeHint = {
    /** Spec version declared by the emitter. Unknown versions are dropped. */
    v: number;
    /** Hint discriminator. v1 defines only `plugin`. */
    type: ClaudeCodeHintType;
    /**
     * Hint payload. For `type: 'plugin'`: a `name@marketplace` slug
     * matching the form accepted by `parsePluginIdentifier`.
     */
    value: string;
    /**
     * First token of the shell command that produced this hint. Shown in the
     * install prompt so the user can spot a mismatch between the tool that
     * emitted the hint and the plugin it recommends.
     */
    sourceCommand: string;
};
/**
 * Scan shell tool output for hint tags, returning the parsed hints and
 * the output with hint lines removed. The stripped output is what the
 * model sees — hints are a harness-only side channel.
 *
 * @param output - Raw command output (stdout with stderr interleaved).
 * @param command - The command that produced the output; its first
 *   whitespace-separated token is recorded as `sourceCommand`.
 */
export declare function extractClaudeCodeHints(output: string, command: string): {
    hints: ClaudeCodeHint[];
    stripped: string;
};
declare function parseAttrs(tagBody: string): Record<string, string>;
declare function firstCommandToken(command: string): string;
/** Raw store write. Callers should gate first (see module comment). */
export declare function setPendingHint(hint: ClaudeCodeHint): void;
/** Clear the slot without flipping the session flag — for rejected hints. */
export declare function clearPendingHint(): void;
/** Flip the once-per-session flag. Call only when a dialog is actually shown. */
export declare function markShownThisSession(): void;
export declare const subscribeToPendingHint: (listener: () => void) => () => void;
export declare function getPendingHintSnapshot(): ClaudeCodeHint | null;
export declare function hasShownHintThisSession(): boolean;
/** Test-only reset. */
export declare function _resetClaudeCodeHintStore(): void;
export declare const _test: {
    parseAttrs: typeof parseAttrs;
    firstCommandToken: typeof firstCommandToken;
};
export {};
//# sourceMappingURL=claudeCodeHints.d.ts.map