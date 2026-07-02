import { z } from 'zod/v4';
/**
 * Schema for the policy limits API response
 * Only blocked policies are included. If a policy key is absent, it's allowed.
 */
export declare const PolicyLimitsResponseSchema: () => any;
export type PolicyLimitsResponse = z.infer<ReturnType<typeof PolicyLimitsResponseSchema>>;
/**
 * Result of fetching policy limits
 */
export type PolicyLimitsFetchResult = {
    success: boolean;
    restrictions?: PolicyLimitsResponse['restrictions'] | null;
    etag?: string;
    error?: string;
    skipRetry?: boolean;
};
//# sourceMappingURL=types.d.ts.map