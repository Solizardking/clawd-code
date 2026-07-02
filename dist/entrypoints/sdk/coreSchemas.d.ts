/**
 * SDK Core Schemas - Zod schemas for serializable SDK data types.
 *
 * These schemas are the single source of truth for SDK data types.
 * TypeScript types are generated from these schemas and committed for IDE support.
 *
 * @see scripts/generate-sdk-types.ts for type generation
 */
export declare const ModelUsageSchema: () => any;
export declare const OutputFormatTypeSchema: () => any;
export declare const BaseOutputFormatSchema: () => any;
export declare const JsonSchemaOutputFormatSchema: () => any;
export declare const OutputFormatSchema: () => any;
export declare const ApiKeySourceSchema: () => any;
export declare const ConfigScopeSchema: () => any;
export declare const SdkBetaSchema: () => any;
export declare const ThinkingAdaptiveSchema: () => any;
export declare const ThinkingEnabledSchema: () => any;
export declare const ThinkingDisabledSchema: () => any;
export declare const ThinkingConfigSchema: () => any;
export declare const McpStdioServerConfigSchema: () => any;
export declare const McpSSEServerConfigSchema: () => any;
export declare const McpHttpServerConfigSchema: () => any;
export declare const McpSdkServerConfigSchema: () => any;
export declare const McpServerConfigForProcessTransportSchema: () => any;
export declare const McpClaudeAIProxyServerConfigSchema: () => any;
export declare const McpServerStatusConfigSchema: () => any;
export declare const McpServerStatusSchema: () => any;
export declare const McpSetServersResultSchema: () => any;
export declare const PermissionUpdateDestinationSchema: () => any;
export declare const PermissionBehaviorSchema: () => any;
export declare const PermissionRuleValueSchema: () => any;
export declare const PermissionUpdateSchema: () => any;
export declare const PermissionDecisionClassificationSchema: () => any;
export declare const PermissionResultSchema: () => any;
export declare const PermissionModeSchema: () => any;
export declare const HOOK_EVENTS: readonly ["PreToolUse", "PostToolUse", "PostToolUseFailure", "Notification", "UserPromptSubmit", "SessionStart", "SessionEnd", "Stop", "StopFailure", "SubagentStart", "SubagentStop", "PreCompact", "PostCompact", "PermissionRequest", "PermissionDenied", "Setup", "TeammateIdle", "TaskCreated", "TaskCompleted", "Elicitation", "ElicitationResult", "ConfigChange", "WorktreeCreate", "WorktreeRemove", "InstructionsLoaded", "CwdChanged", "FileChanged"];
export declare const HookEventSchema: () => any;
export declare const BaseHookInputSchema: () => any;
export declare const PreToolUseHookInputSchema: () => any;
export declare const PermissionRequestHookInputSchema: () => any;
export declare const PostToolUseHookInputSchema: () => any;
export declare const PostToolUseFailureHookInputSchema: () => any;
export declare const PermissionDeniedHookInputSchema: () => any;
export declare const NotificationHookInputSchema: () => any;
export declare const UserPromptSubmitHookInputSchema: () => any;
export declare const SessionStartHookInputSchema: () => any;
export declare const SetupHookInputSchema: () => any;
export declare const StopHookInputSchema: () => any;
export declare const StopFailureHookInputSchema: () => any;
export declare const SubagentStartHookInputSchema: () => any;
export declare const SubagentStopHookInputSchema: () => any;
export declare const PreCompactHookInputSchema: () => any;
export declare const PostCompactHookInputSchema: () => any;
export declare const TeammateIdleHookInputSchema: () => any;
export declare const TaskCreatedHookInputSchema: () => any;
export declare const TaskCompletedHookInputSchema: () => any;
export declare const ElicitationHookInputSchema: () => any;
export declare const ElicitationResultHookInputSchema: () => any;
export declare const CONFIG_CHANGE_SOURCES: readonly ["user_settings", "project_settings", "local_settings", "policy_settings", "skills"];
export declare const ConfigChangeHookInputSchema: () => any;
export declare const INSTRUCTIONS_LOAD_REASONS: readonly ["session_start", "nested_traversal", "path_glob_match", "include", "compact"];
export declare const INSTRUCTIONS_MEMORY_TYPES: readonly ["User", "Project", "Local", "Managed"];
export declare const InstructionsLoadedHookInputSchema: () => any;
export declare const WorktreeCreateHookInputSchema: () => any;
export declare const WorktreeRemoveHookInputSchema: () => any;
export declare const CwdChangedHookInputSchema: () => any;
export declare const FileChangedHookInputSchema: () => any;
export declare const EXIT_REASONS: readonly ["clear", "resume", "logout", "prompt_input_exit", "other", "bypass_permissions_disabled"];
export declare const ExitReasonSchema: () => any;
export declare const SessionEndHookInputSchema: () => any;
export declare const HookInputSchema: () => any;
export declare const AsyncHookJSONOutputSchema: () => any;
export declare const PreToolUseHookSpecificOutputSchema: () => any;
export declare const UserPromptSubmitHookSpecificOutputSchema: () => any;
export declare const SessionStartHookSpecificOutputSchema: () => any;
export declare const SetupHookSpecificOutputSchema: () => any;
export declare const SubagentStartHookSpecificOutputSchema: () => any;
export declare const PostToolUseHookSpecificOutputSchema: () => any;
export declare const PostToolUseFailureHookSpecificOutputSchema: () => any;
export declare const PermissionDeniedHookSpecificOutputSchema: () => any;
export declare const NotificationHookSpecificOutputSchema: () => any;
export declare const PermissionRequestHookSpecificOutputSchema: () => any;
export declare const CwdChangedHookSpecificOutputSchema: () => any;
export declare const FileChangedHookSpecificOutputSchema: () => any;
export declare const SyncHookJSONOutputSchema: () => any;
export declare const ElicitationHookSpecificOutputSchema: () => any;
export declare const ElicitationResultHookSpecificOutputSchema: () => any;
export declare const WorktreeCreateHookSpecificOutputSchema: () => any;
export declare const HookJSONOutputSchema: () => any;
export declare const PromptRequestOptionSchema: () => any;
export declare const PromptRequestSchema: () => any;
export declare const PromptResponseSchema: () => any;
export declare const SlashCommandSchema: () => any;
export declare const AgentInfoSchema: () => any;
export declare const ModelInfoSchema: () => any;
export declare const AccountInfoSchema: () => any;
export declare const AgentMcpServerSpecSchema: () => any;
export declare const AgentDefinitionSchema: () => any;
export declare const SettingSourceSchema: () => any;
export declare const SdkPluginConfigSchema: () => any;
export declare const RewindFilesResultSchema: () => any;
/** Placeholder for APIUserMessage from @anthropic-ai/sdk */
export declare const APIUserMessagePlaceholder: () => any;
/** Placeholder for APIAssistantMessage from @anthropic-ai/sdk */
export declare const APIAssistantMessagePlaceholder: () => any;
/** Placeholder for RawMessageStreamEvent from @anthropic-ai/sdk */
export declare const RawMessageStreamEventPlaceholder: () => any;
/** Placeholder for UUID from crypto */
export declare const UUIDPlaceholder: () => any;
/** Placeholder for NonNullableUsage (mapped type over Usage) */
export declare const NonNullableUsagePlaceholder: () => any;
export declare const SDKAssistantMessageErrorSchema: () => any;
export declare const SDKStatusSchema: () => any;
export declare const SDKUserMessageSchema: () => any;
export declare const SDKUserMessageReplaySchema: () => any;
export declare const SDKRateLimitInfoSchema: () => any;
export declare const SDKAssistantMessageSchema: () => any;
export declare const SDKRateLimitEventSchema: () => any;
export declare const SDKStreamlinedTextMessageSchema: () => any;
export declare const SDKStreamlinedToolUseSummaryMessageSchema: () => any;
export declare const SDKPermissionDenialSchema: () => any;
export declare const SDKResultSuccessSchema: () => any;
export declare const SDKResultErrorSchema: () => any;
export declare const SDKResultMessageSchema: () => any;
export declare const SDKSystemMessageSchema: () => any;
export declare const SDKPartialAssistantMessageSchema: () => any;
export declare const SDKCompactBoundaryMessageSchema: () => any;
export declare const SDKStatusMessageSchema: () => any;
export declare const SDKPostTurnSummaryMessageSchema: () => any;
export declare const SDKAPIRetryMessageSchema: () => any;
export declare const SDKLocalCommandOutputMessageSchema: () => any;
export declare const SDKHookStartedMessageSchema: () => any;
export declare const SDKHookProgressMessageSchema: () => any;
export declare const SDKHookResponseMessageSchema: () => any;
export declare const SDKToolProgressMessageSchema: () => any;
export declare const SDKAuthStatusMessageSchema: () => any;
export declare const SDKFilesPersistedEventSchema: () => any;
export declare const SDKTaskNotificationMessageSchema: () => any;
export declare const SDKTaskStartedMessageSchema: () => any;
export declare const SDKSessionStateChangedMessageSchema: () => any;
export declare const SDKTaskProgressMessageSchema: () => any;
export declare const SDKToolUseSummaryMessageSchema: () => any;
export declare const SDKElicitationCompleteMessageSchema: () => any;
/** @internal */
export declare const SDKPromptSuggestionMessageSchema: () => any;
export declare const SDKSessionInfoSchema: () => any;
export declare const SDKMessageSchema: () => any;
export declare const FastModeStateSchema: () => any;
//# sourceMappingURL=coreSchemas.d.ts.map