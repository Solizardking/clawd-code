/**
 * Pure-TypeScript bash parser producing tree-sitter-bash-compatible ASTs.
 *
 * Downstream code in parser.ts, ast.ts, prefix.ts, ParsedCommand.ts walks this
 * by field name. startIndex/endIndex are UTF-8 BYTE offsets (not JS string
 * indices).
 *
 * Grammar reference: tree-sitter-bash. Validated against a 3449-input golden
 * corpus generated from the WASM parser.
 */
export type TsNode = {
    type: string;
    text: string;
    startIndex: number;
    endIndex: number;
    children: TsNode[];
};
type ParserModule = {
    parse: (source: string, timeoutMs?: number) => TsNode | null;
};
/** No-op: pure-TS parser needs no async init. Kept for API compatibility. */
export declare function ensureParserInitialized(): Promise<void>;
/** Always succeeds — pure-TS needs no init. */
export declare function getParserModule(): ParserModule | null;
export declare const SHELL_KEYWORDS: Set<string>;
export {};
//# sourceMappingURL=bashParser.d.ts.map