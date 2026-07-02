/**
 * Native Installer Implementation
 *
 * This module implements the file-based native installer system described in
 * docs/native-installer.md. It provides:
 * - Directory structure management with symlinks
 * - Version installation and activation
 * - Multi-process safety with locking
 * - Simple fallback mechanism using modification time
 * - Support for both JS and native builds
 */
export declare const VERSION_RETENTION_COUNT = 2;
export type SetupMessage = {
    message: string;
    userActionRequired: boolean;
    type: 'path' | 'alias' | 'info' | 'error';
};
export declare function getPlatform(): string;
export declare function getBinaryName(platform: string): string;
export declare function removeDirectoryIfEmpty(path: string): Promise<void>;
export declare function checkInstall(force?: boolean): Promise<SetupMessage[]>;
type InstallLatestResult = {
    latestVersion: string | null;
    wasUpdated: boolean;
    lockFailed?: boolean;
    lockHolderPid?: number;
};
export declare function installLatest(channelOrVersion: string, forceReinstall?: boolean): Promise<InstallLatestResult>;
/**
 * Acquire a lock on the current running version to prevent it from being deleted
 * This lock is held for the entire lifetime of the process
 *
 * Uses PID-based locking (when enabled) which can immediately detect crashed processes
 * (unlike mtime-based locking which requires a 30-day timeout)
 */
export declare function lockCurrentVersion(): Promise<void>;
export declare function cleanupOldVersions(): Promise<void>;
/**
 * Remove the claude symlink from the executable directory
 * This is used when switching away from native installation
 * Will only remove if it's a native binary symlink, not npm-managed JS files
 */
export declare function removeInstalledSymlink(): Promise<void>;
/**
 * Clean up old claude aliases from shell configuration files
 * Only handles alias removal, not PATH setup
 */
export declare function cleanupShellAliases(): Promise<SetupMessage[]>;
export declare function cleanupNpmInstallations(): Promise<{
    removed: number;
    errors: string[];
    warnings: string[];
}>;
export {};
//# sourceMappingURL=installer.d.ts.map