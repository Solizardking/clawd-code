type MetricsStatus = {
    enabled: boolean;
    hasError: boolean;
};
/**
 * Check if metrics are enabled for the current organization.
 *
 * Two-tier cache:
 * - Disk (24h TTL): survives process restarts. Fresh disk cache → zero network.
 * - In-memory (1h TTL): dedupes the background refresh within a process.
 *
 * The caller (bigqueryExporter) tolerates stale reads — a missed export or
 * an extra one during the 24h window is acceptable.
 */
export declare function checkMetricsEnabled(): Promise<MetricsStatus>;
export declare const _clearMetricsEnabledCacheForTesting: () => void;
export {};
//# sourceMappingURL=metricsOptOut.d.ts.map