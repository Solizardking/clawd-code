import type { BackgroundTaskState } from './types.js';
/**
 * Produces the compact footer-pill label for a set of background tasks.
 * Used by both the footer pill and the turn-duration transcript line so the
 * two surfaces agree on terminology.
 */
export declare function getPillLabel(tasks: BackgroundTaskState[]): string;
/**
 * True when the pill should show the dimmed " · ↓ to view" call-to-action.
 * Per the state diagram: only the two attention states (needs_input,
 * plan_ready) surface the CTA; plain running shows just the diamond + label.
 */
export declare function pillNeedsCta(tasks: BackgroundTaskState[]): boolean;
//# sourceMappingURL=pillLabel.d.ts.map