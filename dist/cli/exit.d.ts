/**
 * CLI exit helpers for subcommand handlers.
 *
 * Consolidates the 4-5 line "print + lint-suppress + exit" block that was
 * copy-pasted ~60 times across `claude mcp *` / `claude plugin *` handlers.
 * The `: never` return type lets TypeScript narrow control flow at call sites
 * without a trailing `return`.
 */
/** Write an error message to stderr (if given) and exit with code 1. */
export declare function cliError(msg?: string): never;
/** Write a message to stdout (if given) and exit with code 0. */
export declare function cliOk(msg?: string): never;
//# sourceMappingURL=exit.d.ts.map