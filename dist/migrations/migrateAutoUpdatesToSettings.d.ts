/**
 * Migration: Move user-set autoUpdates preference to settings.json env var
 * Only migrates if user explicitly disabled auto-updates (not for protection)
 * This preserves user intent while allowing native installations to auto-update
 */
export declare function migrateAutoUpdatesToSettings(): void;
//# sourceMappingURL=migrateAutoUpdatesToSettings.d.ts.map