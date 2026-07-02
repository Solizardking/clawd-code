/**
 * Terminal preference capture for deep link handling.
 *
 * Separate from terminalLauncher.ts so interactiveHelpers.tsx can import
 * this without pulling the full launcher module into the startup path
 * (which would defeat LODESTONE tree-shaking).
 */
/**
 * Capture the current terminal from TERM_PROGRAM and store it for the deep
 * link handler to use later. The handler runs headless (LaunchServices/xdg)
 * where TERM_PROGRAM is unset, so without this it falls back to a static
 * priority list that picks whatever is installed first — often not the
 * terminal the user actually uses.
 *
 * Called fire-and-forget from interactive startup, same as
 * updateGithubRepoPathMapping.
 */
export declare function updateDeepLinkTerminalPreference(): void;
//# sourceMappingURL=terminalPreference.d.ts.map