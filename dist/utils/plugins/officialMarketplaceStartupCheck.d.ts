/**
 * Auto-install logic for the official Anthropic marketplace.
 *
 * This module handles automatically installing the official marketplace
 * on startup for new users, with appropriate checks for:
 * - Enterprise policy restrictions
 * - Git availability
 * - Previous installation attempts
 */
/**
 * Reason why the official marketplace was not installed
 */
export type OfficialMarketplaceSkipReason = 'already_attempted' | 'already_installed' | 'policy_blocked' | 'git_unavailable' | 'gcs_unavailable' | 'unknown';
/**
 * Check if official marketplace auto-install is disabled via environment variable.
 */
export declare function isOfficialMarketplaceAutoInstallDisabled(): boolean;
/**
 * Configuration for retry logic
 */
export declare const RETRY_CONFIG: {
    MAX_ATTEMPTS: number;
    INITIAL_DELAY_MS: number;
    BACKOFF_MULTIPLIER: number;
    MAX_DELAY_MS: number;
};
/**
 * Result of the auto-install check
 */
export type OfficialMarketplaceCheckResult = {
    /** Whether the marketplace was successfully installed */
    installed: boolean;
    /** Whether the installation was skipped (and why) */
    skipped: boolean;
    /** Reason for skipping, if applicable */
    reason?: OfficialMarketplaceSkipReason;
    /** Whether saving retry metadata to config failed */
    configSaveFailed?: boolean;
};
/**
 * Check and install the official marketplace on startup.
 *
 * This function is designed to be called as a fire-and-forget operation
 * during startup. It will:
 * 1. Check if installation was already attempted
 * 2. Check if marketplace is already installed
 * 3. Check enterprise policy restrictions
 * 4. Check git availability
 * 5. Attempt installation
 * 6. Record the result in GlobalConfig
 *
 * @returns Result indicating whether installation succeeded or was skipped
 */
export declare function checkAndInstallOfficialMarketplace(): Promise<OfficialMarketplaceCheckResult>;
//# sourceMappingURL=officialMarketplaceStartupCheck.d.ts.map