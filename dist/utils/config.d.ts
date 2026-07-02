import type { McpServerConfig } from '../services/mcp/types.js';
import type { BillingType, ReferralEligibilityResponse } from '../services/oauth/types.js';
import type { MemoryType } from './memory/types.js';
import type { ThemeSetting } from './theme.js';
import type { ImageDimensions } from './imageResizer.js';
import type { ModelOption } from './model/modelOptions.js';
export type PastedContent = {
    id: number;
    type: 'text' | 'image';
    content: string;
    mediaType?: string;
    filename?: string;
    dimensions?: ImageDimensions;
    sourcePath?: string;
};
export interface SerializedStructuredHistoryEntry {
    display: string;
    pastedContents?: Record<number, PastedContent>;
    pastedText?: string;
}
export interface HistoryEntry {
    display: string;
    pastedContents: Record<number, PastedContent>;
}
export type ReleaseChannel = 'stable' | 'latest';
export type ProjectConfig = {
    allowedTools: string[];
    mcpContextUris: string[];
    mcpServers?: Record<string, McpServerConfig>;
    lastAPIDuration?: number;
    lastAPIDurationWithoutRetries?: number;
    lastToolDuration?: number;
    lastCost?: number;
    lastDuration?: number;
    lastLinesAdded?: number;
    lastLinesRemoved?: number;
    lastTotalInputTokens?: number;
    lastTotalOutputTokens?: number;
    lastTotalCacheCreationInputTokens?: number;
    lastTotalCacheReadInputTokens?: number;
    lastTotalWebSearchRequests?: number;
    lastFpsAverage?: number;
    lastFpsLow1Pct?: number;
    lastSessionId?: string;
    lastModelUsage?: Record<string, {
        inputTokens: number;
        outputTokens: number;
        cacheReadInputTokens: number;
        cacheCreationInputTokens: number;
        webSearchRequests: number;
        costUSD: number;
    }>;
    lastSessionMetrics?: Record<string, number>;
    exampleFiles?: string[];
    exampleFilesGeneratedAt?: number;
    hasTrustDialogAccepted?: boolean;
    hasCompletedProjectOnboarding?: boolean;
    projectOnboardingSeenCount: number;
    hasClaudeMdExternalIncludesApproved?: boolean;
    hasClaudeMdExternalIncludesWarningShown?: boolean;
    enabledMcpjsonServers?: string[];
    disabledMcpjsonServers?: string[];
    enableAllProjectMcpServers?: boolean;
    disabledMcpServers?: string[];
    enabledMcpServers?: string[];
    activeWorktreeSession?: {
        originalCwd: string;
        worktreePath: string;
        worktreeName: string;
        originalBranch?: string;
        sessionId: string;
        hookBased?: boolean;
    };
    /** Spawn mode for `claude remote-control` multi-session. Set by first-run dialog or `w` toggle. */
    remoteControlSpawnMode?: 'same-dir' | 'worktree';
};
export type InstallMethod = 'local' | 'native' | 'global' | 'unknown';
export { EDITOR_MODES, NOTIFICATION_CHANNELS, } from './configConstants.js';
import type { EDITOR_MODES, NOTIFICATION_CHANNELS } from './configConstants.js';
export type NotificationChannel = (typeof NOTIFICATION_CHANNELS)[number];
export type AccountInfo = {
    accountUuid: string;
    emailAddress: string;
    organizationUuid?: string;
    organizationName?: string | null;
    organizationRole?: string | null;
    workspaceRole?: string | null;
    displayName?: string;
    hasExtraUsageEnabled?: boolean;
    billingType?: BillingType | null;
    accountCreatedAt?: string;
    subscriptionCreatedAt?: string;
};
export type EditorMode = 'emacs' | (typeof EDITOR_MODES)[number];
export type DiffTool = 'terminal' | 'auto';
export type OutputStyle = string;
export type GlobalConfig = {
    /**
     * @deprecated Use settings.apiKeyHelper instead.
     */
    apiKeyHelper?: string;
    projects?: Record<string, ProjectConfig>;
    numStartups: number;
    installMethod?: InstallMethod;
    autoUpdates?: boolean;
    autoUpdatesProtectedForNative?: boolean;
    doctorShownAtSession?: number;
    userID?: string;
    theme: ThemeSetting;
    hasCompletedOnboarding?: boolean;
    lastOnboardingVersion?: string;
    lastReleaseNotesSeen?: string;
    changelogLastFetched?: number;
    cachedChangelog?: string;
    mcpServers?: Record<string, McpServerConfig>;
    claudeAiMcpEverConnected?: string[];
    preferredNotifChannel: NotificationChannel;
    /**
     * @deprecated. Use the Notification hook instead (docs/hooks.md).
     */
    customNotifyCommand?: string;
    verbose: boolean;
    customApiKeyResponses?: {
        approved?: string[];
        rejected?: string[];
    };
    primaryApiKey?: string;
    hasAcknowledgedCostThreshold?: boolean;
    hasSeenUndercoverAutoNotice?: boolean;
    hasSeenUltraplanTerms?: boolean;
    hasResetAutoModeOptInForDefaultOffer?: boolean;
    oauthAccount?: AccountInfo;
    iterm2KeyBindingInstalled?: boolean;
    editorMode?: EditorMode;
    bypassPermissionsModeAccepted?: boolean;
    hasUsedBackslashReturn?: boolean;
    autoCompactEnabled: boolean;
    showTurnDuration: boolean;
    /**
     * @deprecated Use settings.env instead.
     */
    env: {
        [key: string]: string;
    };
    hasSeenTasksHint?: boolean;
    hasUsedStash?: boolean;
    hasUsedBackgroundTask?: boolean;
    queuedCommandUpHintCount?: number;
    diffTool?: DiffTool;
    iterm2SetupInProgress?: boolean;
    iterm2BackupPath?: string;
    appleTerminalBackupPath?: string;
    appleTerminalSetupInProgress?: boolean;
    shiftEnterKeyBindingInstalled?: boolean;
    optionAsMetaKeyInstalled?: boolean;
    autoConnectIde?: boolean;
    autoInstallIdeExtension?: boolean;
    hasIdeOnboardingBeenShown?: Record<string, boolean>;
    ideHintShownCount?: number;
    hasIdeAutoConnectDialogBeenShown?: boolean;
    tipsHistory: {
        [tipId: string]: number;
    };
    companion?: import('../buddy/types.js').StoredCompanion;
    companionMuted?: boolean;
    feedbackSurveyState?: {
        lastShownTime?: number;
    };
    transcriptShareDismissed?: boolean;
    memoryUsageCount: number;
    hasShownS1MWelcomeV2?: Record<string, boolean>;
    s1mAccessCache?: Record<string, {
        hasAccess: boolean;
        hasAccessNotAsDefault?: boolean;
        timestamp: number;
    }>;
    s1mNonSubscriberAccessCache?: Record<string, {
        hasAccess: boolean;
        hasAccessNotAsDefault?: boolean;
        timestamp: number;
    }>;
    passesEligibilityCache?: Record<string, ReferralEligibilityResponse & {
        timestamp: number;
    }>;
    groveConfigCache?: Record<string, {
        grove_enabled: boolean;
        timestamp: number;
    }>;
    passesUpsellSeenCount?: number;
    hasVisitedPasses?: boolean;
    passesLastSeenRemaining?: number;
    overageCreditGrantCache?: Record<string, {
        info: {
            available: boolean;
            eligible: boolean;
            granted: boolean;
            amount_minor_units: number | null;
            currency: string | null;
        };
        timestamp: number;
    }>;
    overageCreditUpsellSeenCount?: number;
    hasVisitedExtraUsage?: boolean;
    voiceNoticeSeenCount?: number;
    voiceLangHintShownCount?: number;
    voiceLangHintLastLanguage?: string;
    voiceFooterHintSeenCount?: number;
    opus1mMergeNoticeSeenCount?: number;
    experimentNoticesSeenCount?: Record<string, number>;
    hasShownOpusPlanWelcome?: Record<string, boolean>;
    promptQueueUseCount: number;
    btwUseCount: number;
    lastPlanModeUse?: number;
    subscriptionNoticeCount?: number;
    hasAvailableSubscription?: boolean;
    subscriptionUpsellShownCount?: number;
    recommendedSubscription?: string;
    todoFeatureEnabled: boolean;
    showExpandedTodos?: boolean;
    showSpinnerTree?: boolean;
    firstStartTime?: string;
    messageIdleNotifThresholdMs: number;
    githubActionSetupCount?: number;
    slackAppInstallCount?: number;
    fileCheckpointingEnabled: boolean;
    terminalProgressBarEnabled: boolean;
    showStatusInTerminalTab?: boolean;
    taskCompleteNotifEnabled?: boolean;
    inputNeededNotifEnabled?: boolean;
    agentPushNotifEnabled?: boolean;
    claudeCodeFirstTokenDate?: string;
    modelSwitchCalloutDismissed?: boolean;
    modelSwitchCalloutLastShown?: number;
    modelSwitchCalloutVersion?: string;
    effortCalloutDismissed?: boolean;
    effortCalloutV2Dismissed?: boolean;
    remoteDialogSeen?: boolean;
    bridgeOauthDeadExpiresAt?: number;
    bridgeOauthDeadFailCount?: number;
    desktopUpsellSeenCount?: number;
    desktopUpsellDismissed?: boolean;
    idleReturnDismissed?: boolean;
    opusProMigrationComplete?: boolean;
    opusProMigrationTimestamp?: number;
    sonnet1m45MigrationComplete?: boolean;
    legacyOpusMigrationTimestamp?: number;
    sonnet45To46MigrationTimestamp?: number;
    cachedStatsigGates: {
        [gateName: string]: boolean;
    };
    cachedDynamicConfigs?: {
        [configName: string]: unknown;
    };
    cachedGrowthBookFeatures?: {
        [featureName: string]: unknown;
    };
    growthBookOverrides?: {
        [featureName: string]: unknown;
    };
    lastShownEmergencyTip?: string;
    respectGitignore: boolean;
    copyFullResponse: boolean;
    copyOnSelect?: boolean;
    githubRepoPaths?: Record<string, string[]>;
    deepLinkTerminal?: string;
    iterm2It2SetupComplete?: boolean;
    preferTmuxOverIterm2?: boolean;
    skillUsage?: Record<string, {
        usageCount: number;
        lastUsedAt: number;
    }>;
    officialMarketplaceAutoInstallAttempted?: boolean;
    officialMarketplaceAutoInstalled?: boolean;
    officialMarketplaceAutoInstallFailReason?: 'policy_blocked' | 'git_unavailable' | 'gcs_unavailable' | 'unknown';
    officialMarketplaceAutoInstallRetryCount?: number;
    officialMarketplaceAutoInstallLastAttemptTime?: number;
    officialMarketplaceAutoInstallNextRetryTime?: number;
    hasCompletedClaudeInChromeOnboarding?: boolean;
    claudeInChromeDefaultEnabled?: boolean;
    cachedChromeExtensionInstalled?: boolean;
    chromeExtension?: {
        pairedDeviceId?: string;
        pairedDeviceName?: string;
    };
    lspRecommendationDisabled?: boolean;
    lspRecommendationNeverPlugins?: string[];
    lspRecommendationIgnoredCount?: number;
    claudeCodeHints?: {
        plugin?: string[];
        disabled?: boolean;
    };
    permissionExplainerEnabled?: boolean;
    teammateMode?: 'auto' | 'tmux' | 'in-process';
    teammateDefaultModel?: string | null;
    prStatusFooterEnabled?: boolean;
    tungstenPanelVisible?: boolean;
    penguinModeOrgEnabled?: boolean;
    startupPrefetchedAt?: number;
    remoteControlAtStartup?: boolean;
    cachedExtraUsageDisabledReason?: string | null;
    autoPermissionsNotificationCount?: number;
    speculationEnabled?: boolean;
    clientDataCache?: Record<string, unknown> | null;
    additionalModelOptionsCache?: ModelOption[];
    metricsStatusCache?: {
        enabled: boolean;
        timestamp: number;
    };
    migrationVersion?: number;
};
export declare const DEFAULT_GLOBAL_CONFIG: GlobalConfig;
export declare const GLOBAL_CONFIG_KEYS: readonly ["apiKeyHelper", "installMethod", "autoUpdates", "autoUpdatesProtectedForNative", "theme", "verbose", "preferredNotifChannel", "shiftEnterKeyBindingInstalled", "editorMode", "hasUsedBackslashReturn", "autoCompactEnabled", "showTurnDuration", "diffTool", "env", "tipsHistory", "todoFeatureEnabled", "showExpandedTodos", "messageIdleNotifThresholdMs", "autoConnectIde", "autoInstallIdeExtension", "fileCheckpointingEnabled", "terminalProgressBarEnabled", "showStatusInTerminalTab", "taskCompleteNotifEnabled", "inputNeededNotifEnabled", "agentPushNotifEnabled", "respectGitignore", "claudeInChromeDefaultEnabled", "hasCompletedClaudeInChromeOnboarding", "lspRecommendationDisabled", "lspRecommendationNeverPlugins", "lspRecommendationIgnoredCount", "copyFullResponse", "copyOnSelect", "permissionExplainerEnabled", "prStatusFooterEnabled", "remoteControlAtStartup", "remoteDialogSeen"];
export type GlobalConfigKey = (typeof GLOBAL_CONFIG_KEYS)[number];
export declare function isGlobalConfigKey(key: string): key is GlobalConfigKey;
export declare const PROJECT_CONFIG_KEYS: readonly ["allowedTools", "hasTrustDialogAccepted", "hasCompletedProjectOnboarding"];
export type ProjectConfigKey = (typeof PROJECT_CONFIG_KEYS)[number];
export declare function resetTrustDialogAcceptedCacheForTesting(): void;
export declare function checkHasTrustDialogAccepted(): boolean;
/**
 * Check trust for an arbitrary directory (not the session cwd).
 * Walks up from `dir`, returning true if any ancestor has trust persisted.
 * Unlike checkHasTrustDialogAccepted, this does NOT consult session trust or
 * the memoized project path — use when the target dir differs from cwd (e.g.
 * /assistant installing into a user-typed path).
 */
