import type { NormalizedLspSettings } from "../lsp/types";
import type { AgentMode, ClawdSettings, McpServerConfig, SolanaConfig, SubAgentConfig } from "../types/index.js";
export type { McpServerConfig } from "../types/index.js";
import { type ProviderId } from "../grok/models.js";
export declare function getHomeDir(): string;
export declare const LEGACY_PROJECT_SETTINGS_DIR = ".grok";
export declare const PROJECT_SETTINGS_DIR = ".clawd";
export declare function getClawdHome(): string;
export declare function getLegacyGrokHome(): string;
export declare const USER_SETTINGS_PATH: string;
export declare const WORKSPACE_TRUST_PATH: string;
export declare const INSTALL_METADATA_PATH: string;
export declare function loadUserSettings(): ClawdSettings;
export declare function saveUserSettings(partial: Partial<ClawdSettings>): void;
export declare function loadProjectSettings(cwd: string): ClawdSettings;
export declare function saveProjectSettings(cwd: string, partial: Partial<ClawdSettings>): void;
export declare function saveProjectSettings(partial: Partial<ClawdSettings>): void;
export declare function getApiKey(provider?: ProviderId): string | undefined;
export declare function getBaseURL(provider?: ProviderId): string;
export declare function getCurrentProvider(model?: string): ProviderId;
export declare function getCurrentToolsets(): string[];
export declare function getSolanaConfig(): SolanaConfig;
export declare function getSolanaTrackerConfig(): {
    apiKey: string | undefined;
    rpcUrl: string | undefined;
    wssUrl: string | undefined;
    dataUrl: string;
};
export type SandboxMode = "shuru" | "off";
export interface SandboxSettings {
    allowNet?: boolean;
    allowedHosts?: string[];
    allowEphemeralInstall?: boolean;
    hostBrowserCommandsOnHost?: boolean;
    ports?: string[];
    cpus?: number;
    memory?: string | number;
    diskSize?: string | number;
    checkpoint?: string;
    from?: string;
    verifyBaseFrom?: string;
    guestWorkdir?: string;
    syncHostWorkspace?: boolean;
    shellInit?: string[];
    secrets?: Array<{
        name: string;
        fromEnv: string;
        hosts: string[];
    }>;
    [key: string]: unknown;
}
export declare function getCurrentSandboxMode(): SandboxMode;
export declare function setCurrentSandboxMode(mode: SandboxMode): void;
export declare function getCurrentSandboxSettings(): SandboxSettings;
export declare function mergeSandboxSettings(base: SandboxSettings, overrides: SandboxSettings): SandboxSettings;
export declare function normalizeSandboxSettings(value: unknown): SandboxSettings;
export interface PaymentSettings {
    enabled: boolean;
    chain: string;
    approval: {
        autoApprove?: boolean;
        [key: string]: unknown;
    };
    walletAddress: string;
}
export declare function loadPaymentSettings(): PaymentSettings;
export declare function savePaymentSettings(partial: Partial<PaymentSettings>): void;
export declare function getTelegramBotToken(): string | undefined;
export type CustomSubagentConfig = SubAgentConfig;
export type TelegramSettings = NonNullable<ClawdSettings["telegram"]>;
export type PaymentChain = string;
export type McpRemoteTransport = "stdio" | "sse" | "http";
export type LspSettings = NormalizedLspSettings;
export declare function getModeSpecificModel(mode?: AgentMode): string | undefined;
export declare function getCurrentModel(mode?: AgentMode): string;
export declare function resolveProviderModelSelection(args: {
    provider?: ProviderId;
    model?: string;
    mode?: AgentMode;
}): {
    provider: ProviderId;
    model: string;
};
export declare function parseSubAgentsRawList(value: unknown): SubAgentConfig[];
export declare function loadValidSubAgents(): SubAgentConfig[];
export declare function loadMcpServers(): McpServerConfig[];
export declare function loadRecapsEnabled(): boolean;
export declare function getReasoningEffortForModel(_modelId: string): string | undefined;
export declare function getCurrentLspSettings(): LspSettings;
export declare function isReservedSubagentName(name: string): boolean;
export declare function saveMcpServers(servers: McpServerConfig[]): void;
export declare function saveRecapsEnabled(_enabled: boolean): void;
export declare function saveApprovedTelegramUserId(userId: number | string): void;
export declare function resolveTelegramStreamSettings(_settings?: TelegramSettings): {
    enabled: boolean;
    approvedUserIds: number[];
    streaming: "on" | "off";
    typingIndicator: boolean;
};
export declare function resolveTelegramAudioInputSettings(telegramSettings: TelegramSettings | undefined): {
    enabled: boolean;
    language: string;
};
export declare function clearSettingsCache(): void;
