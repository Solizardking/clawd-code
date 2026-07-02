/**
 * Protocol Handler Registration
 *
 * Registers the `claude-cli://` custom URI scheme with the OS,
 * so that clicking a `claude-cli://` link in a browser (or any app) will
 * invoke `claude --handle-uri <url>`.
 *
 * Platform details:
 *   macOS  — Creates a minimal .app trampoline in ~/Applications with
 *            CFBundleURLTypes in its Info.plist
 *   Linux  — Creates a .desktop file in $XDG_DATA_HOME/applications
 *            (default ~/.local/share/applications) and registers it with xdg-mime
 *   Windows — Writes registry keys under HKEY_CURRENT_USER\Software\Classes
 */
export declare const MACOS_BUNDLE_ID = "com.anthropic.claude-code-url-handler";
/**
 * Register the `claude-cli://` protocol handler with the operating system.
 * After registration, clicking a `claude-cli://` link will invoke claude.
 */
export declare function registerProtocolHandler(claudePath?: string): Promise<void>;
/**
 * Check whether the OS-level protocol handler is already registered AND
 * points at the expected `claude` binary. Reads the registration artifact
 * directly (symlink target, .desktop Exec line, registry value) rather than
 * a cached flag in ~/.claude.json, so:
 *   - the check is per-machine (config can sync across machines; OS state can't)
 *   - stale paths self-heal (install-method change → re-register next session)
 *   - deleted artifacts self-heal
 *
 * Any read error (ENOENT, EACCES, reg nonzero) → false → re-register.
 */
export declare function isProtocolHandlerCurrent(claudePath: string): Promise<boolean>;
/**
 * Auto-register the claude-cli:// deep link protocol handler when missing
 * or stale. Runs every session from backgroundHousekeeping (fire-and-forget),
 * but the artifact check makes it a no-op after the first successful run
 * unless the install path moves or the OS artifact is deleted.
 */
export declare function ensureDeepLinkProtocolRegistered(): Promise<void>;
//# sourceMappingURL=registerProtocol.d.ts.map