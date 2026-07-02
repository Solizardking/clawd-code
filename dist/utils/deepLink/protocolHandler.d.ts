/**
 * Protocol Handler
 *
 * Entry point for `claude --handle-uri <url>`. When the OS invokes claude
 * with a `claude-cli://` URL, this module:
 *   1. Parses the URI into a structured action
 *   2. Detects the user's terminal emulator
 *   3. Opens a new terminal window running claude with the appropriate args
 *
 * This runs in a headless context (no TTY) because the OS launches the binary
 * directly — there is no terminal attached.
 */
/**
 * Handle an incoming deep link URI.
 *
 * Called from the CLI entry point when `--handle-uri` is passed.
 * This function parses the URI, resolves the claude binary, and
 * launches it in the user's terminal.
 *
 * @param uri - The raw URI string (e.g., "claude-cli://prompt?q=hello+world")
 * @returns exit code (0 = success)
 */
export declare function handleDeepLinkUri(uri: string): Promise<number>;
/**
 * Handle the case where claude was launched as the app bundle's executable
 * by macOS (via URL scheme). Uses the NAPI module to receive the URL from
 * the Apple Event, then handles it normally.
 *
 * @returns exit code (0 = success, 1 = error, null = not a URL launch)
 */
export declare function handleUrlSchemeLaunch(): Promise<number | null>;
//# sourceMappingURL=protocolHandler.d.ts.map