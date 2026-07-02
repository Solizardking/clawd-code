import type { OAuthTokens, SubscriptionType } from '../services/oauth/types.js';
import { type AccountInfo } from './config.js';
/** Whether we are supporting direct 1P auth. */
export declare function isAnthropicAuthEnabled(): boolean;
/** Where the auth token is being sourced from, if any. */
export declare function getAuthTokenSource(): {
    source: "apiKeyHelper";
    hasToken: boolean;
} | {
    source: "none";
    hasToken: boolean;
} | {
    source: "ANTHROPIC_AUTH_TOKEN";
    hasToken: boolean;
} | {
    source: "CLAUDE_CODE_OAUTH_TOKEN";
    hasToken: boolean;
} | {
    source: "CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR";
    hasToken: boolean;
} | {
    source: "CCR_OAUTH_TOKEN_FILE";
    hasToken: boolean;
} | {
    source: "claude.ai";
    hasToken: boolean;
};
export type ApiKeySource = 'ANTHROPIC_API_KEY' | 'apiKeyHelper' | '/login managed key' | 'none';
export declare function getAnthropicApiKey(): null | string;
export declare function hasAnthropicApiKeyAuth(): boolean;
export declare function getAnthropicApiKeyWithSource(opts?: {
    skipRetrievingKeyFromApiKeyHelper?: boolean;
}): {
    key: null | string;
    source: ApiKeySource;
};
/**
 * Get the configured apiKeyHelper from settings.
 * In bare mode, only the --settings flag source is consulted — apiKeyHelper
 * from ~/.claude/settings.json or project settings is ignored.
 */
export declare function getConfiguredApiKeyHelper(): string | undefined;
/**
 * Check if the configured awsAuthRefresh comes from project settings
 */
export declare function isAwsAuthRefreshFromProjectSettings(): boolean;
/**
 * Check if the configured awsCredentialExport comes from project settings
 */
export declare function isAwsCredentialExportFromProjectSettings(): boolean;
/**
 * Calculate TTL in milliseconds for the API key helper cache
 * Uses CLAUDE_CODE_API_KEY_HELPER_TTL_MS env var if set and valid,
 * otherwise defaults to 5 minutes
 */
export declare function calculateApiKeyHelperTTL(): number;
export declare function getApiKeyHelperElapsedMs(): number;
export declare function getApiKeyFromApiKeyHelper(isNonInteractiveSession: boolean): Promise<string | null>;
/**
 * Sync cache reader — returns the last fetched apiKeyHelper value without executing.
 * Returns stale values to match SWR semantics of the async reader.
 * Returns null only if the async fetch hasn't completed yet.
 */
export declare function getApiKeyFromApiKeyHelperCached(): string | null;
export declare function clearApiKeyHelperCache(): void;
export declare function prefetchApiKeyFromApiKeyHelperIfSafe(isNonInteractiveSession: boolean): void;
export declare function refreshAwsAuth(awsAuthRefresh: string): Promise<boolean>;
/**
 * Refresh AWS authentication and get credentials with cache clearing
 * This combines runAwsAuthRefresh, getAwsCredsFromCredentialExport, and clearAwsIniCache
 * to ensure fresh credentials are always used
 */
export declare const refreshAndGetAwsCredentials: (() => Promise<{
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken: string;
} | null>) & {
    cache: {
        clear: () => void;
    };
};
export declare function clearAwsCredentialsCache(): void;
/**
 * Check if the configured gcpAuthRefresh comes from project settings
 */
export declare function isGcpAuthRefreshFromProjectSettings(): boolean;
/**
 * Check if GCP credentials are currently valid by attempting to get an access token.
 * This uses the same authentication chain that the Vertex SDK uses.
 */
export declare function checkGcpCredentialsValid(): Promise<boolean>;
export declare function refreshGcpAuth(gcpAuthRefresh: string): Promise<boolean>;
/**
 * Refresh GCP authentication if needed.
 * This function checks if credentials are valid and runs the refresh command if not.
 * Memoized with TTL to avoid excessive refresh attempts.
 */
export declare const refreshGcpCredentialsIfNeeded: (() => Promise<boolean>) & {
    cache: {
        clear: () => void;
    };
};
export declare function clearGcpCredentialsCache(): void;
/**
 * Prefetches GCP credentials only if workspace trust has already been established.
 * This allows us to start the potentially slow GCP commands early for trusted workspaces
 * while maintaining security for untrusted ones.
 *
 * Returns void to prevent misuse - use refreshGcpCredentialsIfNeeded() to actually refresh.
 */
export declare function prefetchGcpCredentialsIfSafe(): void;
/**
 * Prefetches AWS credentials only if workspace trust has already been established.
 * This allows us to start the potentially slow AWS commands early for trusted workspaces
 * while maintaining security for untrusted ones.
 *
 * Returns void to prevent misuse - use refreshAndGetAwsCredentials() to actually retrieve credentials.
 */
