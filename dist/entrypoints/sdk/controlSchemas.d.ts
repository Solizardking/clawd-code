/**
 * SDK Control Schemas - Zod schemas for the control protocol.
 *
 * These schemas define the control protocol between SDK implementations and the CLI.
 * Used by SDK builders (e.g., Python SDK) to communicate with the CLI process.
 *
 * SDK consumers should use coreSchemas.ts instead.
 */
export declare const JSONRPCMessagePlaceholder: () => any;
export declare const SDKHookCallbackMatcherSchema: () => any;
export declare const SDKControlInitializeRequestSchema: () => any;
export declare const SDKControlInitializeResponseSchema: () => any;
export declare const SDKControlInterruptRequestSchema: () => any;
export declare const SDKControlPermissionRequestSchema: () => any;
export declare const SDKControlSetPermissionModeRequestSchema: () => any;
export declare const SDKControlSetModelRequestSchema: () => any;
export declare const SDKControlSetMaxThinkingTokensRequestSchema: () => any;
export declare const SDKControlMcpStatusRequestSchema: () => any;
export declare const SDKControlMcpStatusResponseSchema: () => any;
export declare const SDKControlGetContextUsageRequestSchema: () => any;
export declare const SDKControlGetContextUsageResponseSchema: () => any;
export declare const SDKControlRewindFilesRequestSchema: () => any;
export declare const SDKControlRewindFilesResponseSchema: () => any;
export declare const SDKControlCancelAsyncMessageRequestSchema: () => any;
export declare const SDKControlCancelAsyncMessageResponseSchema: () => any;
export declare const SDKControlSeedReadStateRequestSchema: () => any;
export declare const SDKHookCallbackRequestSchema: () => any;
export declare const SDKControlMcpMessageRequestSchema: () => any;
export declare const SDKControlMcpSetServersRequestSchema: () => any;
export declare const SDKControlMcpSetServersResponseSchema: () => any;
export declare const SDKControlReloadPluginsRequestSchema: () => any;
export declare const SDKControlReloadPluginsResponseSchema: () => any;
export declare const SDKControlMcpReconnectRequestSchema: () => any;
export declare const SDKControlMcpToggleRequestSchema: () => any;
export declare const SDKControlStopTaskRequestSchema: () => any;
export declare const SDKControlApplyFlagSettingsRequestSchema: () => any;
export declare const SDKControlGetSettingsRequestSchema: () => any;
export declare const SDKControlGetSettingsResponseSchema: () => any;
export declare const SDKControlElicitationRequestSchema: () => any;
export declare const SDKControlElicitationResponseSchema: () => any;
export declare const SDKControlRequestInnerSchema: () => any;
export declare const SDKControlRequestSchema: () => any;
export declare const ControlResponseSchema: () => any;
export declare const ControlErrorResponseSchema: () => any;
export declare const SDKControlResponseSchema: () => any;
export declare const SDKControlCancelRequestSchema: () => any;
export declare const SDKKeepAliveMessageSchema: () => any;
export declare const SDKUpdateEnvironmentVariablesMessageSchema: () => any;
export declare const StdoutMessageSchema: () => any;
export declare const StdinMessageSchema: () => any;
//# sourceMappingURL=controlSchemas.d.ts.map