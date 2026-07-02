/**
 * XDG Base Directory utilities for Claude CLI Native Installer
 *
 * Implements the XDG Base Directory specification for organizing
 * native installer components across appropriate system directories.
 *
 * @see https://specifications.freedesktop.org/basedir-spec/latest/
 */
type EnvLike = Record<string, string | undefined>;
type XDGOptions = {
    env?: EnvLike;
    homedir?: string;
};
/**
 * Get XDG state home directory
 * Default: ~/.local/state
 * @param options Optional env and homedir overrides for testing
 */
export declare function getXDGStateHome(options?: XDGOptions): string;
/**
 * Get XDG cache home directory
 * Default: ~/.cache
 * @param options Optional env and homedir overrides for testing
 */
export declare function getXDGCacheHome(options?: XDGOptions): string;
/**
 * Get XDG data home directory
 * Default: ~/.local/share
 * @param options Optional env and homedir overrides for testing
 */
export declare function getXDGDataHome(options?: XDGOptions): string;
/**
 * Get user bin directory (not technically XDG but follows the convention)
 * Default: ~/.local/bin
 * @param options Optional homedir override for testing
 */
export declare function getUserBinDir(options?: XDGOptions): string;
export {};
//# sourceMappingURL=xdg.d.ts.map