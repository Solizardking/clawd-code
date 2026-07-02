import { type AnsiToPngOptions } from './ansiToPng.js';
/**
 * Copies an image (from ANSI text) to the system clipboard.
 * Supports macOS, Linux (with xclip/xsel), and Windows.
 *
 * Pure-TS pipeline: ANSI text → bitmap-font render → PNG encode. No WASM,
 * no system fonts, so this works in every build (native and JS).
 */
export declare function copyAnsiToClipboard(ansiText: string, options?: AnsiToPngOptions): Promise<{
    success: boolean;
    message: string;
}>;
//# sourceMappingURL=screenshotClipboard.d.ts.map