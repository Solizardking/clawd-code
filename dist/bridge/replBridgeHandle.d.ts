import type { ReplBridgeHandle } from './replBridge.js';
export declare function setReplBridgeHandle(h: ReplBridgeHandle | null): void;
export declare function getReplBridgeHandle(): ReplBridgeHandle | null;
/**
 * Our own bridge session ID in the session_* compat format the API returns
 * in /v1/sessions responses — or undefined if bridge isn't connected.
 */
export declare function getSelfBridgeCompatId(): string | undefined;
//# sourceMappingURL=replBridgeHandle.d.ts.map