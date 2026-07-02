/**
 * Filter SDK betas to only include allowed ones.
 * Warns about disallowed betas and subscriber restrictions.
 * Returns undefined if no valid betas remain or if user is a subscriber.
 */
export declare function filterAllowedSdkBetas(sdkBetas: string[] | undefined): string[] | undefined;
export declare function modelSupportsISP(model: string): boolean;
export declare function modelSupportsContextManagement(model: string): boolean;
export declare function modelSupportsStructuredOutputs(model: string): boolean;
export declare function modelSupportsAutoMode(model: string): boolean;
/**
 * Get the correct tool search beta header for the current API provider.
 * - Claude API / Foundry: advanced-tool-use-2025-11-20
 * - Vertex AI / Bedrock: tool-search-tool-2025-10-19
 */
export declare function getToolSearchBetaHeader(): string;
/**
 * Check if experimental betas should be included.
 * These are betas that are only available on firstParty provider
 * and may not be supported by proxies or other providers.
 */
export declare function shouldIncludeFirstPartyOnlyBetas(): boolean;
/**
 * Global-scope prompt caching is firstParty only. Foundry is excluded because
 * GrowthBook never bucketed Foundry users into the rollout experiment — the
 * treatment data is firstParty-only.
 */
export declare function shouldUseGlobalCacheScope(): boolean;
export declare const getAllModelBetas: any;
export declare const getModelBetas: any;
export declare const getBedrockExtraBodyParamsBetas: any;
/**
 * Merge SDK-provided betas with auto-detected model betas.
 * SDK betas are read from global state (set via setSdkBetas in main.tsx).
 * The betas are pre-filtered by filterAllowedSdkBetas which handles
 * subscriber checks and allowlist validation with warnings.
 *
 * @param options.isAgenticQuery - When true, ensures the beta headers needed
 *   for agentic queries are present. For non-Haiku models these are already
 *   included by getAllModelBetas(); for Haiku they're excluded since
 *   non-agentic calls (compaction, classifiers, token estimation) don't need them.
 */
export declare function getMergedBetas(model: string, options?: {
    isAgenticQuery?: boolean;
}): string[];
export declare function clearBetasCaches(): void;
//# sourceMappingURL=betas.d.ts.map