/**
 * Converts ANSI-escaped terminal text to SVG format
 * Supports basic ANSI color codes (foreground colors)
 */
export type AnsiColor = {
    r: number;
    g: number;
    b: number;
};
export declare const DEFAULT_FG: AnsiColor;
export declare const DEFAULT_BG: AnsiColor;
export type TextSpan = {
    text: string;
    color: AnsiColor;
    bold: boolean;
};
export type ParsedLine = TextSpan[];
/**
 * Parse ANSI escape sequences from text
 * Supports:
 * - Basic colors (30-37, 90-97)
 * - 256-color mode (38;5;n)
 * - 24-bit true color (38;2;r;g;b)
 */
export declare function parseAnsi(text: string): ParsedLine[];
export type AnsiToSvgOptions = {
    fontFamily?: string;
    fontSize?: number;
    lineHeight?: number;
    paddingX?: number;
    paddingY?: number;
    backgroundColor?: string;
    borderRadius?: number;
};
/**
 * Convert ANSI text to SVG
 * Uses <tspan> elements within a single <text> per line so the renderer
 * handles character spacing natively (no manual charWidth calculation)
 */
export declare function ansiToSvg(ansiText: string, options?: AnsiToSvgOptions): string;
//# sourceMappingURL=ansiToSvg.d.ts.map