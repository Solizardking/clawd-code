/**
 * Deep Link Origin Banner
 *
 * Builds the warning text shown when a session was opened by an external
 * claude-cli:// deep link. Linux xdg-open and browsers with "always allow"
 * set dispatch the link with no OS-level confirmation, so the application
 * provides its own provenance signal — mirroring claude.ai's security
 * interstitial for external-source prefills.
 *
 * The user must press Enter to submit; this banner primes them to read the
 * prompt (which may use homoglyphs or padding to hide instructions) and
 * notice which directory — and therefore which CLAUDE.md — was loaded.
 */
export type DeepLinkBannerInfo = {
    /** Resolved working directory the session launched in. */
    cwd: string;
    /** Length of the ?q= prompt pre-filled in the input box. Undefined = no prefill. */
    prefillLength?: number;
    /** The ?repo= slug if the cwd was resolved from the githubRepoPaths MRU. */
    repo?: string;
    /** Last-fetch timestamp for the repo (FETCH_HEAD mtime). Undefined = never fetched or not a git repo. */
    lastFetch?: Date;
};
/**
 * Build the multi-line warning banner for a deep-link-originated session.
 *
 * Always shows the working directory so the user can see which CLAUDE.md
 * will load. When the link pre-filled a prompt, adds a second line prompting
 * the user to review it — the prompt itself is visible in the input box.
 *
 * When the cwd was resolved from a ?repo= slug, also shows the slug and the
 * clone's last-fetch age so the user knows which local clone was selected
 * and whether its CLAUDE.md may be stale relative to upstream.
 */
export declare function buildDeepLinkBanner(info: DeepLinkBannerInfo): string;
/**
 * Read the mtime of .git/FETCH_HEAD, which git updates on every fetch or
 * pull. Returns undefined if the directory is not a git repo or has never
 * been fetched.
 *
 * FETCH_HEAD is per-worktree — fetching from the main worktree does not
 * touch a sibling worktree's FETCH_HEAD. When cwd is a worktree, we check
 * both and return whichever is newer so a recently-fetched main repo
 * doesn't read as "never fetched" just because the deep link landed in
 * a worktree.
 */
export declare function readLastFetchTime(cwd: string): Promise<Date | undefined>;
//# sourceMappingURL=banner.d.ts.map