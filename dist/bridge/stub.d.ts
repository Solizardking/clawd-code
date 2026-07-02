/**
 * Bridge stub — no-op implementations for when BRIDGE_MODE is disabled.
 *
 * The bridge files themselves are safe to import even when bridge is off
 * (no side effects at import time), and all call sites guard execution
 * with `feature('BRIDGE_MODE')` checks. This stub exists as a safety net
 * for any future code path that might reference bridge functionality
 * outside the feature gate.
 *
 * Usage:
 *   import { isBridgeAvailable, noopBridgeHandle } from './stub.js'
 */
import type { ReplBridgeHandle } from './replBridge.js';
/** Returns false — bridge is not available in this build/configuration. */
export declare function isBridgeAvailable(): false;
/**
 * A no-op ReplBridgeHandle that silently discards all messages.
 * Use this when code expects a handle but bridge is disabled.
 */
export declare const noopBridgeHandle: ReplBridgeHandle;
/**
 * No-op bridge logger that silently drops all output.
 */
export declare const noopBridgeLogger: {
    printBanner(): void;
    logSessionStart(): void;
    logSessionComplete(): void;
    logSessionFailed(): void;
    logStatus(): void;
    logVerbose(): void;
    logError(): void;
    logReconnected(): void;
    updateIdleStatus(): void;
    updateReconnectingStatus(): void;
    updateSessionStatus(): void;
    clearStatus(): void;
    setRepoInfo(): void;
    setDebugLogPath(): void;
    setAttached(): void;
    updateFailedStatus(): void;
    toggleQr(): void;
    updateSessionCount(): void;
    setSpawnModeDisplay(): void;
    addSession(): void;
    updateSessionActivity(): void;
    setSessionTitle(): void;
    removeSession(): void;
    refreshDisplay(): void;
};
//# sourceMappingURL=stub.d.ts.map