import { ColorDiff, ColorFile, type SyntaxTheme } from 'color-diff-napi';
export type ColorModuleUnavailableReason = 'env';
/**
 * Returns a static reason why the color-diff module is unavailable, or null if available.
 * 'env' = disabled via CLAUDE_CODE_SYNTAX_HIGHLIGHT
 *
 * The TS port of color-diff works in all build modes, so the only way to
 * disable it is via the env var.
 */
export declare function getColorModuleUnavailableReason(): ColorModuleUnavailableReason | null;
export declare function expectColorDiff(): typeof ColorDiff | null;
export declare function expectColorFile(): typeof ColorFile | null;
export declare function getSyntaxTheme(themeName: string): SyntaxTheme | null;
//# sourceMappingURL=colorDiff.d.ts.map