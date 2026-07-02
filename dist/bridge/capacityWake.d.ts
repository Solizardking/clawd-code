/**
 * Shared capacity-wake primitive for bridge poll loops.
 *
 * Both replBridge.ts and bridgeMain.ts need to sleep while "at capacity"
 * but wake early when either (a) the outer loop signal aborts (shutdown),
 * or (b) capacity frees up (session done / transport lost). This module
 * encapsulates the mutable wake-controller + two-signal merger that both
 * poll loops previously duplicated byte-for-byte.
 */
export type CapacitySignal = {
    signal: AbortSignal;
    cleanup: () => void;
};
export type CapacityWake = {
    /**
     * Create a signal that aborts when either the outer loop signal or the
     * capacity-wake controller fires. Returns the merged signal and a cleanup
     * function that removes listeners when the sleep resolves normally
     * (without abort).
     */
    signal(): CapacitySignal;
    /**
     * Abort the current at-capacity sleep and arm a fresh controller so the
     * poll loop immediately re-checks for new work.
     */
    wake(): void;
};
export declare function createCapacityWake(outerSignal: AbortSignal): CapacityWake;
//# sourceMappingURL=capacityWake.d.ts.map