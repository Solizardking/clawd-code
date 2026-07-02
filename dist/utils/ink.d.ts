import type { TextProps } from '../ink.js';
/**
 * Convert a color string to Ink's TextProps['color'] format.
 * Colors are typically AgentColorName values like 'blue', 'green', etc.
 * This converts them to theme keys so they respect the current theme.
 * Falls back to the raw ANSI color if the color is not a known agent color.
 */
export declare function toInkColor(color: string | undefined): TextProps['color'];
//# sourceMappingURL=ink.d.ts.map