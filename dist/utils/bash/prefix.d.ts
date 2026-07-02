export declare function getCommandPrefixStatic(command: string, recursionDepth?: number, wrapperCount?: number): Promise<{
    commandPrefix: string | null;
} | null>;
/**
 * Computes prefixes for a compound command (with && / || / ;).
 * For single commands, returns a single-element array with the prefix.
 *
 * For compound commands, computes per-subcommand prefixes and collapses
 * them: subcommands sharing a root (first word) are collapsed via
 * word-aligned longest common prefix.
 *
 * @param excludeSubcommand — optional filter; return true for subcommands
 *   that should be excluded from the prefix suggestion (e.g. read-only
 *   commands that are already auto-allowed).
 */
export declare function getCompoundCommandPrefixesStatic(command: string, excludeSubcommand?: (subcommand: string) => boolean): Promise<string[]>;
//# sourceMappingURL=prefix.d.ts.map