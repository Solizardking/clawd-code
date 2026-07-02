/**
 * Remote Managed Settings Service
 *
 * Manages fetching, caching, and validation of remote-managed settings
 * for enterprise customers. Uses checksum-based validation to minimize
 * network traffic and provides graceful degradation on failures.
 *
 * Eligibility:
 * - Console users (API key): All eligible
 * - OAuth users (Claude.ai): Only Enterprise/C4E and Team subscribers are eligible
 * - API fails open (non-blocking) - if fetch fails, continues without remote settings
 * - API returns empty settings for users without managed settings
 */
import { type SettingsJson } from '../../utils/settings/types.js';
/**
 * Initialize the loading promise for remote managed settings
 * This should be called early (e.g., in init.ts) to allow other systems
 * to await remote settings loading even if loadRemoteManagedSettings()
 * hasn't been called yet.
 *
 * Only creates the promise if the user is eligible for remote settings.
 * Includes a timeout to prevent deadlocks if loadRemoteManagedSettings() is never called.
 */
export declare function initializeRemoteManagedSettingsLoadingPromise(): void;
/**
 * Compute checksum from settings content for HTTP caching
 * Must match server's Python: json.dumps(settings, sort_keys=True, separators=(",", ":"))
 * Exported for testing to verify compatibility with server-side implementation
 */
export declare function computeChecksumFromSettings(settings: SettingsJson): string;
/**
 * Check if the current user is eligible for remote managed settings
 * This is the public API for other systems to check eligibility
 * Used to determine if they should wait for remote settings to load
 */
export declare function isEligibleForRemoteManagedSettings(): boolean;
/**
 * Wait for the initial remote settings loading to complete
 * Returns immediately if:
 * - User is not eligible for remote settings
 * - Loading has already completed
 * - Loading was never started
 */
export declare function waitForRemoteManagedSettingsToLoad(): Promise<void>;
/**
 * Clear all remote settings (session, persistent, and stop polling)
 */
export declare function clearRemoteManagedSettingsCache(): Promise<void>;
/**
 * Load remote settings during CLI initialization
 * Fails open - if fetch fails, continues without remote settings
 * Also starts background polling to pick up settings changes mid-session
 *
 * This function sets up a promise that other systems can await via
 * waitForRemoteManagedSettingsToLoad() to ensure they don't initialize
 * until remote settings have been fetched.
 */
export declare function loadRemoteManagedSettings(): Promise<void>;
/**
 * Refresh remote settings asynchronously (for auth state changes)
 * This is used when login/logout occurs
 * Fails open - if fetch fails, continues without remote settings
 */
export declare function refreshRemoteManagedSettings(): Promise<void>;
/**
 * Start background polling for remote settings
 * Polls every hour to pick up settings changes mid-session
 */
export declare function startBackgroundPolling(): void;
/**
 * Stop background polling for remote settings
 */
export declare function stopBackgroundPolling(): void;
//# sourceMappingURL=index.d.ts.map