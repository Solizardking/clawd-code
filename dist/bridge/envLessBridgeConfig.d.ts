export type EnvLessBridgeConfig = {
    init_retry_max_attempts: number;
    init_retry_base_delay_ms: number;
    init_retry_jitter_fraction: number;
    init_retry_max_delay_ms: number;
    http_timeout_ms: number;
    uuid_dedup_buffer_size: number;
    heartbeat_interval_ms: number;
    heartbeat_jitter_fraction: number;
    token_refresh_buffer_ms: number;
    teardown_archive_timeout_ms: number;
    connect_timeout_ms: number;
    min_version: string;
    should_show_app_upgrade_message: boolean;
};
export declare const DEFAULT_ENV_LESS_BRIDGE_CONFIG: EnvLessBridgeConfig;
/**
 * Fetch the env-less bridge timing config from GrowthBook. Read once per
 * initEnvLessBridgeCore call — config is fixed for the lifetime of a bridge
 * session.
 *
 * Uses the blocking getter (not _CACHED_MAY_BE_STALE) because /remote-control
 * runs well after GrowthBook init — initializeGrowthBook() resolves instantly,
 * so there's no startup penalty, and we get the fresh in-memory remoteEval
 * value instead of the stale-on-first-read disk cache. The _DEPRECATED suffix
 * warns against startup-path usage, which this isn't.
 */
export declare function getEnvLessBridgeConfig(): Promise<EnvLessBridgeConfig>;
/**
 * Returns an error message if the current CLI version is below the minimum
 * required for the env-less (v2) bridge path, or null if the version is fine.
 *
 * v2 analogue of checkBridgeMinVersion() — reads from tengu_bridge_repl_v2_config
 * instead of tengu_bridge_min_version so the two implementations can enforce
 * independent floors.
 */
export declare function checkEnvLessBridgeMinVersion(): Promise<string | null>;
/**
 * Whether to nudge users toward upgrading their claude.ai app when a
 * Remote Control session starts. True only when the v2 bridge is active
 * AND the should_show_app_upgrade_message config bit is set — lets us
 * roll the v2 bridge before the app ships the new session-list query.
 */
export declare function shouldShowAppUpgradeMessage(): Promise<boolean>;
//# sourceMappingURL=envLessBridgeConfig.d.ts.map