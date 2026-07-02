/**
 * ANSI Parser - Semantic Action Generator
 *
 * A streaming parser for ANSI escape sequences that produces semantic actions.
 * Uses the tokenizer for escape sequence boundary detection, then interprets
 * each sequence to produce structured actions.
 *
 * Key design decisions:
 * - Streaming: can process input incrementally
 * - Semantic output: produces structured actions, not string tokens
 * - Style tracking: maintains current text style state
 */
import type { Action, TextStyle } from './types.js';
/**
 * Parser class - maintains state for streaming/incremental parsing
 *
 * Usage:
 * ```typescript
 * const parser = new Parser()
 * const actions1 = parser.feed('partial\x1b[')
 * const actions2 = parser.feed('31mred')  // state maintained internally
 * ```
 */
export declare class Parser {
    private tokenizer;
    style: TextStyle;
    inLink: boolean;
    linkUrl: string | undefined;
    reset(): void;
    /** Feed input and get resulting actions */
    feed(input: string): Action[];
    private processToken;
    private processText;
    private processSequence;
}
//# sourceMappingURL=parser.d.ts.map