export interface TelegramHeadlessBridgePaths {
    logFile: string;
    pairCodeFile: string;
}
export interface TelegramHeadlessBridgePathOptions {
    logFile?: string;
    pairCodeFile?: string;
}
export declare function resolveTelegramHeadlessBridgePaths(cwd: string, options?: TelegramHeadlessBridgePathOptions): TelegramHeadlessBridgePaths;
