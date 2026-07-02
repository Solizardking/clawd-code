import type { RenderOptions } from '../ink.js';
/**
 * Returns base render options for Ink, including stdin override when needed.
 * Use this for all render() calls to ensure piped input works correctly.
 *
 * @param exitOnCtrlC - Whether to exit on Ctrl+C (usually false for dialogs)
 */
export declare function getBaseRenderOptions(exitOnCtrlC?: boolean): RenderOptions;
//# sourceMappingURL=renderOptions.d.ts.map