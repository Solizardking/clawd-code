export interface UpdateCheckResult {
    currentVersion: string;
    latestVersion: string;
    hasUpdate: boolean;
}
export interface UpdateRunResult {
    success: boolean;
    output: string;
}
export declare function checkForUpdate(currentVersion: string): Promise<UpdateCheckResult | null>;
export declare function runUpdate(currentVersion: string): Promise<UpdateRunResult>;
