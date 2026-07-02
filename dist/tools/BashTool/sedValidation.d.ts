import type { ToolPermissionContext } from '../../Tool.js';
import type { PermissionResult } from '../../utils/permissions/PermissionResult.js';
/**
 * Pattern 1: Check if this is a line printing command with -n flag
 * Allows: sed -n 'N' | sed -n 'N,M' with optional -E, -r, -z flags
 * Allows semicolon-separated print commands like: sed -n '1p;2p;3p'
 * File arguments are ALLOWED for this pattern
 * @internal Exported for testing
 */
export declare function isLinePrintingCommand(command: string, expressions: string[]): boolean;
/**
 * Helper: Check if a single command is a valid print command
 * STRICT ALLOWLIST - only these exact forms are allowed:
 * - p (print all)
 * - Np (print line N, where N is digits)
 * - N,Mp (print lines N through M)
 * Anything else (including w, W, e, E commands) is rejected.
 * @internal Exported for testing
 */
export declare function isPrintCommand(cmd: string): boolean;
/**
 * Checks if a sed command is allowed by the allowlist.
 * The allowlist patterns themselves are strict enough to reject dangerous operations.
 * @param command The sed command to check
 * @param options.allowFileWrites When true, allows -i flag and file arguments for substitution commands
 * @returns true if the command is allowed (matches allowlist and passes denylist check), false otherwise
 */
export declare function sedCommandIsAllowedByAllowlist(command: string, options?: {
    allowFileWrites?: boolean;
}): boolean;
/**
 * Check if a sed command has file arguments (not just stdin)
 * @internal Exported for testing
 */
export declare function hasFileArgs(command: string): boolean;
/**
 * Extract sed expressions from command, ignoring flags and filenames
 * @param command Full sed command
 * @returns Array of sed expressions to check for dangerous operations
 * @throws Error if parsing fails
 * @internal Exported for testing
 */
export declare function extractSedExpressions(command: string): string[];
/**
 * Cross-cutting validation step for sed commands.
 *
 * This is a constraint check that blocks dangerous sed operations regardless of mode.
 * It returns 'passthrough' for non-sed commands or safe sed commands,
 * and 'ask' for dangerous sed operations (w/W/e/E commands).
 *
 * @param input - Object containing the command string
 * @param toolPermissionContext - Context containing mode and permissions
 * @returns
 * - 'ask' if any sed command contains dangerous operations
 * - 'passthrough' if no sed commands or all are safe
 */
export declare function checkSedConstraints(input: {
    command: string;
}, toolPermissionContext: ToolPermissionContext): PermissionResult;
//# sourceMappingURL=sedValidation.d.ts.map