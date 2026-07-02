import type { SettingsJson } from '../../utils/settings/types.js';
export type SecurityCheckResult = 'approved' | 'rejected' | 'no_check_needed';
/**
 * Check if new remote managed settings contain dangerous settings that require user approval.
 * Shows a blocking dialog if dangerous settings have changed or been added.
 *
 * @param cachedSettings The current cached settings (may be null for first run)
 * @param newSettings The new settings fetched from the API
 * @returns 'approved' if user accepts, 'rejected' if user declines, 'no_check_needed' if no dangerous changes
 */
export declare function checkManagedSettingsSecurity(cachedSettings: SettingsJson | null, newSettings: SettingsJson | null): Promise<SecurityCheckResult>;
/**
 * Handle the security check result by exiting if rejected
 * Returns true if we should continue, false if we should stop
 */
export declare function handleSecurityCheckResult(result: SecurityCheckResult): boolean;
//# sourceMappingURL=securityCheck.d.ts.map