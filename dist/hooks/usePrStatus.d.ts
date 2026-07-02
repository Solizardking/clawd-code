import { type PrReviewState } from '../utils/ghPrStatus.js';
export type PrStatusState = {
    number: number | null;
    url: string | null;
    reviewState: PrReviewState | null;
    lastUpdated: number;
};
/**
 * Polls PR review status every 60s while the session is active.
 * When no interaction is detected for 60 minutes, the loop stops — no
 * timers remain. React re-runs the effect when isLoading changes
 * (turn starts/ends), restarting the loop. Effect setup schedules
 * the next poll relative to the last fetch time so turn boundaries
 * don't spawn `gh` more than once per interval. Disables permanently
 * if a fetch exceeds 4s.
 *
 * Pass `enabled: false` to skip polling entirely (hook still must be
 * called unconditionally to satisfy the rules of hooks).
 */
export declare function usePrStatus(isLoading: boolean, enabled?: boolean): PrStatusState;
//# sourceMappingURL=usePrStatus.d.ts.map