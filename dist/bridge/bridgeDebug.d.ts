import type { BridgeApiClient } from './types.js';
/**
 * Ant-only fault injection for manually testing bridge recovery paths.
 *
 * Real failure modes this targets (BQ 2026-03-12, 7-day window):
 *   poll 404 not_found_error   — 147K sessions/week, dead onEnvironmentLost gate
 *   ws_closed 1002/1006        —  22K sessions/week, zombie poll after close
 *   register transient failure —  residual: network blips during doReconnect
 *
 * Usage: /bridge-kick <subcommand> from the REPL while Remote Control is
 * connected, then tail debug.log to watch the recovery machinery react.
 *
 * Module-level state is intentional here: one bridge per REPL process, the
 * /bridge-kick slash command has no other way to reach into initBridgeCore's
 * closures, and teardown clears the slot.
 */
/** One-shot fault to inject on the next matching api call. */
type BridgeFault = {
    method: 'pollForWork' | 'registerBridgeEnvironment' | 'reconnectSession' | 'heartbeatWork';
    /** Fatal errors go through handleErrorStatus → BridgeFatalError. Transient
     *  errors surface as plain axios rejections (5xx / network). Recovery code
     *  distinguishes the two: fatal → teardown, transient → retry/backoff. */
    kind: 'fatal' | 'transient';
    status: number;
    errorType?: string;
    /** Remaining injections. Decremented on consume; removed at 0. */
    count: number;
};
export type BridgeDebugHandle = {
    /** Invoke the transport's permanent-close handler directly. Tests the
     *  ws_closed → reconnectEnvironmentWithSession escalation (#22148). */
    fireClose: (code: number) => void;
    /** Call reconnectEnvironmentWithSession() — same as SIGUSR2 but
     *  reachable from the slash command. */
    forceReconnect: () => void;
    /** Queue a fault for the next N calls to the named api method. */
    injectFault: (fault: BridgeFault) => void;
    /** Abort the at-capacity sleep so an injected poll fault lands
     *  immediately instead of up to 10min later. */
    wakePollLoop: () => void;
    /** env/session IDs for the debug.log grep. */
    describe: () => string;
};
export declare function registerBridgeDebugHandle(h: BridgeDebugHandle): void;
export declare function clearBridgeDebugHandle(): void;
export declare function getBridgeDebugHandle(): BridgeDebugHandle | null;
export declare function injectBridgeFault(fault: BridgeFault): void;
/**
 * Wrap a BridgeApiClient so each call first checks the fault queue. If a
 * matching fault is queued, throw the specified error instead of calling
 * through. Delegates everything else to the real client.
 *
 * Only called when USER_TYPE === 'ant' — zero overhead in external builds.
 */
export declare function wrapApiForFaultInjection(api: BridgeApiClient): BridgeApiClient;
export {};
//# sourceMappingURL=bridgeDebug.d.ts.map