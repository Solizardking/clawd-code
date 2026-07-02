/**
 * We fetch the changelog from GitHub instead of bundling it with the build.
 *
 * This is necessary because Ink's static rendering makes it difficult to
 * dynamically update/show components after initial render. By storing the
 * changelog in config, we ensure it's available on the next startup without
 * requiring a full re-render of the current UI.
 *
 * The flow is:
 * 1. User updates to a new version
 * 2. We fetch the changelog in the background and store it in config
 * 3. Next time the user starts Claude, the cached changelog is available immediately
 */
export declare const CHANGELOG_URL = "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md";
/** @internal exported for tests */
export declare function _resetChangelogCacheForTesting(): void;
/**
 * Migrate changelog from old config-based storage to file-based storage.
 * This should be called once at startup to ensure the migration happens
 * before any other config saves that might re-add the deprecated field.
 */
export declare function migrateChangelogFromConfig(): Promise<void>;
/**
 * Fetch the changelog from GitHub and store it in cache file
 * This runs in the background and doesn't block the UI
 */
export declare function fetchAndStoreChangelog(): Promise<void>;
/**
 * Get the stored changelog from cache file if available.
 * Populates the in-memory cache for subsequent sync reads.
 * @returns The cached changelog content or empty string if not available
 */
export declare function getStoredChangelog(): Promise<string>;
/**
 * Synchronous accessor for the changelog, reading only from the in-memory cache.
 * Returns empty string if the async getStoredChangelog() hasn't been called yet.
 * Intended for React render paths where async is not possible; setup.ts ensures
 * the cache is populated before first render via `await checkForReleaseNotes()`.
 */
export declare function getStoredChangelogFromMemory(): string;
/**
 * Parses a changelog string in markdown format into a structured format
 * @param content - The changelog content string
 * @returns Record mapping version numbers to arrays of release notes
 */
export declare function parseChangelog(content: string): Record<string, string[]>;
/**
 * Gets release notes to show based on the previously seen version.
 * Shows up to MAX_RELEASE_NOTES_SHOWN items total, prioritizing the most recent versions.
 *
 * @param currentVersion - The current app version
 * @param previousVersion - The last version where release notes were seen (or null if first time)
 * @param readChangelog - Function to read the changelog (defaults to readChangelogFile)
 * @returns Array of release notes to display
 */
export declare function getRecentReleaseNotes(currentVersion: string, previousVersion: string | null | undefined, changelogContent?: string): string[];
/**
 * Gets all release notes as an array of [version, notes] arrays.
 * Versions are sorted with oldest first.
 *
 * @param readChangelog - Function to read the changelog (defaults to readChangelogFile)
 * @returns Array of [version, notes[]] arrays
 */
export declare function getAllReleaseNotes(changelogContent?: string): Array<[string, string[]]>;
/**
 * Checks if there are release notes to show based on the last seen version.
 * Can be used by multiple components to determine whether to display release notes.
 * Also triggers a fetch of the latest changelog if the version has changed.
 *
 * @param lastSeenVersion The last version of release notes the user has seen
 * @param currentVersion The current application version, defaults to MACRO.VERSION
 * @returns An object with hasReleaseNotes and the releaseNotes content
 */
export declare function checkForReleaseNotes(lastSeenVersion: string | null | undefined, currentVersion?: string): Promise<{
    hasReleaseNotes: boolean;
    releaseNotes: string[];
}>;
/**
 * Synchronous variant of checkForReleaseNotes for React render paths.
 * Reads only from the in-memory cache populated by the async version.
 * setup.ts awaits checkForReleaseNotes() before first render, so this
 * returns accurate results in component render bodies.
 */
export declare function checkForReleaseNotesSync(lastSeenVersion: string | null | undefined, currentVersion?: string): {
    hasReleaseNotes: boolean;
    releaseNotes: string[];
};
//# sourceMappingURL=releaseNotes.d.ts.map