import type { Node } from './parser.js';
import { type TreeSitterAnalysis } from './treeSitterAnalysis.js';
export type OutputRedirection = {
    target: string;
    operator: '>' | '>>';
};
/**
 * Interface for parsed command implementations.
 * Both tree-sitter and regex fallback implementations conform to this.
 */
export interface IParsedCommand {
    readonly originalCommand: string;
    toString(): string;
    getPipeSegments(): string[];
    withoutOutputRedirections(): string;
    getOutputRedirections(): OutputRedirection[];
    /**
     * Returns tree-sitter analysis data if available.
     * Returns null for the regex fallback implementation.
     */
    getTreeSitterAnalysis(): TreeSitterAnalysis | null;
}
/**
 * @deprecated Legacy regex/shell-quote path. Only used when tree-sitter is
 * unavailable. The primary gate is parseForSecurity (ast.ts).
 *
 * Regex-based fallback implementation using shell-quote parser.
 * Used when tree-sitter is not available.
 * Exported for testing purposes.
 */
export declare class RegexParsedCommand_DEPRECATED implements IParsedCommand {
    readonly originalCommand: string;
    constructor(command: string);
    toString(): string;
    getPipeSegments(): string[];
    withoutOutputRedirections(): string;
    getOutputRedirections(): OutputRedirection[];
    getTreeSitterAnalysis(): TreeSitterAnalysis | null;
}
/**
 * Build a TreeSitterParsedCommand from a pre-parsed AST root. Lets callers
 * that already have the tree skip the redundant native.parse that
 * ParsedCommand.parse would do.
 */
export declare function buildParsedCommandFromRoot(command: string, root: Node): IParsedCommand;
/**
 * ParsedCommand provides methods for working with shell commands.
 * Uses tree-sitter when available for quote-aware parsing,
 * falls back to regex-based parsing otherwise.
 */
export declare const ParsedCommand: {
    /**
     * Parse a command string and return a ParsedCommand instance.
     * Returns null if parsing fails completely.
     */
    parse(command: string): Promise<IParsedCommand | null>;
};
//# sourceMappingURL=ParsedCommand.d.ts.map