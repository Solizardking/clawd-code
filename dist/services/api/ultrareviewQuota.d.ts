export type UltrareviewQuotaResponse = {
    reviews_used: number;
    reviews_limit: number;
    reviews_remaining: number;
    is_overage: boolean;
};
/**
 * Peek the ultrareview quota for display and nudge decisions. Consume
 * happens server-side at session creation. Null when not a subscriber or
 * the endpoint errors.
 */
export declare function fetchUltrareviewQuota(): Promise<UltrareviewQuotaResponse | null>;
//# sourceMappingURL=ultrareviewQuota.d.ts.map