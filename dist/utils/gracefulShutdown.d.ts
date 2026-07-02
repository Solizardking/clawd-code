import type { ExitReason } from 'src/entrypoints/agentSdkTypes.js';
import type { AppState } from '../state/AppState.js';
/**
 * Set up global signal handlers for graceful shutdown
 */
export declare const setupGracefulShutdown: any;
export declare function gracefulShutdownSync(exitCode?: number, reason?: ExitReason, options?: {
    getAppState?: () => AppState;
    setAppState?: (f: (prev: AppState) => AppState) => void;
}): void;
/** Check if graceful shutdown is in progress */
export declare function isShuttingDown(): boolean;
/** Reset shutdown state - only for use in tests */
export declare function resetShutdownState(): void;
/**
 * Returns the in-flight shutdown promise, if any. Only for use in tests
 * to await completion before restoring mocks.
 */
export declare function getPendingShutdownForTesting(): Promise<void> | undefined;
export declare function gracefulShutdown(exitCode?: number, reason?: ExitReason, options?: {
    getAppState?: () => AppState;
    setAppState?: (f: (prev: AppState) => AppState) => void;
    /** Printed to stderr after alt-screen exit, before forceExit. */
    finalMessage?: string;
}): Promise<void>;
//# sourceMappingURL=gracefulShutdown.d.ts.map