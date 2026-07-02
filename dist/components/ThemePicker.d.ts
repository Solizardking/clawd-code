import type { ThemeSetting } from '../utils/theme.js';
export type ThemePickerProps = {
    onThemeSelect: (setting: ThemeSetting) => void;
    showIntroText?: boolean;
    helpText?: string;
    showHelpTextBelow?: boolean;
    hideEscToCancel?: boolean;
    /** Skip exit handling when running in a context that already has it (e.g., onboarding) */
    skipExitHandling?: boolean;
    /** Called when the user cancels (presses Escape). If skipExitHandling is true and this is provided, it will be called instead of just saving the preview. */
    onCancel?: () => void;
};
export declare function ThemePicker(t0: any): any;
//# sourceMappingURL=ThemePicker.d.ts.map