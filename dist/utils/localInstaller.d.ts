/**
 * Utilities for handling local installation
 */
import { type ReleaseChannel } from './config.js';
export declare function getLocalClaudePath(): string;
/**
 * Check if we're running from our managed local installation
 */
export declare function isRunningFromLocalInstallation(): boolean;
/**
 * Ensure the local package environment is set up
 * Creates the directory, package.json, and wrapper script
 */
export declare function ensureLocalPackageEnvironment(): Promise<boolean>;
/**
 * Install or update Claude CLI package in the local directory
 * @param channel - Release channel to use (latest or stable)
 * @param specificVersion - Optional specific version to install (overrides channel)
 */
export declare function installOrUpdateClaudePackage(channel: ReleaseChannel, specificVersion?: string | null): Promise<'in_progress' | 'success' | 'install_failed'>;
/**
 * Check if local installation exists.
 * Pure existence probe — callers use this to choose update path / UI hints.
 */
export declare function localInstallationExists(): Promise<boolean>;
/**
 * Get shell type to determine appropriate path setup
 */
export declare function getShellType(): string;
//# sourceMappingURL=localInstaller.d.ts.map