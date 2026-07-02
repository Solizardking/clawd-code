/**
 * Files are loaded in the following order:
 *
 * 1. Managed memory (eg. /etc/claude-code/CLAUDE.md) - Global instructions for all users
 * 2. User memory (~/.claude/CLAUDE.md) - Private global instructions for all projects
 * 3. Project memory (CLAUDE.md, .claude/CLAUDE.md, and .claude/rules/*.md in project roots) - Instructions checked into the codebase
 * 4. Local memory (CLAUDE.local.md in project roots) - Private project-specific instructions
 *
 * Files are loaded in reverse order of priority, i.e. the latest files are highest priority
 * with the model paying more attention to them.
 *
 * File discovery:
 * - User memory is loaded from the user's home directory
 * - Project and Local files are discovered by traversing from the current directory up to root
 * - Files closer to the current directory have higher priority (loaded later)
 * - CLAUDE.md, .claude/CLAUDE.md, and all .md files in .claude/rules/ are checked in each directory for Project memory
 *
 * Memory @include directive:
 * - Memory files can include other files using @ notation
 * - Syntax: @path, @./relative/path, @~/home/path, or @/absolute/path
 * - @path (without prefix) is treated as a relative path (same as @./path)
 * - Works in leaf text nodes only (not inside code blocks or code strings)
 * - Included files are added as separate entries before the including file
 * - Circular references are prevented by tracking processed files
 * - Non-existent files are silently ignored
 */
import { type FileStateCache } from './fileStateCache.js';
import { type InstructionsLoadReason } from './hooks.js';
import type { MemoryType } from './memory/types.js';
export declare const MAX_MEMORY_CHARACTER_COUNT = 40000;
export type MemoryFileInfo = {
    path: string;
    type: MemoryType;
    content: string;
    parent?: string;
    globs?: string[];
    contentDiffersFromDisk?: boolean;
    rawContent?: string;
};
/**
 * Strip block-level HTML comments (<!-- ... -->) from markdown content.
 *
 * Uses the marked lexer to identify comments at the block level only, so
 * comments inside inline code spans and fenced code blocks are preserved.
 * Inline HTML comments inside a paragraph are also left intact; the intended
 * use case is authorial notes that occupy their own lines.
 *
 * Unclosed comments (`<!--` with no matching `-->`) are left in place so a
 * typo doesn't silently swallow the rest of the file.
 */
export declare function stripHtmlComments(content: string): {
    content: string;
    stripped: boolean;
};
/**
 * Recursively processes a memory file and all its @include references
 * Returns an array of MemoryFileInfo objects with includes first, then main file
 */
export declare function processMemoryFile(filePath: string, type: MemoryType, processedPaths: Set<string>, includeExternal: boolean, depth?: number, parent?: string): Promise<MemoryFileInfo[]>;
/**
 * Processes all .md files in the .claude/rules/ directory and its subdirectories
 * @param rulesDir The path to the rules directory
 * @param type Type of memory file (User, Project, Local)
 * @param processedPaths Set of already processed file paths
 * @param includeExternal Whether to include external files
 * @param conditionalRule If true, only include files with frontmatter paths; if false, only include files without frontmatter paths
 * @param visitedDirs Set of already visited directory real paths (for cycle detection)
 * @returns Array of MemoryFileInfo objects
 */
export declare function processMdRules({ rulesDir, type, processedPaths, includeExternal, conditionalRule, visitedDirs, }: {
    rulesDir: string;
    type: MemoryType;
    processedPaths: Set<string>;
    includeExternal: boolean;
    conditionalRule: boolean;
    visitedDirs?: Set<string>;
}): Promise<MemoryFileInfo[]>;
export declare const getMemoryFiles: any;
/**
 * Clears the getMemoryFiles memoize cache
 * without firing the InstructionsLoaded hook.
 *
 * Use this for cache invalidation that is purely for correctness (e.g.
 * worktree enter/exit, settings sync, /memory dialog). For events that
 * represent instructions actually being reloaded into context (e.g.
 * compaction), use resetGetMemoryFilesCache() instead.
 */
