export declare const initializeDatadog: any;
/**
 * Flush remaining Datadog logs and shut down.
 * Called from gracefulShutdown() before process.exit() since
 * forceExit() prevents the beforeExit handler from firing.
 */
export declare function shutdownDatadog(): Promise<void>;
export declare function trackDatadogEvent(eventName: string, properties: {
    [key: string]: boolean | number | undefined;
}): Promise<void>;
//# sourceMappingURL=datadog.d.ts.map