export declare function markITerm2SetupComplete(): void;
type RestoreResult = {
    status: 'restored' | 'no_backup';
} | {
    status: 'failed';
    backupPath: string;
};
export declare function checkAndRestoreITerm2Backup(): Promise<RestoreResult>;
export {};
//# sourceMappingURL=iTermBackup.d.ts.map