export declare function clearMemoryFileCaches(): void;
export declare function resetGetMemoryFilesCache(reason?: InstructionsLoadReason): void;
export declare function getLargeMemoryFiles(files: MemoryFileInfo[]): MemoryFileInfo[];
/**
 * When tengu_moth_copse is on, the findRelevantMemories prefetch surfaces
 * memory files via attachments, so the MEMORY.md index is no longer injected
 * into the system prompt. Callsites that care about "what's actually in
 * context" (context builder, /context viz) should filter through this.
 */
export declare function filterInjectedMemoryFiles(files: MemoryFileInfo[]): MemoryFileInfo[];
export declare const getClaudeMds: (memoryFiles: MemoryFileInfo[], filter?: (type: MemoryType) => boolean) => string;
/**
 * Gets managed and user conditional rules that match the target path.
 * This is the first phase of nested memory loading.
 *
 * @param targetPath The target file path to match against glob patterns
 * @param processedPaths Set of already processed file paths (will be mutated)
 * @returns Array of MemoryFileInfo objects for matching conditional rules
 */
export declare function getManagedAndUserConditionalRules(targetPath: string, processedPaths: Set<string>): Promise<MemoryFileInfo[]>;
/**
 * Gets memory files for a single nested directory (between CWD and target).
 * Loads CLAUDE.md, unconditional rules, and conditional rules for that directory.
 *
 * @param dir The directory to process
 * @param targetPath The target file path (for conditional rule matching)
 * @param processedPaths Set of already processed file paths (will be mutated)
 * @returns Array of MemoryFileInfo objects
 */
export declare function getMemoryFilesForNestedDirectory(dir: string, targetPath: string, processedPaths: Set<string>): Promise<MemoryFileInfo[]>;
/**
 * Gets conditional rules for a CWD-level directory (from root up to CWD).
 * Only processes conditional rules since unconditional rules are already loaded eagerly.
 *
 * @param dir The directory to process
 * @param targetPath The target file path (for conditional rule matching)
 * @param processedPaths Set of already processed file paths (will be mutated)
 * @returns Array of MemoryFileInfo objects
 */
export declare function getConditionalRulesForCwdLevelDirectory(dir: string, targetPath: string, processedPaths: Set<string>): Promise<MemoryFileInfo[]>;
/**
 * Processes all .md files in the .claude/rules/ directory and its subdirectories,
 * filtering to only include files with frontmatter paths that match the target path
 * @param targetPath The file path to match against frontmatter glob patterns
 * @param rulesDir The path to the rules directory
 * @param type Type of memory file (User, Project, Local)
 * @param processedPaths Set of already processed file paths
 * @param includeExternal Whether to include external files
 * @returns Array of MemoryFileInfo objects that match the target path
 */
export declare function processConditionedMdRules(targetPath: string, rulesDir: string, type: MemoryType, processedPaths: Set<string>, includeExternal: boolean): Promise<MemoryFileInfo[]>;
export type ExternalClaudeMdInclude = {
    path: string;
    parent: string;
};
export declare function getExternalClaudeMdIncludes(files: MemoryFileInfo[]): ExternalClaudeMdInclude[];
export declare function hasExternalClaudeMdIncludes(files: MemoryFileInfo[]): boolean;
export declare function shouldShowClaudeMdExternalIncludesWarning(): Promise<boolean>;
/**
 * Check if a file path is a memory file (CLAUDE.md, CLAUDE.local.md, or .claude/rules/*.md)
 */
export declare function isMemoryFilePath(filePath: string): boolean;
/**
 * Get all memory file paths from both standard discovery and readFileState.
 * Combines:
 * - getMemoryFiles() paths (CWD upward to root)
 * - readFileState paths matching memory patterns (includes child directories)
 */
export declare function getAllMemoryFilePaths(files: MemoryFileInfo[], readFileState: FileStateCache): string[];
//# sourceMappingURL=claudemd.d.ts.map