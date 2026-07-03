import type { ProviderId } from "../grok/models";
import { type SandboxMode, type SandboxSettings } from "../utils/settings";
export interface TelegramHeadlessBridgeOptions {
    apiKey?: string;
    baseURL?: string;
    provider?: ProviderId;
    model?: string;
    sandboxMode?: SandboxMode;
    sandboxSettings?: SandboxSettings;
    maxToolRounds?: number;
    toolsets?: string[];
    logFile?: string;
    pairCodeFile?: string;
}
export declare function runTelegramHeadlessBridge(options?: TelegramHeadlessBridgeOptions): Promise<void>;
