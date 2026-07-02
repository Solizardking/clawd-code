import type { Tip, TipContext } from './types.js';
export declare function selectTipWithLongestTimeSinceShown(availableTips: Tip[]): Tip | undefined;
export declare function getTipToShowOnSpinner(context?: TipContext): Promise<Tip | undefined>;
export declare function recordShownTip(tip: Tip): void;
//# sourceMappingURL=tipScheduler.d.ts.map