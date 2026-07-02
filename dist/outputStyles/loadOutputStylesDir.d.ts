/**
 * Loads markdown files from .claude/output-styles directories throughout the project
 * and from ~/.claude/output-styles directory and converts them to output styles.
 *
 * Each filename becomes a style name, and the file content becomes the style prompt.
 * The frontmatter provides name and description.
 *
 * Structure:
 * - Project .claude/output-styles/*.md -> project styles
 * - User ~/.claude/output-styles/*.md -> user styles (overridden by project styles)
 *
 * @param cwd Current working directory for project directory traversal
 */
export declare const getOutputStyleDirStyles: any;
export declare function clearOutputStyleCaches(): void;
//# sourceMappingURL=loadOutputStylesDir.d.ts.map