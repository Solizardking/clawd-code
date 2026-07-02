/**
 * AST-based bash command analysis using tree-sitter.
 *
 * This module replaces the shell-quote + hand-rolled char-walker approach in
 * bashSecurity.ts / commands.ts. Instead of detecting parser differentials
 * one-by-one, we parse with tree-sitter-bash and walk the tree with an
 * EXPLICIT allowlist of node types. Any node type not in the allowlist causes
 * the entire command to be classified as 'too-complex', which means it goes
 * through the normal permission prompt flow.
 *
 * The key design property is FAIL-CLOSED: we never interpret structure we
 * don't understand. If tree-sitter produces a node we haven't explicitly
 * allowlisted, we refuse to extract argv and the caller must ask the user.
 *
 * This is NOT a sandbox. It does not prevent dangerous commands from running.
 * It answers exactly one question: "Can we produce a trustworthy argv[] for
 * each simple command in this string?" If yes, downstream code can match
 * argv[0] against permission rules and flag allowlists. If no, ask the user.
 */
import type { Node } from './parser.js';
import { PARSE_ABORTED } from './parser.js';
export type Redirect = {
    op: '>' | '>>' | '<' | '<<' | '>&' | '>|' | '<&' | '&>' | '&>>' | '<<<';
    target: string;
    fd?: number;
};
export type SimpleCommand = {
    /** argv[0] is the command name, rest are arguments with quotes already resolved */
    argv: string[];
    /** Leading VAR=val assignments */
    envVars: {
        name: string;
        value: string;
    }[];
    /** Output/input redirects */
    redirects: Redirect[];
    /** Original source span for this command (for UI display) */
    text: string;
};
export type ParseForSecurityResult = {
    kind: 'simple';
    commands: SimpleCommand[];
} | {
    kind: 'too-complex';
    reason: string;
    nodeType?: string;
} | {
    kind: 'parse-unavailable';
};
export declare function nodeTypeId(nodeType: string | undefined): number;
/**
 * Parse a bash command string and extract a flat list of simple commands.
 * Returns 'too-complex' if the command uses any shell feature we can't
 * statically analyze. Returns 'parse-unavailable' if tree-sitter WASM isn't
 * loaded — caller should fall back to conservative behavior.
 */
export declare function parseForSecurity(cmd: string): Promise<ParseForSecurityResult>;
/**
 * Same as parseForSecurity but takes a pre-parsed AST root so callers that
 * need the tree for other purposes can parse once and share. Pre-checks
 * still run on `cmd` — they catch tree-sitter/bash differentials that a
 * successful parse doesn't.
 */
export declare function parseForSecurityFromAst(cmd: string, root: Node | typeof PARSE_ABORTED): ParseForSecurityResult;
export type SemanticCheckResult = {
    ok: true;
} | {
    ok: false;
    reason: string;
};
/**
 * Post-argv semantic checks. Run after parseForSecurity returns 'simple' to
 * catch commands that tokenize fine but are dangerous by name or argument
 * content. Returns the first failure or {ok: true}.
 */
export declare function checkSemantics(commands: SimpleCommand[]): SemanticCheckResult;
//# sourceMappingURL=ast.d.ts.map