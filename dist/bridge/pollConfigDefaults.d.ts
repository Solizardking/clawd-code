/**
 * Bridge poll interval defaults. Extracted from pollConfig.ts so callers
 * that don't need live GrowthBook tuning (daemon via Agent SDK) can avoid
 * the growthbook.ts → config.ts → file.ts → sessionStorage.ts → commands.ts
 * transitive dependency chain.
 */
export type PollIntervalConfig = {
    poll_interval_ms_not_at_capacity: number;
    poll_interval_ms_at_capacity: number;
    non_exclusive_heartbeat_interval_ms: number;
    multisession_poll_interval_ms_not_at_capacity: number;
    multisession_poll_interval_ms_partial_capacity: number;
    multisession_poll_interval_ms_at_capacity: number;
    reclaim_older_than_ms: number;
    session_keepalive_interval_v2_ms: number;
};
export declare const DEFAULT_POLL_CONFIG: PollIntervalConfig;
//# sourceMappingURL=pollConfigDefaults.d.ts.map