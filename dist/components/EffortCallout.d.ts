export declare function EffortCallout(t0: any): any;
/**
 * Check whether to show the effort callout.
 *
 * Audience:
 * - Pro: already had medium default; show unless they saw v1 (effortCalloutDismissed)
 * - Max/Team: getting medium via tengu_grey_step2 config; show when enabled
 * - Everyone else: mark as dismissed so it never shows
 */
export declare function shouldShowEffortCallout(model: string): boolean;
//# sourceMappingURL=EffortCallout.d.ts.map