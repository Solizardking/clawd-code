import { type CronJitterConfig } from './cronTasks.js';
/**
 * Read `tengu_kairos_cron_config` from GrowthBook, validate, fall back to
 * defaults on absent/malformed/out-of-bounds config. Called from check()
 * every tick via the `getJitterConfig` callback — cheap (synchronous cache
 * hit). Refresh window: JITTER_CONFIG_REFRESH_MS.
 *
 * Exported so ops runbooks can point at a single function when documenting
 * the lever, and so tests can spy on it without mocking GrowthBook itself.
 *
 * Pass this as `getJitterConfig` when calling createCronScheduler in REPL
 * contexts. Daemon/SDK callers omit getJitterConfig and get defaults.
 */
export declare function getCronJitterConfig(): CronJitterConfig;
//# sourceMappingURL=cronJitterConfig.d.ts.map