import type { ThemeName } from './theme.js';
/**
 * Generate and cache the completion script, then add a source line to the
 * shell's rc file. Returns a user-facing status message.
 */
export declare function setupShellCompletion(theme: ThemeName): Promise<string>;
/**
 * Regenerate cached shell completion scripts in ~/.claude/.
 * Called after `claude update` so completions stay in sync with the new binary.
 */
export declare function regenerateCompletionCache(): Promise<void>;
//# sourceMappingURL=completionCache.d.ts.map