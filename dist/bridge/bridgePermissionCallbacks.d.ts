import type { PermissionUpdate } from '../utils/permissions/PermissionUpdateSchema.js';
type BridgePermissionResponse = {
    behavior: 'allow' | 'deny';
    updatedInput?: Record<string, unknown>;
    updatedPermissions?: PermissionUpdate[];
    message?: string;
};
type BridgePermissionCallbacks = {
    sendRequest(requestId: string, toolName: string, input: Record<string, unknown>, toolUseId: string, description: string, permissionSuggestions?: PermissionUpdate[], blockedPath?: string): void;
    sendResponse(requestId: string, response: BridgePermissionResponse): void;
    /** Cancel a pending control_request so the web app can dismiss its prompt. */
    cancelRequest(requestId: string): void;
    onResponse(requestId: string, handler: (response: BridgePermissionResponse) => void): () => void;
};
/** Type predicate for validating a parsed control_response payload
 *  as a BridgePermissionResponse. Checks the required `behavior`
 *  discriminant rather than using an unsafe `as` cast. */
declare function isBridgePermissionResponse(value: unknown): value is BridgePermissionResponse;
export { isBridgePermissionResponse };
export type { BridgePermissionCallbacks, BridgePermissionResponse };
//# sourceMappingURL=bridgePermissionCallbacks.d.ts.map