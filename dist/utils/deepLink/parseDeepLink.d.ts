/**
 * Deep Link URI Parser
 *
 * Parses `claude-cli://open` URIs. All parameters are optional:
 *   q    — pre-fill the prompt input (not submitted)
 *   cwd  — working directory (absolute path)
 *   repo — owner/name slug, resolved against githubRepoPaths config
 *
 * Examples:
 *   claude-cli://open
 *   claude-cli://open?q=hello+world
 *   claude-cli://open?q=fix+tests&repo=owner/repo
 *   claude-cli://open?cwd=/path/to/project
 *
 * Security: values are URL-decoded, Unicode-sanitized, and rejected if they
 * contain ASCII control characters (newlines etc. can act as command
 * separators). All values are single-quote shell-escaped at the point of
 * use (terminalLauncher.ts) — that escaping is the injection boundary.
 */
export declare const DEEP_LINK_PROTOCOL = "claude-cli";
export type DeepLinkAction = {
    query?: string;
    cwd?: string;
    repo?: string;
};
/**
 * Parse a claude-cli:// URI into a structured action.
 *
 * @throws {Error} if the URI is malformed or contains dangerous characters
 */
export declare function parseDeepLink(uri: string): DeepLinkAction;
/**
 * Build a claude-cli:// deep link URL.
 */
export declare function buildDeepLink(action: DeepLinkAction): string;
//# sourceMappingURL=parseDeepLink.d.ts.map