export declare function prefetchAwsCredentialsAndBedRockInfoIfSafe(): void;
/** @private Use {@link getAnthropicApiKey} or {@link getAnthropicApiKeyWithSource} */
export declare const getApiKeyFromConfigOrMacOSKeychain: any;
export declare function saveApiKey(apiKey: string): Promise<void>;
export declare function isCustomApiKeyApproved(apiKey: string): boolean;
export declare function removeApiKey(): Promise<void>;
export declare function saveOAuthTokensIfNeeded(tokens: OAuthTokens): {
    success: boolean;
    warning?: string;
};
export declare const getClaudeAIOAuthTokens: any;
/**
 * Clears all OAuth token caches. Call this on 401 errors to ensure
 * the next token read comes from secure storage, not stale in-memory caches.
 * This handles the case where the local expiration check disagrees with the
 * server (e.g., due to clock corrections after token was issued).
 */
export declare function clearOAuthTokenCache(): void;
/**
 * Handle a 401 "OAuth token has expired" error from the API.
 *
 * This function forces a token refresh when the server says the token is expired,
 * even if our local expiration check disagrees (which can happen due to clock
 * issues when the token was issued).
 *
 * Safety: We compare the failed token with what's in keychain. If another tab
 * already refreshed (different token in keychain), we use that instead of
 * refreshing again. Concurrent calls with the same failedAccessToken are
 * deduplicated to a single keychain read.
 *
 * @param failedAccessToken - The access token that was rejected with 401
 * @returns true if we now have a valid token, false otherwise
 */
export declare function handleOAuth401Error(failedAccessToken: string): Promise<boolean>;
/**
 * Reads OAuth tokens asynchronously, avoiding blocking keychain reads.
 * Delegates to the sync memoized version for env var / file descriptor tokens
 * (which don't hit the keychain), and only uses async for storage reads.
 */
export declare function getClaudeAIOAuthTokensAsync(): Promise<OAuthTokens | null>;
export declare function checkAndRefreshOAuthTokenIfNeeded(retryCount?: number, force?: boolean): Promise<boolean>;
export declare function isClaudeAISubscriber(): boolean;
/**
 * Check if the current OAuth token has the user:profile scope.
 *
 * Real /login tokens always include this scope. Env-var and file-descriptor
 * tokens (service keys) hardcode scopes to ['user:inference'] only. Use this
 * to gate calls to profile-scoped endpoints so service key sessions don't
 * generate 403 storms against /api/oauth/profile, bootstrap, etc.
 */
export declare function hasProfileScope(): boolean;
export declare function is1PApiCustomer(): boolean;
/**
 * Gets OAuth account information when Anthropic auth is enabled.
 * Returns undefined when using external API keys or third-party services.
 */
export declare function getOauthAccountInfo(): AccountInfo | undefined;
/**
 * Checks if overage/extra usage provisioning is allowed for this organization.
 * This mirrors the logic in apps/claude-ai `useIsOverageProvisioningAllowed` hook as closely as possible.
 */
export declare function isOverageProvisioningAllowed(): boolean;
export declare function hasOpusAccess(): boolean;
export declare function getSubscriptionType(): SubscriptionType | null;
export declare function isMaxSubscriber(): boolean;
export declare function isTeamSubscriber(): boolean;
export declare function isTeamPremiumSubscriber(): boolean;
export declare function isEnterpriseSubscriber(): boolean;
export declare function isProSubscriber(): boolean;
export declare function getRateLimitTier(): string | null;
export declare function getSubscriptionName(): string;
/** Check if using third-party services (Bedrock or Vertex or Foundry) */
export declare function isUsing3PServices(): boolean;
/**
 * Check if the configured otelHeadersHelper comes from project settings (projectSettings or localSettings)
 */
export declare function isOtelHeadersHelperFromProjectOrLocalSettings(): boolean;
export declare function getOtelHeadersFromHelper(): Record<string, string>;
export declare function isConsumerSubscriber(): boolean;
export type UserAccountInfo = {
    subscription?: string;
    tokenSource?: string;
    apiKeySource?: ApiKeySource;
    organization?: string;
    email?: string;
};
export declare function getAccountInformation(): UserAccountInfo | undefined;
/**
 * Result of org validation — either success or a descriptive error.
 */
export type OrgValidationResult = {
    valid: true;
} | {
    valid: false;
    message: string;
};
/**
 * Validate that the active OAuth token belongs to the organization required
 * by `forceLoginOrgUUID` in managed settings. Returns a result object
 * rather than throwing so callers can choose how to surface the error.
 *
 * Fails closed: if `forceLoginOrgUUID` is set and we cannot determine the
 * token's org (network error, missing profile data), validation fails.
 */
export declare function validateForceLoginOrg(): Promise<OrgValidationResult>;
//# sourceMappingURL=auth.d.ts.map