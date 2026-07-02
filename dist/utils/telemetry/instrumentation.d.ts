export declare function bootstrapTelemetry(): void;
export declare function parseExporterTypes(value: string | undefined): string[];
export declare function isTelemetryEnabled(): boolean;
export declare function initializeTelemetry(): Promise<any>;
/**
 * Flush all pending telemetry data immediately.
 * This should be called before logout or org switching to prevent data leakage.
 */
export declare function flushTelemetry(): Promise<void>;
//# sourceMappingURL=instrumentation.d.ts.map