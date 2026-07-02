import type { ReactNode } from 'react';
import type { Color, Styles } from '../../ink/styles.js';
import { type Theme } from '../../utils/theme.js';
/** Colors uncolored ThemedText in the subtree. Precedence: explicit `color` >
 *  this > dimColor. Crosses Box boundaries (Ink's style cascade doesn't). */
export declare const TextHoverColorContext: any;
export type Props = {
    /**
     * Change text color. Accepts a theme key or raw color value.
     */
    readonly color?: keyof Theme | Color;
    /**
     * Same as `color`, but for background. Must be a theme key.
     */
    readonly backgroundColor?: keyof Theme;
    /**
     * Dim the color using the theme's inactive color.
     * This is compatible with bold (unlike ANSI dim).
     */
    readonly dimColor?: boolean;
    /**
     * Make the text bold.
     */
    readonly bold?: boolean;
    /**
     * Make the text italic.
     */
    readonly italic?: boolean;
    /**
     * Make the text underlined.
     */
    readonly underline?: boolean;
    /**
     * Make the text crossed with a line.
     */
    readonly strikethrough?: boolean;
    /**
     * Inverse background and foreground colors.
     */
    readonly inverse?: boolean;
    /**
     * This property tells Ink to wrap or truncate text if its width is larger than container.
     * If `wrap` is passed (by default), Ink will wrap text and split it into multiple lines.
     * If `truncate-*` is passed, Ink will truncate text instead, which will result in one line of text with the rest cut off.
     */
    readonly wrap?: Styles['textWrap'];
    readonly children?: ReactNode;
};
/**
 * Theme-aware Text component that resolves theme color keys to raw colors.
 * This wraps the base Text component with theme resolution.
 */
export default function ThemedText(t0: any): any;
//# sourceMappingURL=ThemedText.d.ts.map