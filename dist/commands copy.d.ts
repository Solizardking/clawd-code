import { type Command } from './types/command.js';
export type { Command, CommandBase, CommandResultDisplay, LocalCommandResult, LocalJSXCommandContext, PromptCommand, ResumeEntrypoint, } from './types/command.js';
export { getCommandName, isCommandEnabled } from './types/command.js';
export declare const INTERNAL_ONLY_COMMANDS: any[];
export declare const builtInCommandNames: any;
/**
 * Filters commands by their declared `availability` (auth/provider requirement).
 * Commands without `availability` are treated as universal.
 * This runs before `isEnabled()` so that provider-gated commands are hidden
 * regardless of feature-flag state.
 *
 * Not memoized — auth state can change mid-session (e.g. after /login),
 * so this must be re-evaluated on every getCommands() call.
 */
export declare function meetsAvailabilityRequirement(cmd: Command): boolean;
/**
 * Returns commands available to the current user. The expensive loading is
 * memoized, but availability and isEnabled checks run fresh every call so
 * auth changes (e.g. /login) take effect immediately.
 */
export declare function getCommands(cwd: string): Promise<Command[]>;
/**
 * Clears only the memoization caches for commands, WITHOUT clearing skill caches.
 * Use this when dynamic skills are added to invalidate cached command lists.
 */
export declare function clearCommandMemoizationCaches(): void;
export declare function clearCommandsCache(): void;
/**
 * Filter AppState.mcp.commands to MCP-provided skills (prompt-type,
 * model-invocable, loaded from MCP). These live outside getCommands() so
 * callers that need MCP skills in their skill index thread them through
 * separately.
 */
export declare function getMcpSkillCommands(mcpCommands: readonly Command[]): readonly Command[];
export declare const getSkillToolCommands: any;
export declare const getSlashCommandToolSkills: any;
/**
 * Commands that are safe to use in remote mode (--remote).
 * These only affect local TUI state and don't depend on local filesystem,
 * git, shell, IDE, MCP, or other local execution context.
 *
 * Used in two places:
 * 1. Pre-filtering commands in main.tsx before REPL renders (prevents race with CCR init)
 * 2. Preserving local-only commands in REPL's handleRemoteInit after CCR filters
 */
export declare const REMOTE_SAFE_COMMANDS: Set<Command>;
/**
 * Builtin commands of type 'local' that ARE safe to execute when received
 * over the Remote Control bridge. These produce text output that streams
 * back to the mobile/web client and have no terminal-only side effects.
 *
 * 'local-jsx' commands are blocked by type (they render Ink UI) and
 * 'prompt' commands are allowed by type (they expand to text sent to the
 * model) — this set only gates 'local' commands.
 *
 * When adding a new 'local' command that should work from mobile, add it
 * here. Default is blocked.
 */
export declare const BRIDGE_SAFE_COMMANDS: Set<Command>;
/**
 * Whether a slash command is safe to execute when its input arrived over the
 * Remote Control bridge (mobile/web client).
 *
 * PR #19134 blanket-blocked all slash commands from bridge inbound because
 * `/model` from iOS was popping the local Ink picker. This predicate relaxes
 * that with an explicit allowlist: 'prompt' commands (skills) expand to text
 * and are safe by construction; 'local' commands need an explicit opt-in via
 * BRIDGE_SAFE_COMMANDS; 'local-jsx' commands render Ink UI and stay blocked.
 */
export declare function isBridgeSafeCommand(cmd: Command): boolean;
/**
 * Filter commands to only include those safe for remote mode.
 * Used to pre-filter commands when rendering the REPL in --remote mode,
 * preventing local-only commands from being briefly available before
 * the CCR init message arrives.
 */
export declare function filterCommandsForRemoteMode(commands: Command[]): Command[];
export declare function findCommand(commandName: string, commands: Command[]): Command | undefined;
export declare function hasCommand(commandName: string, commands: Command[]): boolean;
export declare function getCommand(commandName: string, commands: Command[]): Command;
/**
 * Formats a command's description with its source annotation for user-facing UI.
 * Use this in typeahead, help screens, and other places where users need to see
 * where a command comes from.
 *
 * For model-facing prompts (like SkillTool), use cmd.description directly.
 */
export declare function formatDescriptionWithSource(cmd: Command): string;
//# sourceMappingURL=commands%20copy.d.ts.map