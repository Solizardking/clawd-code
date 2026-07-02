/**
 * Creates an idle timeout manager for SDK mode.
 * Automatically exits the process after the specified idle duration.
 *
 * @param isIdle Function that returns true if the system is currently idle
 * @returns Object with start/stop methods to control the idle timer
 */
export declare function createIdleTimeoutManager(isIdle: () => boolean): {
    start: () => void;
    stop: () => void;
};
//# sourceMappingURL=idleTimeout.d.ts.map