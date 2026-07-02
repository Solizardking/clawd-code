/**
 * SGR (Select Graphic Rendition) Parser
 *
 * Parses SGR parameters and applies them to a TextStyle.
 * Handles both semicolon (;) and colon (:) separated parameters.
 */
import type { TextStyle } from './types.js';
export declare function applySGR(paramStr: string, style: TextStyle): TextStyle;
//# sourceMappingURL=sgr.d.ts.map