/**
 * Tree-sitter AST analysis utilities for bash command security validation.
 *
 * These functions extract security-relevant information from tree-sitter
 * parse trees, providing more accurate analysis than regex/shell-quote
 * parsing. Each function takes a root node and command string, and returns
 * structured data that can be used by security validators.
 *
 * The native NAPI parser returns plain JS objects — no cleanup needed.
 */
export type QuoteContext = {
    /** Command text with single-quoted content removed (double-quoted content preserved) */
    withDoubleQuotes: string;
    /** Command text with all quoted content removed */
    fullyUnquoted: string;
    /** Like fullyUnquoted but preserves quote characters (', ") */
    unquotedKeepQuoteChars: string;
};
export type CompoundStructure = {
    /** Whether the command has compound operators (&&, ||, ;) at the top level */
    hasCompoundOperators: boolean;
    /** Whether the command has pipelines */
    hasPipeline: boolean;
    /** Whether the command has subshells */
    hasSubshell: boolean;
    /** Whether the command has command groups ({...}) */
    hasCommandGroup: boolean;
    /** Top-level compound operator types found */
    operators: string[];
    /** Individual command segments split by compound operators */
    segments: string[];
};
export type DangerousPatterns = {
    /** Has $() or backtick command substitution (outside quotes that would make it safe) */
    hasCommandSubstitution: boolean;
    /** Has <() or >() process substitution */
    hasProcessSubstitution: boolean;
    /** Has ${...} parameter expansion */
    hasParameterExpansion: boolean;
    /** Has heredoc */
    hasHeredoc: boolean;
    /** Has comment */
    hasComment: boolean;
};
export type TreeSitterAnalysis = {
    quoteContext: QuoteContext;
    compoundStructure: CompoundStructure;
    /** Whether actual operator nodes (;, &&, ||) exist — if false, \; is just a word argument */
    hasActualOperatorNodes: boolean;
    dangerousPatterns: DangerousPatterns;
};
/**
 * Extract quote context from the tree-sitter AST.
 * Replaces the manual character-by-character extractQuotedContent() function.
 *
 * Tree-sitter node types:
 * - raw_string: single-quoted ('...')
 * - string: double-quoted ("...")
 * - ansi_c_string: ANSI-C quoting ($'...') — span includes the leading $
 * - heredoc_redirect: QUOTED heredocs only (<<'EOF', <<"EOF", <<\EOF) —
 *   the full redirect span (<<, delimiters, body, newlines) is stripped
 *   since the body is literal text in bash (no expansion). UNQUOTED
 *   heredocs (<<EOF) are left in place since bash expands $(...)/${...}
 *   inside them, and validators need to see those patterns. Matches the
 *   sync path's extractHeredocs({ quotedOnly: true }).
 */
export declare function extractQuoteContext(rootNode: unknown, command: string): QuoteContext;
/**
 * Extract compound command structure from the AST.
 * Replaces isUnsafeCompoundCommand() and splitCommand() for tree-sitter path.
 */
export declare function extractCompoundStructure(rootNode: unknown, command: string): CompoundStructure;
/**
 * Check whether the AST contains actual operator nodes (;, &&, ||).
 *
 * This is the key function for eliminating the `find -exec \;` false positive.
 * Tree-sitter parses `\;` as part of a `word` node (an argument to find),
 * NOT as a `;` operator. So if no actual `;` operator nodes exist in the AST,
 * there are no compound operators and hasBackslashEscapedOperator() can be skipped.
 */
export declare function hasActualOperatorNodes(rootNode: unknown): boolean;
/**
 * Extract dangerous pattern information from the AST.
 */
export declare function extractDangerousPatterns(rootNode: unknown): DangerousPatterns;
/**
 * Perform complete tree-sitter analysis of a command.
 * Extracts all security-relevant data from the AST in one pass.
 * This data must be extracted before tree.delete() is called.
 */
export declare function analyzeCommand(rootNode: unknown, command: string): TreeSitterAnalysis;
//# sourceMappingURL=treeSitterAnalysis.d.ts.map