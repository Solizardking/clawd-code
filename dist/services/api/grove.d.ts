export type AccountSettings = {
    grove_enabled: boolean | null;
    grove_notice_viewed_at: string | null;
};
export type GroveConfig = {
    grove_enabled: boolean;
    domain_excluded: boolean;
    notice_is_grace_period: boolean;
    notice_reminder_frequency: number | null;
};
/**
 * Result type that distinguishes between API failure and success.
 * - success: true means API call succeeded (data may still contain null fields)
 * - success: false means API call failed after retry
 */
export type ApiResult<T> = {
    success: true;
    data: T;
} | {
    success: false;
};
/**
 * Get the current Grove settings for the user account.
 * Returns ApiResult to distinguish between API failure and success.
 * Uses existing OAuth 401 retry, then returns failure if that doesn't help.
 *
 * Memoized for the session to avoid redundant per-render requests.
 * Cache is invalidated in updateGroveSettings() so post-toggle reads are fresh.
 */
export declare const getGroveSettings: any;
/**
 * Mark that the Grove notice has been viewed by the user
 */
export declare function markGroveNoticeViewed(): Promise<void>;
/**
 * Update Grove settings for the user account
 */
export declare function updateGroveSettings(groveEnabled: boolean): Promise<void>;
/**
 * Check if user is qualified for Grove (non-blocking, cache-first).
 *
 * This function never blocks on network - it returns cached data immediately
 * and fetches in the background if needed. On cold start (no cache), it returns
 * false and the Grove dialog won't show until the next session.
 */
export declare function isQualifiedForGrove(): Promise<boolean>;
/**
 * Get Grove Statsig configuration from the API.
 * Returns ApiResult to distinguish between API failure and success.
 * Uses existing OAuth 401 retry, then returns failure if that doesn't help.
 */
export declare const getGroveNoticeConfig: any;
/**
 * Determines whether the Grove dialog should be shown.
 * Returns false if either API call failed (after retry) - we hide the dialog on API failure.
 */
export declare function calculateShouldShowGrove(settingsResult: ApiResult<AccountSettings>, configResult: ApiResult<GroveConfig>, showIfAlreadyViewed: boolean): boolean;
export declare function checkGroveForNonInteractive(): Promise<void>;
//# sourceMappingURL=grove.d.ts.map