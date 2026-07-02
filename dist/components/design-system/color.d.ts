import { type ColorType } from '../../ink/colorize.js';
import type { Color } from '../../ink/styles.js';
import { type Theme, type ThemeName } from '../../utils/theme.js';
/**
 * Curried theme-aware color function. Resolves theme keys to raw color
 * values before delegating to the ink renderer's colorize.
 */
export declare function color(c: keyof Theme | Color | undefined, theme: ThemeName, type?: ColorType): (text: string) => string;
//# sourceMappingURL=color.d.ts.map