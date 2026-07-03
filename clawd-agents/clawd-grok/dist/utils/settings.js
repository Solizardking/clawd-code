import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { getModelInfo, normalizeModelId } from "../grok/models.js";
// === Path Constants ===
export function getHomeDir() {
    return process.env.HOME || os.homedir();
}
export const LEGACY_PROJECT_SETTINGS_DIR = ".grok";
export const PROJECT_SETTINGS_DIR = ".clawd";
export function getClawdHome() {
    return path.join(getHomeDir(), PROJECT_SETTINGS_DIR);
}
export function getLegacyGrokHome() {
    return path.join(getHomeDir(), LEGACY_PROJECT_SETTINGS_DIR);
}
export const USER_SETTINGS_PATH = path.join(getClawdHome(), "user-settings.json");
export const WORKSPACE_TRUST_PATH = path.join(getClawdHome(), "workspace-trust.json");
export const INSTALL_METADATA_PATH = path.join(getClawdHome(), "install-metadata.json");
// === User Settings ===
let userSettingsCache = null;
export function loadUserSettings() {
    if (userSettingsCache)
        return userSettingsCache;
    try {
        if (fs.existsSync(USER_SETTINGS_PATH)) {
            const raw = fs.readFileSync(USER_SETTINGS_PATH, "utf-8");
            userSettingsCache = JSON.parse(raw);
            return userSettingsCache;
        }
    }
    catch {
        // Silently ignore parse errors
    }
    userSettingsCache = {};
    return userSettingsCache;
}
export function saveUserSettings(partial) {
    const current = loadUserSettings();
    const merged = { ...current, ...partial };
    // Deep merge for nested objects
    if (partial.subAgents)
        merged.subAgents = partial.subAgents;
    if (partial.hooks)
        merged.hooks = { ...current.hooks, ...partial.hooks };
    if (partial.telegram)
        merged.telegram = { ...current.telegram, ...partial.telegram };
    if (partial.mcpServers)
        merged.mcpServers = { ...current.mcpServers, ...partial.mcpServers };
    fs.mkdirSync(getClawdHome(), { recursive: true });
    fs.writeFileSync(USER_SETTINGS_PATH, JSON.stringify(merged, null, 2), "utf-8");
    userSettingsCache = merged;
}
// === Project Settings ===
let projectSettingsCache = new Map();
function getProjectSettingsPath(cwd) {
    return path.join(cwd, PROJECT_SETTINGS_DIR, "settings.json");
}
export function loadProjectSettings(cwd) {
    const cached = projectSettingsCache.get(cwd);
    if (cached)
        return cached;
    try {
        const settingsPath = getProjectSettingsPath(cwd);
        if (fs.existsSync(settingsPath)) {
            const raw = fs.readFileSync(settingsPath, "utf-8");
            const parsed = JSON.parse(raw);
            projectSettingsCache.set(cwd, parsed);
            return parsed;
        }
    }
    catch {
        // Silently ignore parse errors
    }
    const empty = {};
    projectSettingsCache.set(cwd, empty);
    return empty;
}
export function saveProjectSettings(cwdOrPartial, maybePartial) {
    const cwd = typeof cwdOrPartial === "string" ? cwdOrPartial : process.cwd();
    const partial = typeof cwdOrPartial === "string" ? (maybePartial ?? {}) : cwdOrPartial;
    const current = loadProjectSettings(cwd);
    const merged = { ...current, ...partial };
    if (partial.mcpServers)
        merged.mcpServers = { ...current.mcpServers, ...partial.mcpServers };
    const dir = path.join(cwd, PROJECT_SETTINGS_DIR);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(getProjectSettingsPath(cwd), JSON.stringify(merged, null, 2), "utf-8");
    projectSettingsCache.set(cwd, merged);
}
// === API Key Resolution ===
// Priority: env var > user settings > project settings
// Uses AI_API_KEY as the primary env var (replaces GROK_API_KEY)
export function getApiKey() {
    // 1. Environment variable — XAI_API_KEY is canonical, others are fallbacks
    const envKey = process.env.XAI_API_KEY || process.env.AI_API_KEY || process.env.GROK_API_KEY;
    if (envKey)
        return envKey;
    // 2. User settings
    const userSettings = loadUserSettings();
    // Check for legacy key first
    const settingsKey = userSettings.aiKey ||
        userSettings.apiKey;
    if (settingsKey)
        return settingsKey;
    return undefined;
}
export function getBaseURL() {
    return process.env.AI_BASE_URL || process.env.GROK_BASE_URL || "https://api.x.ai/v1";
}
// === Solana / Phoenix Config ===
export function getSolanaConfig() {
    return {
        rpcUrl: process.env.SOLANA_TRACKER_RPC_URL || process.env.SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com",
        apiUrl: process.env.PHOENIX_API_URL || "https://perp-api.phoenix.trade",
        apiKey: process.env.PHOENIX_API_KEY,
    };
}
export function getSolanaTrackerConfig() {
    return {
        apiKey: process.env.SOLANA_TRACKER_API_KEY,
        rpcUrl: process.env.SOLANA_TRACKER_RPC_URL,
        wssUrl: process.env.SOLANA_TRACKER_WSS_URL,
        dataUrl: process.env.SOLANA_TRACKER_URL || "https://data.solanatracker.io",
    };
}
let sandboxOverride = null;
export function getCurrentSandboxMode() {
    if (sandboxOverride)
        return sandboxOverride.mode;
    const userSettings = loadUserSettings();
    const configured = userSettings.sandboxMode;
    return configured || "off";
}
export function setCurrentSandboxMode(mode) {
    if (!sandboxOverride)
        sandboxOverride = { mode, settings: {} };
    sandboxOverride.mode = mode;
}
export function getCurrentSandboxSettings() {
    if (sandboxOverride)
        return sandboxOverride.settings;
    const userSettings = loadUserSettings();
    const configured = userSettings.sandboxSettings;
    return configured || {};
}
export function mergeSandboxSettings(base, overrides) {
    return {
        allowNet: overrides.allowNet ?? base.allowNet,
        allowedHosts: overrides.allowedHosts ?? base.allowedHosts,
        allowEphemeralInstall: overrides.allowEphemeralInstall ?? base.allowEphemeralInstall,
        hostBrowserCommandsOnHost: overrides.hostBrowserCommandsOnHost ?? base.hostBrowserCommandsOnHost,
        ports: overrides.ports ?? base.ports,
        cpus: overrides.cpus ?? base.cpus,
        memory: overrides.memory ?? base.memory,
        diskSize: overrides.diskSize ?? base.diskSize,
        checkpoint: overrides.checkpoint ?? base.checkpoint,
        from: overrides.from ?? base.from,
        verifyBaseFrom: overrides.verifyBaseFrom ?? base.verifyBaseFrom,
        guestWorkdir: overrides.guestWorkdir ?? base.guestWorkdir,
        syncHostWorkspace: overrides.syncHostWorkspace ?? base.syncHostWorkspace,
        shellInit: overrides.shellInit ?? base.shellInit,
        secrets: overrides.secrets ?? base.secrets,
    };
}
export function normalizeSandboxSettings(value) {
    const raw = typeof value === "object" && value !== null ? value : {};
    return {
        allowNet: typeof raw.allowNet === "boolean" ? raw.allowNet : undefined,
        allowedHosts: Array.isArray(raw.allowedHosts)
            ? raw.allowedHosts.filter((v) => typeof v === "string")
            : undefined,
        allowEphemeralInstall: typeof raw.allowEphemeralInstall === "boolean" ? raw.allowEphemeralInstall : undefined,
        hostBrowserCommandsOnHost: typeof raw.hostBrowserCommandsOnHost === "boolean" ? raw.hostBrowserCommandsOnHost : undefined,
        ports: Array.isArray(raw.ports) ? raw.ports.filter((v) => typeof v === "string") : undefined,
        cpus: typeof raw.cpus === "number" ? raw.cpus : undefined,
        memory: typeof raw.memory === "string" ? raw.memory : typeof raw.memory === "number" ? String(raw.memory) : undefined,
        diskSize: typeof raw.diskSize === "string" ? raw.diskSize : typeof raw.diskSize === "number" ? raw.diskSize : undefined,
        checkpoint: typeof raw.checkpoint === "string" ? raw.checkpoint : undefined,
        from: typeof raw.from === "string" ? raw.from : undefined,
        verifyBaseFrom: typeof raw.verifyBaseFrom === "string" ? raw.verifyBaseFrom : undefined,
        guestWorkdir: typeof raw.guestWorkdir === "string" ? raw.guestWorkdir : undefined,
        syncHostWorkspace: typeof raw.syncHostWorkspace === "boolean" ? raw.syncHostWorkspace : undefined,
        shellInit: Array.isArray(raw.shellInit)
            ? raw.shellInit.filter((v) => typeof v === "string")
            : undefined,
        secrets: Array.isArray(raw.secrets)
            ? raw.secrets.filter((entry) => {
                if (typeof entry !== "object" || entry === null)
                    return false;
                const secret = entry;
                return (typeof secret.name === "string" &&
                    typeof secret.fromEnv === "string" &&
                    Array.isArray(secret.hosts) &&
                    secret.hosts.every((host) => typeof host === "string"));
            })
            : undefined,
    };
}
let paymentSettingsCache = null;
const PAYMENT_SETTINGS_PATH = path.join(getClawdHome(), "payment-settings.json");
export function loadPaymentSettings() {
    if (paymentSettingsCache)
        return paymentSettingsCache;
    try {
        if (fs.existsSync(PAYMENT_SETTINGS_PATH)) {
            const raw = fs.readFileSync(PAYMENT_SETTINGS_PATH, "utf-8");
            const parsed = JSON.parse(raw);
            paymentSettingsCache = {
                ...parsed,
                approval: typeof parsed.approval === "object" && parsed.approval !== null
                    ? parsed.approval
                    : { autoApprove: parsed.approval === "auto" },
            };
            return paymentSettingsCache;
        }
    }
    catch {
        // ignore
    }
    paymentSettingsCache = { enabled: false, chain: "solana", approval: { autoApprove: false }, walletAddress: "" };
    return paymentSettingsCache;
}
export function savePaymentSettings(partial) {
    const current = loadPaymentSettings();
    const merged = { ...current, ...partial };
    fs.mkdirSync(getClawdHome(), { recursive: true });
    fs.writeFileSync(PAYMENT_SETTINGS_PATH, JSON.stringify(merged, null, 2), "utf-8");
    paymentSettingsCache = merged;
}
// === Telegram Settings Helper ===
export function getTelegramBotToken() {
    const env = process.env.TELEGRAM_BOT_TOKEN;
    if (env)
        return env;
    const userSettings = loadUserSettings();
    return userSettings.telegram?.botToken;
}
const MODE_DEFAULTS = {
    agent: "grok-4.3",
    explore: "grok-4.3",
    vision: "grok-4.3",
    verify: "grok-4.3",
    general: "grok-4.3",
};
export function getModeSpecificModel(mode) {
    if (!mode)
        return undefined;
    return MODE_DEFAULTS[mode];
}
export function getCurrentModel(mode) {
    const envModel = process.env.GROK_MODEL || process.env.CLAWD_MODEL;
    if (envModel?.trim())
        return envModel.trim();
    const settingsModel = loadUserSettings().defaultModel;
    if (settingsModel?.trim())
        return settingsModel.trim();
    return getModeSpecificModel(mode) || "grok-4.3";
}
export function parseSubAgentsRawList(value) {
    if (!Array.isArray(value))
        return [];
    const reserved = new Set(["general", "explore", "vision", "verify", "computer"]);
    const seen = new Set();
    const parsed = [];
    for (const entry of value) {
        if (typeof entry !== "object" || entry === null)
            continue;
        const raw = entry;
        const name = typeof raw.name === "string" ? raw.name.trim() : "";
        const instruction = typeof raw.instruction === "string" ? raw.instruction : "";
        const model = typeof raw.model === "string" ? normalizeModelId(raw.model) : "";
        if (!name || reserved.has(name.toLowerCase()) || seen.has(name.toLowerCase()))
            continue;
        if (!model || !getModelInfo(model))
            continue;
        seen.add(name.toLowerCase());
        parsed.push({ name, model, instruction });
    }
    return parsed;
}
export function loadValidSubAgents() {
    return parseSubAgentsRawList(loadUserSettings().subAgents);
}
export function loadMcpServers() {
    const servers = loadUserSettings().mcpServers;
    if (Array.isArray(servers))
        return servers;
    return servers ? Object.values(servers) : [];
}
export function loadRecapsEnabled() {
    return true;
}
export function getReasoningEffortForModel(_modelId) {
    return undefined;
}
export function getCurrentLspSettings() {
    return {
        enabled: true,
        tool: true,
        autoInstall: true,
        startupTimeoutMs: 10_000,
        diagnosticsDebounceMs: 250,
        builtins: {},
        servers: [],
    };
}
export function isReservedSubagentName(name) {
    return new Set(["general", "explore", "vision", "verify", "computer"]).has(name.trim().toLowerCase());
}
export function saveMcpServers(servers) {
    saveUserSettings({ mcpServers: servers });
}
export function saveRecapsEnabled(_enabled) { }
export function saveApprovedTelegramUserId(userId) {
    const settings = loadUserSettings();
    const current = settings.telegram?.approvedUserIds ?? [];
    const normalized = Number(userId);
    if (!Number.isFinite(normalized))
        return;
    saveUserSettings({
        telegram: {
            ...settings.telegram,
            approvedUserIds: current.includes(normalized) ? current : [...current, normalized],
        },
    });
}
export function resolveTelegramStreamSettings(_settings) {
    const telegram = loadUserSettings().telegram;
    return {
        enabled: Boolean(telegram?.botToken),
        approvedUserIds: (telegram?.approvedUserIds ?? []).map(Number).filter(Number.isFinite),
        streaming: "on",
        typingIndicator: true,
    };
}
export function resolveTelegramAudioInputSettings(telegramSettings) {
    const audioInput = telegramSettings?.audioInput;
    return {
        enabled: typeof audioInput?.enabled === "boolean" ? audioInput.enabled : true,
        language: typeof audioInput?.language === "string" && audioInput.language.trim() ? audioInput.language : "en",
    };
}
// === Clear caches (useful for testing) ===
export function clearSettingsCache() {
    userSettingsCache = null;
    projectSettingsCache = new Map();
    paymentSettingsCache = null;
    sandboxOverride = null;
}
//# sourceMappingURL=settings.js.map