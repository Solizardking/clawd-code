export declare function getHooksSources(): string[];
/**
 * Get which setting sources have bash allow rules.
 * Returns an array of file paths that have bash permissions.
 */
export declare function getBashPermissionSources(): string[];
/**
 * Format a list of items with proper "and" conjunction.
 * @param items - Array of items to format
 * @param limit - Optional limit for how many items to show before summarizing (ignored if 0)
 */
export declare function formatListWithAnd(items: string[], limit?: number): string;
/**
 * Get which setting sources have otelHeadersHelper configured.
 * Returns an array of file paths that have otelHeadersHelper.
 */
export declare function getOtelHeadersHelperSources(): string[];
/**
 * Get which setting sources have apiKeyHelper configured.
 * Returns an array of file paths that have apiKeyHelper.
 */
export declare function getApiKeyHelperSources(): string[];
/**
 * Get which setting sources have AWS commands configured.
 * Returns an array of file paths that have awsAuthRefresh or awsCredentialExport.
 */
export declare function getAwsCommandsSources(): string[];
/**
 * Get which setting sources have GCP commands configured.
 * Returns an array of file paths that have gcpAuthRefresh.
 */
export declare function getGcpCommandsSources(): string[];
/**
 * Get which setting sources have dangerous environment variables configured.
 * Returns an array of file paths that have env vars not in SAFE_ENV_VARS.
 */
export declare function getDangerousEnvVarsSources(): string[];
//# sourceMappingURL=utils.d.ts.map