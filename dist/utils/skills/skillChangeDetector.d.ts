/**
 * Initialize file watching for skill directories
 */
export declare function initialize(): Promise<void>;
/**
 * Clean up file watcher
 */
export declare function dispose(): Promise<void>;
/**
 * Subscribe to skill changes
 */
export declare const subscribe: (listener: () => void) => () => void;
/**
 * Reset internal state for testing purposes only.
 */
export declare function resetForTesting(overrides?: {
    stabilityThreshold?: number;
    pollInterval?: number;
    reloadDebounce?: number;
    chokidarInterval?: number;
}): Promise<void>;
export declare const skillChangeDetector: {
    initialize: typeof initialize;
    dispose: typeof dispose;
    subscribe: (listener: () => void) => () => void;
    resetForTesting: typeof resetForTesting;
};
//# sourceMappingURL=skillChangeDetector.d.ts.map