import { type GitHubActionsMetadata } from '../../utils/user.js';
/**
 * User attributes sent to GrowthBook for targeting.
 * Uses UUID suffix (not Uuid) to align with GrowthBook conventions.
 */
export type GrowthBookUserAttributes = {
    id: string;
    sessionId: string;
    deviceID: string;
    platform: 'win32' | 'darwin' | 'linux';
    apiBaseUrlHost?: string;
    organizationUUID?: string;
    accountUUID?: string;
    userType?: string;
    subscriptionType?: string;
    rateLimitTier?: string;
    firstTokenTime?: number;
    email?: string;
    appVersion?: string;
    github?: GitHubActionsMetadata;
};
type GrowthBookRefreshListener = () => void | Promise<void>;
/**
 * Register a callback to fire when GrowthBook feature values refresh.
 * Returns an unsubscribe function.
 *
 * If init has already completed with features by the time this is called
 * (remoteEvalFeatureValues is populated), the listener fires once on the
 * next microtask. This catch-up handles the race where GB's network response
 * lands before the REPL's useEffect commits — on external builds with fast
 * networks and MCP-heavy configs, init can finish in ~100ms while REPL mount
 * takes ~600ms (see #20951 external-build trace at 30.540 vs 31.046).
 *
 * Change detection is on the subscriber: the callback fires on every refresh;
 * use isEqual against your last-seen config to decide whether to act.
 */
export declare function onGrowthBookRefresh(listener: GrowthBookRefreshListener): () => void;
/**
 * Check if a feature has an env-var override (CLAUDE_INTERNAL_FC_OVERRIDES).
 * When true, _CACHED_MAY_BE_STALE will return the override without touching
 * disk or network — callers can skip awaiting init for that feature.
 */
export declare function hasGrowthBookEnvOverride(feature: string): boolean;
/**
 * Enumerate all known GrowthBook features and their current resolved values
 * (not including overrides). In-memory payload first, disk cache fallback —
 * same priority as the getters. Used by the /config Gates tab.
 */
export declare function getAllGrowthBookFeatures(): Record<string, unknown>;
export declare function getGrowthBookConfigOverrides(): Record<string, unknown>;
/**
 * Set or clear a single config override. Pass undefined to clear.
 * Fires onGrowthBookRefresh listeners so systems that bake gate values into
 * long-lived objects (useMainLoopModel, useSkillsChange, etc.) rebuild —
 * otherwise overriding e.g. tengu_ant_model_override wouldn't actually
 * change the model until the next periodic refresh.
 */
export declare function setGrowthBookConfigOverride(feature: string, value: unknown): void;
export declare function clearGrowthBookConfigOverrides(): void;
/**
 * Hostname of ANTHROPIC_BASE_URL when it points at a non-Anthropic proxy.
 *
 * Enterprise-proxy deployments (Epic, Marble, etc.) typically use
 * apiKeyHelper auth, which means isAnthropicAuthEnabled() returns false and
 * organizationUUID/accountUUID/email are all absent from GrowthBook
 * attributes. Without this, there's no stable attribute to target them on
 * — only per-device IDs. See src/utils/auth.ts isAnthropicAuthEnabled().
 *
 * Returns undefined for unset/default (api.anthropic.com) so the attribute
 * is absent for direct-API users. Hostname only — no path/query/creds.
 */
export declare function getApiBaseUrlHost(): string | undefined;
/**
 * Initialize GrowthBook client (blocks until ready)
 */
export declare const initializeGrowthBook: any;
/**
 * @deprecated Use getFeatureValue_CACHED_MAY_BE_STALE instead, which is non-blocking.
 * This function blocks on GrowthBook initialization which can slow down startup.
 */
export declare function getFeatureValue_DEPRECATED<T>(feature: string, defaultValue: T): Promise<T>;
/**
 * Get a feature value from disk cache immediately. Pure read — disk is
 * populated by syncRemoteEvalToDisk on every successful payload (init +
 * periodic refresh), not by this function.
 *
 * This is the preferred method for startup-critical paths and sync contexts.
 * The value may be stale if the cache was written by a previous process.
 */
export declare function getFeatureValue_CACHED_MAY_BE_STALE<T>(feature: string, defaultValue: T): T;
/**
 * @deprecated Disk cache is now synced on every successful payload load
 * (init + 20min/6h periodic refresh). The per-feature TTL never fetched
 * fresh data from the server — it only re-wrote in-memory state to disk,
 * which is now redundant. Use getFeatureValue_CACHED_MAY_BE_STALE directly.
 */
