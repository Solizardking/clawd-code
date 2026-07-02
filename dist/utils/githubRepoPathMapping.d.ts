/**
 * Updates the GitHub repository path mapping in global config.
 * Called at startup (fire-and-forget) to track known local paths for repos.
 * This is non-blocking and errors are logged silently.
 *
 * Stores the git root (not cwd) so the mapping always points to the
 * repository root regardless of which subdirectory the user launched from.
 * If the path is already tracked, it is promoted to the front of the list
 * so the most recently used clone appears first.
 */
export declare function updateGithubRepoPathMapping(): Promise<void>;
/**
 * Gets known local paths for a given GitHub repository.
 * @param repo The repository in "owner/repo" format
 * @returns Array of known absolute paths, or empty array if none
 */
export declare function getKnownPathsForRepo(repo: string): string[];
/**
 * Filters paths to only those that exist on the filesystem.
 * @param paths Array of absolute paths to check
 * @returns Array of paths that exist
 */
export declare function filterExistingPaths(paths: string[]): Promise<string[]>;
/**
 * Validates that a path contains the expected GitHub repository.
 * @param path Absolute path to check
 * @param expectedRepo Expected repository in "owner/repo" format
 * @returns true if the path contains the expected repo, false otherwise
 */
export declare function validateRepoAtPath(path: string, expectedRepo: string): Promise<boolean>;
/**
 * Removes a path from the tracked paths for a given repository.
 * Used when a path is found to be invalid during selection.
 * @param repo The repository in "owner/repo" format
 * @param pathToRemove The path to remove from tracking
 */
export declare function removePathFromRepo(repo: string, pathToRemove: string): void;
//# sourceMappingURL=githubRepoPathMapping.d.ts.map