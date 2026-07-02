import { type EffortLevel, type EffortValue } from '../utils/effort.js';
/**
 * Build the text for the effort-changed notification, e.g. "◐ medium · /effort".
 * Returns undefined if the model doesn't support effort.
 */
export declare function getEffortNotificationText(effortValue: EffortValue | undefined, model: string): string | undefined;
export declare function effortLevelToSymbol(level: EffortLevel): string;
//# sourceMappingURL=EffortIndicator.d.ts.map