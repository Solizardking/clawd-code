type EnvLike = Record<string, string | undefined>;
/**
 * Get the default timeout for bash operations in milliseconds
 * Checks BASH_DEFAULT_TIMEOUT_MS environment variable or returns 2 minutes default
 * @param env Environment variables to check (defaults to process.env for production use)
 */
export declare function getDefaultBashTimeoutMs(env?: EnvLike): number;
/**
 * Get the maximum timeout for bash operations in milliseconds
 * Checks BASH_MAX_TIMEOUT_MS environment variable or returns 10 minutes default
 * @param env Environment variables to check (defaults to process.env for production use)
 */
export declare function getMaxBashTimeoutMs(env?: EnvLike): number;
export {};
//# sourceMappingURL=timeouts.d.ts.map