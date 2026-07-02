/**
 * Pure TypeScript port of vendor/color-diff-src.
 *
 * The Rust version uses syntect+bat for syntax highlighting and the similar
 * crate for word diffing. This port uses highlight.js (already a dep via
 * cli-highlight) and the diff npm package's diffArrays.
 *
 * API matches vendor/color-diff-src/index.d.ts exactly so callers don't change.
 *
 * Key semantic differences from the native module:
 * - Syntax highlighting uses highlight.js. Scope colors were measured from
 *   syntect's output so most tokens match, but hljs's grammar has gaps:
 *   plain identifiers and operators like `=` `:` aren't scoped, so they
 *   render in default fg instead of white/pink. Output structure (line
 *   numbers, markers, backgrounds, word-diff) is identical.
 * - BAT_THEME env support is a stub: highlight.js has no bat theme set, so
 *   getSyntaxTheme always returns the default for the given Claude theme.
 */
export type Hunk = {
    oldStart: number;
    oldLines: number;
    newStart: number;
    newLines: number;
    lines: string[];
};
export type SyntaxTheme = {
    theme: string;
    source: string | null;
};
export type NativeModule = {
    ColorDiff: typeof ColorDiff;
    ColorFile: typeof ColorFile;
    getSyntaxTheme: (themeName: string) => SyntaxTheme;
};
type Color = {
    r: number;
    g: number;
    b: number;
    a: number;
};
type ColorMode = 'truecolor' | 'color256' | 'ansi';
declare function detectColorMode(theme: string): ColorMode;
declare function ansi256FromRgb(r: number, g: number, b: number): number;
declare function colorToEscape(c: Color, fg: boolean, mode: ColorMode): string;
type Marker = '+' | '-' | ' ';
declare function detectLanguage(filePath: string, firstLine: string | null): string | null;
type Range = {
    start: number;
    end: number;
};
declare function tokenize(text: string): string[];
declare function findAdjacentPairs(markers: Marker[]): [number, number][];
declare function wordDiffStrings(oldStr: string, newStr: string): [Range[], Range[]];
export declare class ColorDiff {
    private hunk;
    private filePath;
    private firstLine;
    private prefixContent;
    constructor(hunk: Hunk, firstLine: string | null, filePath: string, prefixContent?: string | null);
    render(themeName: string, width: number, dim: boolean): string[] | null;
}
export declare class ColorFile {
    private code;
    private filePath;
    constructor(code: string, filePath: string);
    render(themeName: string, width: number, dim: boolean): string[] | null;
}
export declare function getSyntaxTheme(themeName: string): SyntaxTheme;
export declare function getNativeModule(): NativeModule | null;
export type { ColorDiff as ColorDiffClass, ColorFile as ColorFileClass };
export declare const __test: {
    tokenize: typeof tokenize;
    findAdjacentPairs: typeof findAdjacentPairs;
    wordDiffStrings: typeof wordDiffStrings;
    ansi256FromRgb: typeof ansi256FromRgb;
    colorToEscape: typeof colorToEscape;
    detectColorMode: typeof detectColorMode;
    detectLanguage: typeof detectLanguage;
};
//# sourceMappingURL=index.d.ts.map