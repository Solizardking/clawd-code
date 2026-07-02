import { type env } from './env.js';
/**
 * GitHub Actions metadata when running in CI
 */
export type GitHubActionsMetadata = {
    actor?: string;
    actorId?: string;
    repository?: string;
    repositoryId?: string;
    repositoryOwner?: string;
    repositoryOwnerId?: string;
};
/**
 * Core user data used as base for all analytics providers.
 * This is also the format used by GrowthBook.
 */
export type CoreUserData = {
    deviceId: string;
    sessionId: string;
    email?: string;
    appVersion: string;
    platform: typeof env.platform;
    organizationUuid?: string;
    accountUuid?: string;
    userType?: string;
    subscriptionType?: string;
    rateLimitTier?: string;
    firstTokenTime?: number;
    githubActionsMetadata?: GitHubActionsMetadata;
};
/**
 * Initialize user data asynchronously. Should be called early in startup.
 * This pre-fetches the email so getUser() can remain synchronous.
 */
export declare function initUser(): Promise<void>;
/**
 * Reset all user data caches. Call on auth changes (login/logout/account switch)
 * so the next getCoreUserData() call picks up fresh credentials and email.
 */
export declare function resetUserCache(): void;
/**
 * Get core user data.
 * This is the base representation that gets transformed for different analytics providers.
 */
export declare const getCoreUserData: any;
/**
 * Get user data for GrowthBook (same as core data with analytics metadata).
 */
export declare function getUserForGrowthBook(): CoreUserData;
/**
 * Get the user's git email from `git config user.email`.
 * Memoized so the subprocess only spawns once per process.
 */
export declare const getGitEmail: any;
//# sourceMappingURL=user.d.ts.map