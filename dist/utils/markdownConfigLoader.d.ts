import type { FrontmatterData } from './frontmatterParser.js';
import { type SettingSource } from './settings/constants.js';
export declare const CLAUDE_CONFIG_DIRECTORIES: readonly ["commands", "agents", "output-styles", "skills", "workflows", ...never[]] | readonly ["commands", "agents", "output-styles", "skills", "workflows", "templates"];
export type ClaudeConfigDirectory = (typeof CLAUDE_CONFIG_DIRECTORIES)[number];
export type MarkdownFile = {
    filePath: string;
    baseDir: string;
    frontmatter: FrontmatterData;
    content: string;
    source: SettingSource;
};
/**
 * Extracts a description from markdown content
 * Uses the first non-empty line as the description, or falls back to a default
 */
export declare function extractDescriptionFromMarkdown(content: string, defaultDescription?: string): string;
/**
 * Parse tools from agent frontmatter
 * Missing field = undefined (all tools)
 * Empty field = [] (no tools)
 */
export declare function parseAgentToolsFromFrontmatter(toolsValue: unknown): string[] | undefined;
/**
 * Parse allowed-tools from slash command frontmatter
 * Missing or empty field = no tools ([])
 */
export declare function parseSlashCommandToolsFromFrontmatter(toolsValue: unknown): string[];
/**
 * Traverses from the current directory up to the git root (or home directory if not in a git repo),
 * collecting all .claude directories along the way.
 *
 * Stopping at git root prevents commands/skills from parent directories outside the repository
 * from leaking into projects. For example, if ~/projects/.claude/commands/ exists, it won't
 * appear in ~/projects/my-repo/ if my-repo is a git repository.
 *
 * @param subdir Subdirectory (eg. "commands", "agents")
 * @param cwd Current working directory to start from
 * @returns Array of directory paths containing .claude/subdir, from most specific (cwd) to least specific
 */
export declare function getProjectDirsUpToHome(subdir: ClaudeConfigDirectory, cwd: string): string[];
/**
 * Loads markdown files from managed, user, and project directories
 * @param subdir Subdirectory (eg. "agents" or "commands")
 * @param cwd Current working directory for project directory traversal
 * @returns Array of parsed markdown files with metadata
 */
export declare const loadMarkdownFilesForSubdir: any;
//# sourceMappingURL=markdownConfigLoader.d.ts.map