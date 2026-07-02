import { DANGEROUS_SHELL_SETTINGS } from '../../utils/managedEnvConstants.js';
import type { SettingsJson } from '../../utils/settings/types.js';
type DangerousShellSetting = (typeof DANGEROUS_SHELL_SETTINGS)[number];
export type DangerousSettings = {
    shellSettings: Partial<Record<DangerousShellSetting, string>>;
    envVars: Record<string, string>;
    hasHooks: boolean;
    hooks?: unknown;
};
/**
 * Extract dangerous settings from a settings object.
 *
 * Dangerous env vars are determined by checking against SAFE_ENV_VARS -
 * any env var NOT in SAFE_ENV_VARS is considered dangerous.
 * See managedEnv.ts for the authoritative list and threat categories.
 */
export declare function extractDangerousSettings(settings: SettingsJson | null | undefined): DangerousSettings;
/**
 * Check if settings contain any dangerous settings
 */
export declare function hasDangerousSettings(dangerous: DangerousSettings): boolean;
/**
 * Compare two sets of dangerous settings to see if the new settings
 * have changed or added dangerous settings compared to the old settings
 */
export declare function hasDangerousSettingsChanged(oldSettings: SettingsJson | null | undefined, newSettings: SettingsJson | null | undefined): boolean;
/**
 * Format dangerous settings as a human-readable list for the UI
 * Only returns setting names, not values
 */
export declare function formatDangerousSettingsList(dangerous: DangerousSettings): string[];
export {};
//# sourceMappingURL=utils.d.ts.map