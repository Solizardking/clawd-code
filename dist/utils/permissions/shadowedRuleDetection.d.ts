import type { ToolPermissionContext } from '../../Tool.js';
import type { PermissionRule, PermissionRuleSource } from './PermissionRule.js';
/**
 * Type of shadowing that makes a rule unreachable
 */
export type ShadowType = 'ask' | 'deny';
/**
 * Represents an unreachable permission rule with explanation
 */
export type UnreachableRule = {
    rule: PermissionRule;
    reason: string;
    shadowedBy: PermissionRule;
    shadowType: ShadowType;
    fix: string;
};
/**
 * Options for detecting unreachable rules
 */
export type DetectUnreachableRulesOptions = {
    /**
     * Whether sandbox auto-allow is enabled for Bash commands.
     * When true, tool-wide Bash ask rules from personal settings don't block
     * specific Bash allow rules because sandboxed commands are auto-allowed.
     */
    sandboxAutoAllowEnabled: boolean;
};
/**
 * Check if a permission rule source is shared (visible to other users).
 * Shared settings include:
 * - projectSettings: Committed to git, shared with team
 * - policySettings: Enterprise-managed, pushed to all users
 * - command: From slash command frontmatter, potentially shared
 *
 * Personal settings include:
 * - userSettings: User's global ~/.claude settings
 * - localSettings: Gitignored per-project settings
 * - cliArg: Runtime CLI arguments
 * - session: In-memory session rules
 * - flagSettings: From --settings flag (runtime)
 */
export declare function isSharedSettingSource(source: PermissionRuleSource): boolean;
/**
 * Detect all unreachable permission rules in the given context.
 *
 * Currently detects:
 * - Allow rules shadowed by tool-wide deny rules (more severe - completely blocked)
 * - Allow rules shadowed by tool-wide ask rules (will always prompt)
 */
export declare function detectUnreachableRules(context: ToolPermissionContext, options: DetectUnreachableRulesOptions): UnreachableRule[];
//# sourceMappingURL=shadowedRuleDetection.d.ts.map