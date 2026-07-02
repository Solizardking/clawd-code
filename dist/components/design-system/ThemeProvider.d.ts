import React from 'react';
import type { ThemeSetting } from '../../utils/theme.js';
type Props = {
    children: React.ReactNode;
    initialState?: ThemeSetting;
    onThemeSave?: (setting: ThemeSetting) => void;
};
export declare function ThemeProvider({ children, initialState, onThemeSave }: Props): any;
/**
 * Returns the resolved theme for rendering (never 'auto') and a setter that
 * accepts any ThemeSetting (including 'auto').
 */
export declare function useTheme(): any;
/**
 * Returns the raw theme setting as stored in config. Use this in UI that
 * needs to show 'auto' as a distinct choice (e.g., ThemePicker).
 */
export declare function useThemeSetting(): any;
export declare function usePreviewTheme(): any;
export {};
//# sourceMappingURL=ThemeProvider.d.ts.map