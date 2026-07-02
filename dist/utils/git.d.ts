declare const GIT_ROOT_NOT_FOUND: unique symbol;
declare const findGitRootImpl: {
    (path: string): string | typeof GIT_ROOT_NOT_FOUND;
    cache: {
        clear: () => void;
        size: () => number;
        delete: (key: string) => boolean;
        get: (key: string) => string | typeof GIT_ROOT_NOT_FOUND | undefined;
        has: (key: string) => boolean;
    };
};
/**
 * Find the git root by walking up the directory tree.
 * Looks for a .git directory or file (worktrees/submodules use a file).
 * Returns the directory containing .git, or null if not found.
 *
 * Memoized per startPath with an LRU cache (max 50 entries) to prevent
 * unbounded growth — gitDiff calls this with dirname(file), so editing many
 * files across different directories would otherwise accumulate entries forever.
 */
export declare const findGitRoot: {
    (startPath: string): string | null;
    cache: typeof findGitRootImpl.cache;
};
/**
 * Resolve a git root to the canonical main repository root.
 * For a regular repo this is a no-op. For a worktree, follows the
 * `.git` file → `gitdir:` → `commondir` chain to find the main repo's
 * working directory.
 *
 * Submodules (`.git` is a file but no `commondir`) fall through to the
 * input root, which is correct since submodules are separate repos.
 *
 * Memoized with a small LRU to avoid repeated file reads on the hot
 * path (permission checks, prompt building).
 */
declare const resolveCanonicalRoot: {
    (root: string): string;
    cache: {
        clear: () => void;
        size: () => number;
        delete: (key: string) => boolean;
        get: (key: string) => string | undefined;
        has: (key: string) => boolean;
    };
};
/**
 * Find the canonical git repository root, resolving through worktrees.
 *
 * Unlike findGitRoot, which returns the worktree directory (where the `.git`
 * file lives), this returns the main repository's working directory. This
 * ensures all worktrees of the same repo map to the same project identity.
 *
 * Use this instead of findGitRoot for project-scoped state (auto-memory,
 * project config, agent memory) so worktrees share state with the main repo.
 */
export declare const findCanonicalGitRoot: {
    (startPath: string): string | null;
    cache: typeof resolveCanonicalRoot.cache;
};
export declare const gitExe: any;
export declare const getIsGit: any;
export declare function getGitDir(cwd: string): Promise<string | null>;
export declare function isAtGitRoot(): Promise<boolean>;
export declare const dirIsInGitRepo: (cwd: string) => Promise<boolean>;
export declare const getHead: () => Promise<string>;
export declare const getBranch: () => Promise<string>;
export declare const getDefaultBranch: () => Promise<string>;
export declare const getRemoteUrl: () => Promise<string | null>;
/**
 * Normalizes a git remote URL to a canonical form for hashing.
 * Converts SSH and HTTPS URLs to the same format: host/owner/repo (lowercase, no .git)
 *
 * Examples:
 * - git@github.com:owner/repo.git -> github.com/owner/repo
 * - https://github.com/owner/repo.git -> github.com/owner/repo
 * - ssh://git@github.com/owner/repo -> github.com/owner/repo
 * - http://local_proxy@127.0.0.1:16583/git/owner/repo -> github.com/owner/repo
 */
export declare function normalizeGitRemoteUrl(url: string): string | null;
/**
 * Returns a SHA256 hash (first 16 chars) of the normalized git remote URL.
 * This provides a globally unique identifier for the repository that:
 * - Is the same regardless of SSH vs HTTPS clone
 * - Does not expose the actual repository name in logs
 */
export declare function getRepoRemoteHash(): Promise<string | null>;
export declare const getIsHeadOnRemote: () => Promise<boolean>;
export declare const hasUnpushedCommits: () => Promise<boolean>;
export declare const getIsClean: (options?: {
    ignoreUntracked?: boolean;
}) => Promise<boolean>;
export declare const getChangedFiles: () => Promise<string[]>;
export type GitFileStatus = {
    tracked: string[];
    untracked: string[];
};
export declare const getFileStatus: () => Promise<GitFileStatus>;
export declare const getWorktreeCount: () => Promise<number>;
/**
 * Stashes all changes (including untracked files) to return git to a clean porcelain state
 * Important: This function stages untracked files before stashing to prevent data loss
 * @param message - Optional custom message for the stash
 * @returns Promise<boolean> - true if stash was successful, false otherwise
 */
export declare const stashToCleanState: (message?: string) => Promise<boolean>;
export type GitRepoState = {
    commitHash: string;
    branchName: string;
    remoteUrl: string | null;
    isHeadOnRemote: boolean;
    isClean: boolean;
    worktreeCount: number;
};
export declare function getGitState(): Promise<GitRepoState | null>;
export declare function getGithubRepo(): Promise<string | null>;
/**
 * Preserved git state for issue submission.
 * Uses remote base (e.g., origin/main) which is rarely force-pushed,
 * unlike local commits that can be GC'd after force push.
 */
export type PreservedGitState = {
    /** The SHA of the merge-base with the remote branch */
    remote_base_sha: string | null;
    /** The remote branch used (e.g., "origin/main") */
    remote_base: string | null;
    /** Patch from merge-base to current state (includes uncommitted changes) */
    patch: string;
    /** Untracked files with their contents */
    untracked_files: Array<{
        path: string;
        content: string;
    }>;
    /** git format-patch output for committed changes between merge-base and HEAD.
     *  Used to reconstruct the actual commit chain (author, date, message) in
     *  replay containers. null when there are no commits between merge-base and HEAD. */
    format_patch: string | null;
    /** The current HEAD SHA (tip of the feature branch) */
    head_sha: string | null;
    /** The current branch name (e.g., "feat/my-feature") */
    branch_name: string | null;
};
/**
 * Find the best remote branch to use as a base.
 * Priority: tracking branch > origin/main > origin/staging > origin/master
 */
export declare function findRemoteBase(): Promise<string | null>;
/**
 * Preserve git state for issue submission.
 * Uses remote base for more stable replay capability.
 *
 * Edge cases handled:
 * - Detached HEAD: falls back to merge-base with default branch directly
 * - No remote: returns null for remote fields, uses HEAD-only mode
 * - Shallow clone: falls back to HEAD-only mode
 */
export declare function preserveGitStateForIssue(): Promise<PreservedGitState | null>;
/**
 * Checks if the current working directory appears to be a bare git repository
 * or has been manipulated to look like one (sandbox escape attack vector).
 *
 * SECURITY: Git's is_git_directory() function (setup.c:417-455) checks for:
 * 1. HEAD file - Must be a valid ref
 * 2. objects/ directory - Must exist and be accessible
 * 3. refs/ directory - Must exist and be accessible
 *
 * If all three exist in the current directory (not in a .git subdirectory),
 * Git treats the current directory as a bare repository and will execute
 * hooks/pre-commit and other hook scripts from the cwd.
 *
 * Attack scenario:
 * 1. Attacker creates HEAD, objects/, refs/, and hooks/pre-commit in cwd
 * 2. Attacker deletes or corrupts .git/HEAD to invalidate the normal git directory
 * 3. When user runs 'git status', Git treats cwd as the git dir and runs the hook
 *
 * @returns true if the cwd looks like a bare/exploited git directory
 */
export declare function isCurrentDirectoryBareGitRepo(): boolean;
export {};
//# sourceMappingURL=git.d.ts.map