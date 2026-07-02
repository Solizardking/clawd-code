import { z } from 'zod/v4';
import type { SettingsJson } from '../../utils/settings/types.js';
/**
 * Schema for the remotely managed settings response.
 * Note: Uses permissive z.record() instead of SettingsSchema to avoid circular dependency.
 * Full validation is performed in index.ts after parsing using SettingsSchema.safeParse().
 */
export declare const RemoteManagedSettingsResponseSchema: () => any;
export type RemoteManagedSettingsResponse = z.infer<ReturnType<typeof RemoteManagedSettingsResponseSchema>>;
/**
 * Result of fetching remotely managed settings
 */
export type RemoteManagedSettingsFetchResult = {
    success: boolean;
    settings?: SettingsJson | null;
    checksum?: string;
    error?: string;
    skipRetry?: boolean;
};
//# sourceMappingURL=types.d.ts.map