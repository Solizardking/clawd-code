import { type ReleaseChannel } from './config.js';
export type InstallStatus = 'success' | 'no_permissions' | 'install_failed' | 'in_progress';
export type AutoUpdaterResult = {
    version: string | null;
    status: InstallStatus;
    notifications?: string[];
};
export type MaxVersionConfig = {
    external?: string;
    ant?: string;
    external_message?: string;
    ant_message?: string;
};
/**
 * Checks if the current version meets the minimum required version from Statsig config
 * Terminates the process with an error message if the version is too old
 *
 * NOTE ON SHA-BASED VERSIONING:
 * We use SemVer-compliant versioning with build metadata format (X.X.X+SHA) for continuous deployment.
 * According to SemVer specs, build metadata (the +SHA part) is ignored when comparing versions.
 *
 * Versioning approach:
 * 1. For version requirements/compatibility (assertMinVersion), we use semver comparison that ignores build metadata
 * 2. For updates ('claude update'), we use exact string comparison to detect any change, including SHA
 *    - This ensures users always get the latest build, even when only the SHA changes
 *    - The UI clearly shows both versions including build metadata
 *
 * This approach keeps version comparison logic simple while maintaining traceability via the SHA.
 */
export declare function assertMinVersion(): Promise<void>;
/**
 * Returns the maximum allowed version for the current user type.
 * For ants, returns the `ant` field (dev version format).
 * For external users, returns the `external` field (clean semver).
 * This is used as a server-side kill switch to pause auto-updates during incidents.
 * Returns undefined if no cap is configured.
 */
export declare function getMaxVersion(): Promise<string | undefined>;
/**
 * Returns the server-driven message explaining the known issue, if configured.
 * Shown in the warning banner when the current version exceeds the max allowed version.
 */
export declare function getMaxVersionMessage(): Promise<string | undefined>;
/**
 * Checks if a target version should be skipped due to user's minimumVersion setting.
 * This is used when switching to stable channel - the user can choose to stay on their
 * current version until stable catches up, preventing downgrades.
 */
export declare function shouldSkipVersion(targetVersion: string): boolean;
/**
 * Get the path to the lock file
 * This is a function to ensure it's evaluated at runtime after test setup
 */
export declare function getLockFilePath(): string;
export declare function checkGlobalInstallPermissions(): Promise<{
    hasPermissions: boolean;
    npmPrefix: string | null;
}>;
export declare function getLatestVersion(channel: ReleaseChannel): Promise<string | null>;
export type NpmDistTags = {
    latest: string | null;
    stable: string | null;
};
/**
 * Get npm dist-tags (latest and stable versions) from the registry.
 * This is used by the doctor command to show users what versions are available.
 */
export declare function getNpmDistTags(): Promise<NpmDistTags>;
/**
 * Get the latest version from GCS bucket for a given release channel.
 * This is used by installations that don't have npm (e.g. package manager installs).
 */
export declare function getLatestVersionFromGcs(channel: ReleaseChannel): Promise<string | null>;
/**
 * Get available versions from GCS bucket (for native installations).
 * Fetches both latest and stable channel pointers.
 */
export declare function getGcsDistTags(): Promise<NpmDistTags>;
/**
 * Get version history from npm registry (ant-only feature)
 * Returns versions sorted newest-first, limited to the specified count
 *
 * Uses NATIVE_PACKAGE_URL when available because:
 * 1. Native installation is the primary installation method for ant users
 * 2. Not all JS package versions have corresponding native packages
 * 3. This prevents rollback from listing versions that don't have native binaries
 */
export declare function getVersionHistory(limit: number): Promise<string[]>;
export declare function installGlobalPackage(specificVersion?: string | null): Promise<InstallStatus>;
//# sourceMappingURL=autoUpdater.d.ts.map