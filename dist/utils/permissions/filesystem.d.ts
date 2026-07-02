import type { z } from 'zod/v4';
import type { AnyObject, Tool, ToolPermissionContext } from '../../Tool.js';
import type { PermissionDecision, PermissionResult } from './PermissionResult.js';
import type { PermissionRule } from './PermissionRule.js';
import type { PermissionUpdate } from './PermissionUpdateSchema.js';
/**
 * Dangerous files that should be protected from auto-editing.
 * These files can be used for code execution or data exfiltration.
 */
export declare const DANGEROUS_FILES: readonly [".gitconfig", ".gitmodules", ".bashrc", ".bash_profile", ".zshrc", ".zprofile", ".profile", ".ripgreprc", ".mcp.json", ".claude.json"];
/**
 * Dangerous directories that should be protected from auto-editing.
 * These directories contain sensitive configuration or executable files.
 */
export declare const DANGEROUS_DIRECTORIES: readonly [".git", ".vscode", ".idea", ".claude"];
/**
 * Normalizes a path for case-insensitive comparison.
 * This prevents bypassing security checks using mixed-case paths on case-insensitive
 * filesystems (macOS/Windows) like `.cLauDe/Settings.locaL.json`.
 *
 * We always normalize to lowercase regardless of platform for consistent security.
 * @param path The path to normalize
 * @returns The lowercase path for safe comparison
 */
export declare function normalizeCaseForComparison(path: string): string;
/**
 * If filePath is inside a .claude/skills/{name}/ directory (project or global),
 * return the skill name and a session-allow pattern scoped to just that skill.
 * Used to offer a narrower "allow edits to this skill only" option in the
 * permission dialog and SDK suggestions, so iterating on one skill doesn't
 * require granting session access to all of .claude/ (settings.json, hooks/, etc.).
 */
export declare function getClaudeSkillScope(filePath: string): {
    skillName: string;
    pattern: string;
} | null;
/**
 * Cross-platform relative path calculation that returns POSIX-style paths.
 * Handles Windows path conversion internally.
 * @param from The base path
 * @param to The target path
 * @returns A POSIX-style relative path
 */
export declare function relativePath(from: string, to: string): string;
/**
 * Converts a path to POSIX format for pattern matching.
 * Handles Windows path conversion internally.
 * @param path The path to convert
 * @returns A POSIX-style path
 */
export declare function toPosixPath(path: string): string;
export declare function isClaudeSettingsPath(filePath: string): boolean;
/**
 * Returns the session memory directory path for the current session with trailing separator.
 * Path format: {projectDir}/{sessionId}/session-memory/
 */
export declare function getSessionMemoryDir(): string;
/**
 * Returns the session memory file path for the current session.
 * Path format: {projectDir}/{sessionId}/session-memory/summary.md
 */
export declare function getSessionMemoryPath(): string;
/**
 * Checks if the scratchpad directory feature is enabled.
 * The scratchpad is a per-session directory for Claude to write temporary files.
 * Controlled by the tengu_scratch Statsig gate.
 */
export declare function isScratchpadEnabled(): boolean;
/**
 * Returns the user-specific Claude temp directory name.
 * On Unix: 'claude-{uid}' to prevent multi-user permission conflicts
 * On Windows: 'claude' (tmpdir() is already per-user)
 */
export declare function getClaudeTempDirName(): string;
/**
 * Returns the Claude temp directory path with symlinks resolved.
 * Uses TMPDIR env var if set, otherwise:
 * - On Unix: /tmp/claude-{uid}/ (resolved to /private/tmp/claude-{uid}/ on macOS)
 * - On Windows: {tmpdir}/claude/ (e.g., C:\Users\{user}\AppData\Local\Temp\claude\)
 * This is a per-user temporary directory used by Claude Code for all temp files.
 *
 * NOTE: We resolve symlinks to ensure this path matches the resolved paths used
 * in permission checks. On macOS, /tmp is a symlink to /private/tmp, so without
 * resolution, paths like /tmp/claude-{uid}/... wouldn't match /private/tmp/claude-{uid}/...
 */
export declare const getClaudeTempDir: any;
/**
 * Root for bundled-skill file extraction (see bundledSkills.ts).
 *
 * SECURITY: The per-process random nonce is the load-bearing defense here.
 * Every other path component (uid, VERSION, skill name, file keys) is public
 * knowledge, so without it a local attacker can pre-create the tree on a
 * shared /tmp — sticky bit prevents deletion, not creation — and either
 * symlink an intermediate directory (O_NOFOLLOW only checks the final
 * component) or own a parent dir and swap file contents post-write for prompt
 * injection via the read allowlist. diskOutput.ts gets the same property from
 * the session-ID UUID in its path.
 *
 * Memoized so the extraction writes and the permission check agree on the
 * path for the life of the process. Version-scoped so stale extractions from
 * other binaries don't fall under the allowlist.
 */
