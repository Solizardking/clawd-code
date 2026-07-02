import type { AppState } from '../state/AppState.js';
export type AttributionTexts = {
    commit: string;
    pr: string;
};
/**
 * Returns attribution text for commits and PRs based on user settings.
 * Handles:
 * - Dynamic model name via getPublicModelName()
 * - Custom attribution settings (settings.attribution.commit/pr)
 * - Backward compatibility with deprecated includeCoAuthoredBy setting
 * - Remote mode: returns session URL for attribution
 */
export declare function getAttributionTexts(): AttributionTexts;
/**
 * Count user messages with visible text content in a list of non-sidechain messages.
 * Excludes tool_result blocks, terminal output, and empty messages.
 *
 * Callers should pass messages already filtered to exclude sidechain messages.
 */
export declare function countUserPromptsInMessages(messages: ReadonlyArray<{
    type: string;
    message?: {
        content?: unknown;
    };
}>): number;
/**
 * Get enhanced PR attribution text with Claude contribution stats.
 *
 * Format: "🤖 Generated with Claude Code (93% 3-shotted by claude-opus-4-5)"
 *
 * Rules:
 * - Shows Claude contribution percentage from commit attribution
 * - Shows N-shotted where N is the prompt count (1-shotted, 2-shotted, etc.)
 * - Shows short model name (e.g., claude-opus-4-5)
 * - Returns default attribution if stats can't be computed
 *
 * @param getAppState Function to get the current AppState (from command context)
 */
export declare function getEnhancedPRAttribution(getAppState: () => AppState): Promise<string>;
//# sourceMappingURL=attribution.d.ts.map