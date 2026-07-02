import type { FeedConfig } from './Feed.js';
/**
 * Whether to show the overage credit upsell on any surface.
 *
 * Eligibility comes entirely from the backend GET /overage_credit_grant
 * response — the CLI doesn't replicate tier/threshold/role checks. The
 * backend returns available: false for Team members who aren't admins,
 * so they don't see an upsell they can't act on.
 *
 * isEligibleForOverageCreditGrant — just the backend eligibility. Use for
 *   persistent reference surfaces (/usage) where the info should show
 *   whenever eligible, no impression cap.
 * shouldShowOverageCreditUpsell — adds the 3-impression cap and
 *   hasVisitedExtraUsage dismiss. Use for promotional surfaces
 *   (welcome feed, tips).
 */
export declare function isEligibleForOverageCreditGrant(): boolean;
export declare function shouldShowOverageCreditUpsell(): boolean;
/**
 * Kick off a background fetch if the cache is empty. Safe to call
 * unconditionally on mount — it no-ops if cache is fresh.
 */
export declare function maybeRefreshOverageCreditCache(): void;
export declare function useShowOverageCreditUpsell(): any;
export declare function incrementOverageCreditUpsellSeenCount(): void;
export declare function OverageCreditUpsell(t0: any): any;
/**
 * Feed config for the homescreen rotating feed. Mirrors
 * createGuestPassesFeed in feedConfigs.tsx.
 *
 * Copy from "OC & Bulk Overages copy" doc (#4 — CLI Welcome screen).
 * Char budgets: title ≤19, subtitle ≤48.
 */
export declare function createOverageCreditFeed(): FeedConfig;
//# sourceMappingURL=OverageCreditUpsell.d.ts.map