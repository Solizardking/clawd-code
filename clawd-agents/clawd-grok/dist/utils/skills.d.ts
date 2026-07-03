export type SkillScope = "project" | "user";
export interface DiscoveredSkill {
    name: string;
    description: string;
    skillMdPath: string;
    rootDir: string;
    scope: SkillScope;
}
/**
 * Discover Agent Skills under ~/.agents/skills and from <projectRoot> upward through
 * parent directories to the git root. The nearest project-level skill overrides
 * user-level and higher-level project skills with the same `name` (frontmatter).
 */
export declare function discoverSkills(projectRoot: string): DiscoveredSkill[];
/** OpenCode-style XML catalog plus activation instructions for read_file. Returns null if no skills. */
export declare function formatSkillsForPrompt(skills: DiscoveredSkill[]): string | null;
/** Plain-text listing for /skills slash command in the TUI. */
export declare function formatSkillsForChat(skills: DiscoveredSkill[], projectRoot: string): string;
