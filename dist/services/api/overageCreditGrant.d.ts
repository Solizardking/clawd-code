export type OverageCreditGrantInfo = {
    available: boolean;
    eligible: boolean;
    granted: boolean;
    amount_minor_units: number | null;
    currency: string | null;
};
type CachedGrantEntry = {
    info: OverageCreditGrantInfo;
    timestamp: number;
};
/**
 * Get cached grant info. Returns null if no cache or cache is stale.
 * Callers should render nothing (not block) when this returns null —
 * refreshOverageCreditGrantCache fires lazily to populate it.
 */
export declare function getCachedOverageCreditGrant(): OverageCreditGrantInfo | null;
/**
 * Drop the current org's cached entry so the next read refetches.
 * Leaves other orgs' entries intact.
 */
export declare function invalidateOverageCreditGrantCache(): void;
/**
 * Fetch and cache grant info. Fire-and-forget; call when an upsell surface
 * is about to render and the cache is empty.
 */
export declare function refreshOverageCreditGrantCache(): Promise<void>;
/**
 * Format the grant amount for display. Returns null if amount isn't available
 * (not eligible, or currency we don't know how to format).
 */
export declare function formatGrantAmount(info: OverageCreditGrantInfo): string | null;
export type { CachedGrantEntry as OverageCreditGrantCacheEntry };
//# sourceMappingURL=overageCreditGrant.d.ts.map