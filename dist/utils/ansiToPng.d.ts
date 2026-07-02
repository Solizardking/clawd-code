/**
 * Render ANSI-escaped terminal text directly to a PNG image.
 *
 * Replaces the previous ansiToSvg → @resvg/resvg-wasm pipeline. The SVG was
 * just a lossy intermediate format for what is fundamentally a grid of
 * (char, fg-color, bold) cells on a flat background. This module skips SVG
 * entirely: it blits a bundled 24×48 bitmap font directly into an RGBA
 * Uint8Array, then encodes the result as a PNG using node:zlib.
 *
 * Why not resvg-wasm: 2.36MB of embedded WASM, a 2.1MB runtime font load
 * from a hardcoded system path (returning [] → blank screenshots when the
 * font isn't found), and ~224ms per render. This path is ~5–15ms, zero
 * external deps, identical output on mac/linux/windows.
 *
 * Font: Fira Code Regular rasterized at 24×48 with 8-bit anti-aliased alpha
 * (SIL OFL 1.1 — see scripts/LICENSE-FiraCode). Covers printable ASCII plus
 * the unicode chars used by /stats output. Regenerate with:
 *   bun scripts/generate-bitmap-font.ts
 */
import { type AnsiColor } from './ansiToSvg.js';
export type AnsiToPngOptions = {
    /** Integer zoom factor (nearest-neighbor). Default 1 — the font is already rasterized at output resolution. */
    scale?: number;
    /** Horizontal padding in 1× pixels. Default 48. */
    paddingX?: number;
    /** Vertical padding in 1× pixels. Default 48. */
    paddingY?: number;
    /** Corner radius in 1× pixels. Default 16. */
    borderRadius?: number;
    /** Background color. Default: dark gray (same as ansiToSvg). */
    background?: AnsiColor;
};
/**
 * Render ANSI-escaped text directly to a PNG buffer.
 * Returns a Buffer containing a valid PNG (RGBA, 8-bit).
 */
export declare function ansiToPng(ansiText: string, options?: AnsiToPngOptions): Buffer;
//# sourceMappingURL=ansiToPng.d.ts.map