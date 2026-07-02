export declare function markTerminalSetupInProgress(backupPath: string): void;
export declare function markTerminalSetupComplete(): void;
export declare function getTerminalPlistPath(): string;
export declare function backupTerminalPreferences(): Promise<string | null>;
type RestoreResult = {
    status: 'restored' | 'no_backup';
} | {
    status: 'failed';
    backupPath: string;
};
export declare function checkAndRestoreTerminalBackup(): Promise<RestoreResult>;
export {};
//# sourceMappingURL=appleTerminalBackup.d.ts.map