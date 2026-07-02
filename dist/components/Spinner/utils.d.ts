import type { RGBColor as RGBColorString } from '../../ink/styles.js';
import type { RGBColor as RGBColorType } from './types.js';
export declare function getDefaultCharacters(): string[];
export declare function interpolateColor(color1: RGBColorType, color2: RGBColorType, t: number): RGBColorType;
export declare function toRGBColor(color: RGBColorType): RGBColorString;
export declare function hueToRgb(hue: number): RGBColorType;
export declare function parseRGB(colorStr: string): RGBColorType | null;
//# sourceMappingURL=utils.d.ts.map