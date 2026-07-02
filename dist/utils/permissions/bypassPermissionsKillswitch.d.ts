import { type AppState } from 'src/state/AppState.js';
import type { ToolPermissionContext } from 'src/Tool.js';
export declare function checkAndDisableBypassPermissionsIfNeeded(toolPermissionContext: ToolPermissionContext, setAppState: (f: (prev: AppState) => AppState) => void): Promise<void>;
/**
 * Reset the run-once flag for checkAndDisableBypassPermissionsIfNeeded.
 * Call this after /login so the gate check re-runs with the new org.
 */
export declare function resetBypassPermissionsCheck(): void;
export declare function useKickOffCheckAndDisableBypassPermissionsIfNeeded(): void;
export declare function checkAndDisableAutoModeIfNeeded(toolPermissionContext: ToolPermissionContext, setAppState: (f: (prev: AppState) => AppState) => void, fastMode?: boolean): Promise<void>;
/**
 * Reset the run-once flag for checkAndDisableAutoModeIfNeeded.
 * Call this after /login so the gate check re-runs with the new org.
 */
export declare function resetAutoModeGateCheck(): void;
export declare function useKickOffCheckAndDisableAutoModeIfNeeded(): void;
//# sourceMappingURL=bypassPermissionsKillswitch.d.ts.map