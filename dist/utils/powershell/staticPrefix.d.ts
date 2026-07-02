/**
 * PowerShell static command prefix extraction.
 *
 * Mirrors bash's getCommandPrefixStatic / getCompoundCommandPrefixesStatic
 * (src/utils/bash/prefix.ts) but uses the PowerShell AST parser instead of
 * tree-sitter. The AST gives us cmd.name and cmd.args already split; for
 * external commands we feed those into the same fig-spec walker bash uses
 * (src/utils/shell/specPrefix.ts) — git/npm/kubectl CLIs are shell-agnostic.
 *
 * Feeds the "Yes, and don't ask again for: ___" editable input in the
 * permission dialog — static extractor provides a best-guess prefix, user
 * edits it down if needed.
 */
import { type ParsedCommandElement } from './parser.js';
/**
 * Extract a prefix suggestion for a PowerShell command.
 *
 * Parses the command, takes the first CommandAst, returns a prefix suitable
 * for the permission dialog's "don't ask again for: ___" editable input.
 * Returns null when no safe prefix can be extracted (parse failure, shell
 * invocation, path-like name, bare subcommand-aware command).
 */
export declare function getCommandPrefixStatic(command: string): Promise<{
    commandPrefix: string | null;
} | null>;
/**
 * Extract prefixes for all subcommands in a compound PowerShell command.
 *
 * For `Get-Process; git status && npm test`, returns per-subcommand prefixes.
 * Subcommands for which `excludeSubcommand` returns true (e.g. already
 * read-only/auto-allowed) are skipped — no point suggesting a rule for them.
 * Prefixes sharing a root are collapsed via word-aligned LCP:
 * `npm run test && npm run lint` → `npm run`.
 *
 * The filter receives the ParsedCommandElement (not cmd.text) because
 * PowerShell's read-only check (isAllowlistedCommand) needs the element's
 * structured fields (nameType, args). Passing text would require reparsing,
 * which spawns pwsh.exe per subcommand — expensive and wasteful since we
 * already have the parsed elements here. Bash's equivalent passes text
 * because BashTool.isReadOnly works from regex/patterns, not parsed AST.
 */
export declare function getCompoundCommandPrefixesStatic(command: string, excludeSubcommand?: (element: ParsedCommandElement) => boolean): Promise<string[]>;
//# sourceMappingURL=staticPrefix.d.ts.map