import { type ExportResult } from '@opentelemetry/core';
import { AggregationTemporality, type PushMetricExporter, type ResourceMetrics } from '@opentelemetry/sdk-metrics';
export declare class BigQueryMetricsExporter implements PushMetricExporter {
    private readonly endpoint;
    private readonly timeout;
    private pendingExports;
    private isShutdown;
    constructor(options?: {
        timeout?: number;
    });
    export(metrics: ResourceMetrics, resultCallback: (result: ExportResult) => void): Promise<void>;
    private doExport;
    private transformMetricsForInternal;
    private extractDataPoints;
    shutdown(): Promise<void>;
    forceFlush(): Promise<void>;
    private convertAttributes;
    private hrTimeToISOString;
    selectAggregationTemporality(): AggregationTemporality;
}
//# sourceMappingURL=bigqueryExporter.d.ts.map