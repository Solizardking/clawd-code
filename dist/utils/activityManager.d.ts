import { getActiveTimeCounter as getActiveTimeCounterImpl } from '../bootstrap/state.js';
type ActivityManagerOptions = {
    getNow?: () => number;
    getActiveTimeCounter?: typeof getActiveTimeCounterImpl;
};
/**
 * ActivityManager handles generic activity tracking for both user and CLI operations.
 * It automatically deduplicates overlapping activities and provides separate metrics
 * for user vs CLI active time.
 */
export declare class ActivityManager {
    private activeOperations;
    private lastUserActivityTime;
    private lastCLIRecordedTime;
    private isCLIActive;
    private readonly USER_ACTIVITY_TIMEOUT_MS;
    private readonly getNow;
    private readonly getActiveTimeCounter;
    private static instance;
    constructor(options?: ActivityManagerOptions);
    static getInstance(): ActivityManager;
    /**
     * Reset the singleton instance (for testing purposes)
     */
    static resetInstance(): void;
    /**
     * Create a new instance with custom options (for testing purposes)
     */
    static createInstance(options?: ActivityManagerOptions): ActivityManager;
    /**
     * Called when user interacts with the CLI (typing, commands, etc.)
     */
    recordUserActivity(): void;
    /**
     * Starts tracking CLI activity (tool execution, AI response, etc.)
     */
    startCLIActivity(operationId: string): void;
    /**
     * Stops tracking CLI activity
     */
    endCLIActivity(operationId: string): void;
    /**
     * Convenience method to track an async operation automatically (mainly for testing/debugging)
     */
    trackOperation<T>(operationId: string, fn: () => Promise<T>): Promise<T>;
    /**
     * Gets current activity states (mainly for testing/debugging)
     */
    getActivityStates(): {
        isUserActive: boolean;
        isCLIActive: boolean;
        activeOperationCount: number;
    };
}
export declare const activityManager: ActivityManager;
export {};
//# sourceMappingURL=activityManager.d.ts.map