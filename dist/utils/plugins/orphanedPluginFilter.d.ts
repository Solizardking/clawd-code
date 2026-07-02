/**
 * Provides ripgrep glob exclusion patterns for orphaned plugin versions.
 *
 * When plugin versions are updated, old versions are marked with a
 * `.orphaned_at` file but kept on disk for 7 days (since concurrent
 * sessions might still reference them). During this window, Grep/Glob
 * could return files from orphaned versions, causing Claude to use
 * outdated plugin code.
 *
 * We find `.orphaned_at` markers via a single ripgrep call and generate
 * `--glob '!<dir>/**'` patterns for their parent directories. The cache
 * is warmed in main.tsx AFTER cleanupOrphanedPluginVersionsInBackground
 * settles disk state. Once populated, the exclusion list is frozen for
 * the session unless /reload-plugins is called; subsequent disk mutations
 * (autoupdate, concurrent sessions) don't affect it.
 */
/**
 * Get ripgrep glob exclusion patterns for orphaned plugin versions.
 *
 * @param searchPath - When provided, exclusions are only returned if the
 *   search overlaps the plugin cache directory (avoids unnecessary --glob
 *   args for searches outside the cache).
 *
 * Warmed eagerly in main.tsx after orphan GC; the lazy-compute path here
 * is a fallback. Best-effort: returns empty array if anything goes wrong.
 */
export declare function getGlobExclusionsForPluginCache(searchPath?: string): Promise<string[]>;
export declare function clearPluginCacheExclusions(): void;
//# sourceMappingURL=orphanedPluginFilter.d.ts.map