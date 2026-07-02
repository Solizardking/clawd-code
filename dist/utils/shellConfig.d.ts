/**
 * Utilities for managing shell configuration files (like .bashrc, .zshrc)
 * Used for managing claude aliases and PATH entries
 */
export declare const CLAUDE_ALIAS_REGEX: RegExp;
type EnvLike = Record<string, string | undefined>;
type ShellConfigOptions = {
    env?: EnvLike;
    homedir?: string;
};
/**
 * Get the paths to shell configuration files
 * Respects ZDOTDIR for zsh users
 * @param options Optional overrides for testing (env, homedir)
 */
export declare function getShellConfigPaths(options?: ShellConfigOptions): Record<string, string>;
/**
 * Filter out installer-created claude aliases from an array of lines
 * Only removes aliases pointing to $HOME/.claude/local/claude
 * Preserves custom user aliases that point to other locations
 * Returns the filtered lines and whether our default installer alias was found
 */
export declare function filterClaudeAliases(lines: string[]): {
    filtered: string[];
    hadAlias: boolean;
};
/**
 * Read a file and split it into lines
 * Returns null if file doesn't exist or can't be read
 */
export declare function readFileLines(filePath: string): Promise<string[] | null>;
/**
 * Write lines back to a file
 */
export declare function writeFileLines(filePath: string, lines: string[]): Promise<void>;
/**
 * Check if a claude alias exists in any shell config file
 * Returns the alias target if found, null otherwise
 * @param options Optional overrides for testing (env, homedir)
 */
export declare function findClaudeAlias(options?: ShellConfigOptions): Promise<string | null>;
/**
 * Check if a claude alias exists and points to a valid executable
 * Returns the alias target if valid, null otherwise
 * @param options Optional overrides for testing (env, homedir)
 */
export declare function findValidClaudeAlias(options?: ShellConfigOptions): Promise<string | null>;
export {};
//# sourceMappingURL=shellConfig.d.ts.map