import type { Color, TextStyles } from './styles.js';
export declare const CHALK_BOOSTED_FOR_XTERMJS: boolean;
export declare const CHALK_CLAMPED_FOR_TMUX: boolean;
export type ColorType = 'foreground' | 'background';
export declare const colorize: (str: string, color: string | undefined, type: ColorType) => string;
/**
 * Apply TextStyles to a string using chalk.
 * This is the inverse of parsing ANSI codes - we generate them from structured styles.
 * Theme resolution happens at component layer, not here.
 */
export declare function applyTextStyles(text: string, styles: TextStyles): string;
/**
 * Apply a raw color value to text.
 * Theme resolution should happen at component layer, not here.
 */
export declare function applyColor(text: string, color: Color | undefined): string;
//# sourceMappingURL=colorize.d.ts.map