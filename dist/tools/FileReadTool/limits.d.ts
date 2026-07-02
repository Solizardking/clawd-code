export declare const DEFAULT_MAX_OUTPUT_TOKENS = 25000;
export type FileReadingLimits = {
    maxTokens: number;
    maxSizeBytes: number;
    includeMaxSizeInPrompt?: boolean;
    targetedRangeNudge?: boolean;
};
/**
 * Default limits for Read tool when the ToolUseContext doesn't supply an
 * override. Memoized so the GrowthBook value is fixed at first call — avoids
 * the cap changing mid-session as the flag refreshes in the background.
 *
 * Precedence for maxTokens: env var > GrowthBook > DEFAULT_MAX_OUTPUT_TOKENS.
 * (Env var is a user-set override, should beat experiment infrastructure.)
 *
 * Defensive: each field is individually validated; invalid values fall
 * through to the hardcoded defaults (no route to cap=0).
 */
export declare const getDefaultFileReadingLimits: any;
//# sourceMappingURL=limits.d.ts.map