import type { ReferralCampaign, ReferralEligibilityResponse, ReferralRedemptionsResponse, ReferrerRewardInfo } from '../oauth/types.js';
export declare function fetchReferralEligibility(campaign?: ReferralCampaign): Promise<ReferralEligibilityResponse>;
export declare function fetchReferralRedemptions(campaign?: string): Promise<ReferralRedemptionsResponse>;
/**
 * Check cached passes eligibility from GlobalConfig
 * Returns current cached state and cache status
 */
export declare function checkCachedPassesEligibility(): {
    eligible: boolean;
    needsRefresh: boolean;
    hasCache: boolean;
};
export declare function formatCreditAmount(reward: ReferrerRewardInfo): string;
/**
 * Get cached referrer reward info from eligibility cache
 * Returns the reward info if the user is in a v1 campaign, null otherwise
 */
export declare function getCachedReferrerReward(): ReferrerRewardInfo | null;
/**
 * Get the cached remaining passes count from eligibility cache
 * Returns the number of remaining passes, or null if not available
 */
export declare function getCachedRemainingPasses(): number | null;
/**
 * Fetch passes eligibility and store in GlobalConfig
 * Returns the fetched response or null on error
 */
export declare function fetchAndStorePassesEligibility(): Promise<ReferralEligibilityResponse | null>;
/**
 * Get cached passes eligibility data or fetch if needed
 * Main entry point for all eligibility checks
 *
 * This function never blocks on network - it returns cached data immediately
 * and fetches in the background if needed. On cold start (no cache), it returns
 * null and the passes command won't be available until the next session.
 */
export declare function getCachedOrFetchPassesEligibility(): Promise<ReferralEligibilityResponse | null>;
/**
 * Prefetch passes eligibility on startup
 */
export declare function prefetchPassesEligibility(): Promise<void>;
//# sourceMappingURL=referral.d.ts.map