export declare const getBundledSkillsRoot: any;
/**
 * Returns the project temp directory path with trailing separator.
 * Path format: /tmp/claude-{uid}/{sanitized-cwd}/
 */
export declare function getProjectTempDir(): string;
/**
 * Returns the scratchpad directory path for the current session.
 * Path format: /tmp/claude-{uid}/{sanitized-cwd}/{sessionId}/scratchpad/
 */
export declare function getScratchpadDir(): string;
/**
 * Ensures the scratchpad directory exists for the current session.
 * Creates the directory with secure permissions (0o700) if it doesn't exist.
 * Returns the path to the scratchpad directory.
 * @throws If scratchpad feature is not enabled
 */
export declare function ensureScratchpadDir(): Promise<string>;
/**
 * Checks if a path is safe for auto-editing (acceptEdits mode).
 * Returns information about why the path is unsafe, or null if all checks pass.
 *
 * This function performs comprehensive safety checks including:
 * - Suspicious Windows path patterns (NTFS streams, 8.3 names, long path prefixes, etc.)
 * - Claude config files (.claude/settings.json, .claude/commands/, .claude/agents/)
 * - MCP CLI state files (managed internally by Claude Code)
 * - Dangerous files (.bashrc, .gitconfig, .git/, .vscode/, .idea/, etc.)
 *
 * IMPORTANT: This function checks BOTH the original path AND resolved symlink paths
 * to prevent bypasses via symlinks pointing to protected files.
 *
 * @param path The path to check for safety
 * @returns Object with safe=false and message if unsafe, or { safe: true } if all checks pass
 */
export declare function checkPathSafetyForAutoEdit(path: string, precomputedPathsToCheck?: readonly string[]): {
    safe: true;
} | {
    safe: false;
    message: string;
    classifierApprovable: boolean;
};
export declare function allWorkingDirectories(context: ToolPermissionContext): Set<string>;
export declare const getResolvedWorkingDirPaths: any;
export declare function pathInAllowedWorkingPath(path: string, toolPermissionContext: ToolPermissionContext, precomputedPathsToCheck?: readonly string[]): boolean;
export declare function pathInWorkingPath(path: string, workingPath: string): boolean;
export declare function normalizePatternsToPath(patternsByRoot: Map<string | null, string[]>, root: string): string[];
/**
 * Collects all deny rules for file read permissions and returns their ignore patterns
 * Each pattern must be resolved relative to its root (map key)
 * Null keys are used for patterns that don't have a root
 *
 * This is used to hide files that are blocked by Read deny rules.
 *
 * @param toolPermissionContext
 */
export declare function getFileReadIgnorePatterns(toolPermissionContext: ToolPermissionContext): Map<string | null, string[]>;
export declare function matchingRuleForInput(path: string, toolPermissionContext: ToolPermissionContext, toolType: 'edit' | 'read', behavior: 'allow' | 'deny' | 'ask'): PermissionRule | null;
/**
 * Permission result for read permission for the specified tool & tool input
 */
export declare function checkReadPermissionForTool(tool: Tool, input: {
    [key: string]: unknown;
}, toolPermissionContext: ToolPermissionContext): PermissionDecision;
/**
 * Permission result for write permission for the specified tool & tool input.
 *
 * @param precomputedPathsToCheck - Optional cached result of
 *   `getPathsForPermissionCheck(tool.getPath(input))`. Callers MUST derive this
 *   from the same `tool` and `input` in the same synchronous frame — `path` is
 *   re-derived internally for error messages and internal-path checks, so a
 *   stale value would silently check deny rules for the wrong path.
 */
export declare function checkWritePermissionForTool<Input extends AnyObject>(tool: Tool<Input>, input: z.infer<Input>, toolPermissionContext: ToolPermissionContext, precomputedPathsToCheck?: readonly string[]): PermissionDecision;
export declare function generateSuggestions(filePath: string, operationType: 'read' | 'write' | 'create', toolPermissionContext: ToolPermissionContext, precomputedPathsToCheck?: readonly string[]): PermissionUpdate[];
/**
 * Check if a path is an internal path that can be edited without permission.
 * Returns a PermissionResult - either 'allow' if matched, or 'passthrough' to continue checking.
 */
export declare function checkEditableInternalPath(absolutePath: string, input: {
    [key: string]: unknown;
}): PermissionResult;
/**
 * Check if a path is an internal path that can be read without permission.
 * Returns a PermissionResult - either 'allow' if matched, or 'passthrough' to continue checking.
 */
export declare function checkReadableInternalPath(absolutePath: string, input: {
    [key: string]: unknown;
}): PermissionResult;
//# sourceMappingURL=filesystem.d.ts.map