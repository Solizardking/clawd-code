export declare function redactSecrets(s: string): string;
/** Truncate a string for debug logging, collapsing newlines. */
export declare function debugTruncate(s: string): string;
/** Truncate a JSON-serializable value for debug logging. */
export declare function debugBody(data: unknown): string;
/**
 * Extract a descriptive error message from an axios error (or any error).
 * For HTTP errors, appends the server's response body message if available,
 * since axios's default message only includes the status code.
 */
export declare function describeAxiosError(err: unknown): string;
/**
 * Extract the HTTP status code from an axios error, if present.
 * Returns undefined for non-HTTP errors (e.g. network failures).
 */
export declare function extractHttpStatus(err: unknown): number | undefined;
/**
 * Pull a human-readable message out of an API error response body.
 * Checks `data.message` first, then `data.error.message`.
 */
export declare function extractErrorDetail(data: unknown): string | undefined;
/**
 * Log a bridge init skip — debug message + `tengu_bridge_repl_skipped`
 * analytics event. Centralizes the event name and the AnalyticsMetadata
 * cast so call sites don't each repeat the 5-line boilerplate.
 */
export declare function logBridgeSkip(reason: string, debugMsg?: string, v2?: boolean): void;
//# sourceMappingURL=debugUtils.d.ts.map