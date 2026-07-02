/**
 * Settings Sync Types
 *
 * Zod schemas and types for the user settings sync API.
 * Based on the backend API contract from anthropic/anthropic#218817.
 */
import { z } from 'zod/v4';
/**
 * Content portion of user sync data - flat key-value storage.
 * Keys are opaque strings (typically file paths).
 * Values are UTF-8 string content (JSON, Markdown, etc).
 */
export declare const UserSyncContentSchema: () => any;
/**
 * Full response from GET /api/claude_code/user_settings
 */
export declare const UserSyncDataSchema: () => any;
export type UserSyncData = z.infer<ReturnType<typeof UserSyncDataSchema>>;
/**
 * Result from fetching user settings
 */
export type SettingsSyncFetchResult = {
    success: boolean;
    data?: UserSyncData;
    isEmpty?: boolean;
    error?: string;
    skipRetry?: boolean;
};
/**
 * Result from uploading user settings
 */
export type SettingsSyncUploadResult = {
    success: boolean;
    checksum?: string;
    lastModified?: string;
    error?: string;
};
/**
 * Keys used for sync entries
 */
export declare const SYNC_KEYS: {
    readonly USER_SETTINGS: "~/.claude/settings.json";
    readonly USER_MEMORY: "~/.claude/CLAUDE.md";
    readonly projectSettings: (projectId: string) => string;
    readonly projectMemory: (projectId: string) => string;
};
//# sourceMappingURL=types.d.ts.map