export declare function isPathTrusted(dir: string): boolean;
export declare function isProjectConfigKey(key: string): key is ProjectConfigKey;
/**
 * Detect whether writing `fresh` would lose auth/onboarding state that the
 * in-memory cache still has. This happens when `getConfig` hits a corrupted
 * or truncated file mid-write (from another process or a non-atomic fallback)
 * and returns DEFAULT_GLOBAL_CONFIG. Writing that back would permanently
 * wipe auth. See GH #3117.
 */
declare function wouldLoseAuthState(fresh: {
    oauthAccount?: unknown;
    hasCompletedOnboarding?: boolean;
}): boolean;
export declare function saveGlobalConfig(updater: (currentConfig: GlobalConfig) => GlobalConfig): void;
export declare function getGlobalConfigWriteCount(): number;
export declare const CONFIG_WRITE_DISPLAY_THRESHOLD = 20;
export declare function getGlobalConfig(): GlobalConfig;
/**
 * Returns the effective value of remoteControlAtStartup. Precedence:
 *   1. User's explicit config value (always wins — honors opt-out)
 *   2. CCR auto-connect default (ant-only build, GrowthBook-gated)
 *   3. false (Remote Control must be explicitly opted into)
 */
export declare function getRemoteControlAtStartup(): boolean;
export declare function getCustomApiKeyStatus(truncatedApiKey: string): 'approved' | 'rejected' | 'new';
export declare function enableConfigs(): void;
declare function getConfig<A>(file: string, createDefault: () => A, throwOnInvalid?: boolean): A;
export declare const getProjectPathForConfig: any;
export declare function getCurrentProjectConfig(): ProjectConfig;
export declare function saveCurrentProjectConfig(updater: (currentConfig: ProjectConfig) => ProjectConfig): void;
export declare function isAutoUpdaterDisabled(): boolean;
/**
 * Returns true if plugin autoupdate should be skipped.
 * This checks if the auto-updater is disabled AND the FORCE_AUTOUPDATE_PLUGINS
 * env var is not set to 'true'. The env var allows forcing plugin autoupdate
 * even when the auto-updater is otherwise disabled.
 */
export declare function shouldSkipPluginAutoupdate(): boolean;
export type AutoUpdaterDisabledReason = {
    type: 'development';
} | {
    type: 'env';
    envVar: string;
} | {
    type: 'config';
};
export declare function formatAutoUpdaterDisabledReason(reason: AutoUpdaterDisabledReason): string;
export declare function getAutoUpdaterDisabledReason(): AutoUpdaterDisabledReason | null;
export declare function getOrCreateUserID(): string;
export declare function recordFirstStartTime(): void;
export declare function getMemoryPath(memoryType: MemoryType): string;
export declare function getManagedClaudeRulesDir(): string;
export declare function getUserClaudeRulesDir(): string;
export declare const _getConfigForTesting: typeof getConfig;
export declare const _wouldLoseAuthStateForTesting: typeof wouldLoseAuthState;
export declare function _setGlobalConfigCacheForTesting(config: GlobalConfig | null): void;
//# sourceMappingURL=config.d.ts.map