export declare function getFeatureValue_CACHED_WITH_REFRESH<T>(feature: string, defaultValue: T, _refreshIntervalMs: number): T;
/**
 * Check a Statsig feature gate value via GrowthBook, with fallback to Statsig cache.
 *
 * **MIGRATION ONLY**: This function is for migrating existing Statsig gates to GrowthBook.
 * For new features, use `getFeatureValue_CACHED_MAY_BE_STALE()` instead.
 *
 * - Checks GrowthBook disk cache first
 * - Falls back to Statsig's cachedStatsigGates during migration
 * - The value may be stale if the cache hasn't been updated recently
 *
 * @deprecated Use getFeatureValue_CACHED_MAY_BE_STALE() for new code. This function
 * exists only to support migration of existing Statsig gates.
 */
export declare function checkStatsigFeatureGate_CACHED_MAY_BE_STALE(gate: string): boolean;
/**
 * Check a security restriction gate, waiting for re-init if in progress.
 *
 * Use this for security-critical gates where we need fresh values after auth changes.
 *
 * Behavior:
 * - If GrowthBook is re-initializing (e.g., after login), waits for it to complete
 * - Otherwise, returns cached value immediately (Statsig cache first, then GrowthBook)
 *
 * Statsig cache is checked first as a safety measure for security-related checks:
 * if the Statsig cache indicates the gate is enabled, we honor it.
 */
export declare function checkSecurityRestrictionGate(gate: string): Promise<boolean>;
/**
 * Check a boolean entitlement gate with fallback-to-blocking semantics.
 *
 * Fast path: if the disk cache already says `true`, return it immediately.
 * Slow path: if disk says `false`/missing, await GrowthBook init and fetch the
 * fresh server value (max ~5s). Disk is populated by syncRemoteEvalToDisk
 * inside init, so by the time the slow path returns, disk already has the
 * fresh value — no write needed here.
 *
 * Use for user-invoked features (e.g. /remote-control) that are gated on
 * subscription/org, where a stale `false` would unfairly block access but a
 * stale `true` is acceptable (the server is the real gatekeeper).
 */
export declare function checkGate_CACHED_OR_BLOCKING(gate: string): Promise<boolean>;
/**
 * Refresh GrowthBook after auth changes (login/logout).
 *
 * NOTE: This must destroy and recreate the client because GrowthBook's
 * apiHostRequestHeaders cannot be updated after client creation.
 */
export declare function refreshGrowthBookAfterAuthChange(): void;
/**
 * Reset GrowthBook client state (primarily for testing)
 */
export declare function resetGrowthBook(): void;
/**
 * Light refresh - re-fetch features from server without recreating client.
 * Use this for periodic refresh when auth headers haven't changed.
 *
 * Unlike refreshGrowthBookAfterAuthChange() which destroys and recreates the client,
 * this preserves client state and just fetches fresh feature values.
 */
export declare function refreshGrowthBookFeatures(): Promise<void>;
/**
 * Set up periodic refresh of GrowthBook features.
 * Uses light refresh (refreshGrowthBookFeatures) to re-fetch without recreating client.
 *
 * Call this after initialization for long-running sessions to ensure
 * feature values stay fresh. Matches Statsig's 6-hour refresh interval.
 */
export declare function setupPeriodicGrowthBookRefresh(): void;
/**
 * Stop periodic refresh (for testing or cleanup)
 */
export declare function stopPeriodicGrowthBookRefresh(): void;
/**
 * Get a dynamic config value - blocks until GrowthBook is initialized.
 * Prefer getFeatureValue_CACHED_MAY_BE_STALE for startup-critical paths.
 */
export declare function getDynamicConfig_BLOCKS_ON_INIT<T>(configName: string, defaultValue: T): Promise<T>;
/**
 * Get a dynamic config value from disk cache immediately. Pure read — see
 * getFeatureValue_CACHED_MAY_BE_STALE.
 * This is the preferred method for startup-critical paths and sync contexts.
 *
 * In GrowthBook, dynamic configs are just features with object values.
 */
export declare function getDynamicConfig_CACHED_MAY_BE_STALE<T>(configName: string, defaultValue: T): T;
export {};
//# sourceMappingURL=growthbook.d.ts.map