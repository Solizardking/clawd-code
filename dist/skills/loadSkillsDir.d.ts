import type { Command, PromptCommand } from '../types/command.js';
import { type EffortValue } from '../utils/effort.js';
import { type FrontmatterData, type FrontmatterShell } from '../utils/frontmatterParser.js';
import { type MarkdownFile } from '../utils/markdownConfigLoader.js';
import { parseUserSpecifiedModel } from '../utils/model/model.js';
import type { SettingSource } from '../utils/settings/constants.js';
import { type HooksSettings } from '../utils/settings/types.js';
export type LoadedFrom = 'commands_DEPRECATED' | 'skills' | 'plugin' | 'managed' | 'bundled' | 'mcp';
/**
 * Returns a claude config directory path for a given source.
 */
export declare function getSkillsPath(source: SettingSource | 'plugin', dir: 'skills' | 'commands'): string;
/**
 * Estimates token count for a skill based on frontmatter only
 * (name, description, whenToUse) since full content is only loaded on invocation.
 */
export declare function estimateSkillFrontmatterTokens(skill: Command): number;
/**
 * Parses all skill frontmatter fields that are shared between file-based and
 * MCP skill loading. Caller supplies the resolved skill name and the
 * source/loadedFrom/baseDir/paths fields separately.
 */
export declare function parseSkillFrontmatterFields(frontmatter: FrontmatterData, markdownContent: string, resolvedName: string, descriptionFallbackLabel?: 'Skill' | 'Custom command'): {
    displayName: string | undefined;
    description: string;
    hasUserSpecifiedDescription: boolean;
    allowedTools: string[];
    argumentHint: string | undefined;
    argumentNames: string[];
    whenToUse: string | undefined;
    version: string | undefined;
    model: ReturnType<typeof parseUserSpecifiedModel> | undefined;
    disableModelInvocation: boolean;
    userInvocable: boolean;
    hooks: HooksSettings | undefined;
    executionContext: 'fork' | undefined;
    agent: string | undefined;
    effort: EffortValue | undefined;
    shell: FrontmatterShell | undefined;
};
/**
 * Creates a skill command from parsed data
 */
export declare function createSkillCommand({ skillName, displayName, description, hasUserSpecifiedDescription, markdownContent, allowedTools, argumentHint, argumentNames, whenToUse, version, model, disableModelInvocation, userInvocable, source, baseDir, loadedFrom, hooks, executionContext, agent, paths, effort, shell, }: {
    skillName: string;
    displayName: string | undefined;
    description: string;
    hasUserSpecifiedDescription: boolean;
    markdownContent: string;
    allowedTools: string[];
    argumentHint: string | undefined;
    argumentNames: string[];
    whenToUse: string | undefined;
    version: string | undefined;
    model: string | undefined;
    disableModelInvocation: boolean;
    userInvocable: boolean;
    source: PromptCommand['source'];
    baseDir: string | undefined;
    loadedFrom: LoadedFrom;
    hooks: HooksSettings | undefined;
    executionContext: 'inline' | 'fork' | undefined;
    agent: string | undefined;
    paths: string[] | undefined;
    effort: EffortValue | undefined;
    shell: FrontmatterShell | undefined;
}): Command;
/**
 * Transforms markdown files to handle "skill" commands in legacy /commands/ folder.
 * When a SKILL.md file exists in a directory, only that file is loaded
 * and it takes the name of its parent directory.
 */
declare function transformSkillFiles(files: MarkdownFile[]): MarkdownFile[];
/**
 * Loads all skills from both /skills/ and legacy /commands/ directories.
 *
 * Skills from /skills/ directories:
 * - Only support directory format: skill-name/SKILL.md
 * - Default to user-invocable: true (can opt-out with user-invocable: false)
 *
 * Skills from legacy /commands/ directories:
 * - Support both directory format (SKILL.md) and single .md file format
 * - Default to user-invocable: true (user can type /cmd)
 *
 * @param cwd Current working directory for project directory traversal
 */
export declare const getSkillDirCommands: any;
export declare function clearSkillCaches(): void;
export { getSkillDirCommands as getCommandDirCommands };
export { clearSkillCaches as clearCommandCaches };
export { transformSkillFiles };
/**
 * Register a callback to be invoked when dynamic skills are loaded.
 * Used by other modules to clear caches without creating import cycles.
 * Returns an unsubscribe function.
 */
export declare function onDynamicSkillsLoaded(callback: () => void): () => void;
/**
 * Discovers skill directories by walking up from file paths to cwd.
 * Only discovers directories below cwd (cwd-level skills are loaded at startup).
 *
 * @param filePaths Array of file paths to check
 * @param cwd Current working directory (upper bound for discovery)
 * @returns Array of newly discovered skill directories, sorted deepest first
 */
export declare function discoverSkillDirsForPaths(filePaths: string[], cwd: string): Promise<string[]>;
/**
 * Loads skills from the given directories and merges them into the dynamic skills map.
 * Skills from directories closer to the file (deeper paths) take precedence.
 *
 * @param dirs Array of skill directories to load from (should be sorted deepest first)
 */
export declare function addSkillDirectories(dirs: string[]): Promise<void>;
/**
 * Gets all dynamically discovered skills.
 * These are skills discovered from file paths during the session.
 */
export declare function getDynamicSkills(): Command[];
/**
 * Activates conditional skills (skills with paths frontmatter) whose path
 * patterns match the given file paths. Activated skills are added to the
 * dynamic skills map, making them available to the model.
 *
 * Uses the `ignore` library (gitignore-style matching), matching the behavior
 * of CLAUDE.md conditional rules.
 *
 * @param filePaths Array of file paths being operated on
 * @param cwd Current working directory (paths are matched relative to cwd)
 * @returns Array of newly activated skill names
 */
export declare function activateConditionalSkillsForPaths(filePaths: string[], cwd: string): string[];
/**
 * Gets the number of pending conditional skills (for testing/debugging).
 */
export declare function getConditionalSkillCount(): number;
/**
 * Clears dynamic skill state (for testing).
 */
export declare function clearDynamicSkills(): void;
//# sourceMappingURL=loadSkillsDir.d.ts.map