import { type SandboxMode, type SandboxSettings } from "../utils/settings";
export interface TelegramHeadlessBridgeOptions {
    apiKey?: string;
    baseURL?: string;
    model?: string;
    sandboxMode?: SandboxMode;
    sandboxSettings?: SandboxSettings;
    maxToolRounds?: number;
    logFile?: string;
    pairCodeFile?: string;
}
export declare function runTelegramHeadlessBridge(options?: TelegramHeadlessBridgeOptions): Promise<void>;
