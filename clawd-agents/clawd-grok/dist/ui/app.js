import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@opentui/react/jsx-runtime";
import { decodePasteBytes, parseKeypress } from "@opentui/core";
import { useKeyboard, useRenderer, useTerminalDimensions } from "@opentui/react";
import os from "os";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Agent } from "../agent/agent";
import { DEFAULT_MODEL, getEffectiveReasoningEffort, getModelIds, getModelInfo, getSupportedReasoningEfforts, MODELS, normalizeModelId, } from "../grok/models";
import { POPULAR_MCP_CATALOG } from "../mcp/catalog";
import { parseEnvLines, parseHeaderLines } from "../mcp/parse-headers";
import { toMcpServerId, validateMcpServerConfig } from "../mcp/validate";
import { createTelegramBridge } from "../telegram/bridge";
import { approvePairingCode } from "../telegram/pairing";
import { createTurnCoordinator } from "../telegram/turn-coordinator";
import { MODES } from "../types/index";
import { processAtMentions } from "../utils/at-mentions.js";
import { FileIndex } from "../utils/file-index.js";
import { copyTextToHostClipboard } from "../utils/host-clipboard";
import { getApiKey, getTelegramBotToken, isReservedSubagentName, loadMcpServers, loadPaymentSettings, loadUserSettings, loadValidSubAgents, saveApprovedTelegramUserId, saveMcpServers, savePaymentSettings, saveProjectSettings, saveRecapsEnabled, saveUserSettings, } from "../utils/settings";
import { discoverSkills, formatSkillsForChat } from "../utils/skills";
import { formatSubagentName } from "../utils/subagent-display";
import { checkForUpdate, runUpdate } from "../utils/update-checker";
import { buildVerifyPrompt } from "../verify/entrypoint";
import { buildSubagentBrowseRows, SUBAGENT_EDITOR_FIELDS, SubagentEditorModal, SubagentsBrowserModal, } from "./agents-modal";
import { BtwOverlay } from "./components/btw-overlay.js";
import { SuggestionOverlay } from "./components/SuggestionOverlay.js";
import { useTypeahead } from "./hooks/useTypeahead.js";
import { Markdown } from "./markdown";
import { buildMcpBrowseRows, McpBrowserModal, McpEditorModal } from "./mcp-modal";
import { createEmptyMcpEditorDraft } from "./mcp-modal-types";
import { formatPlanAnswers, initialPlanQuestionsState, PlanQuestionsPanel, PlanView, } from "./plan";
import { buildScheduleBrowseRows, ScheduleBrowserModal } from "./schedule-modal";
import { filterSlashMenuItems, SLASH_MENU_ITEMS } from "./slash-menu";
import { buildAssistantEntry, buildToolResultEntry, buildUserEntry, decorateTelegramEntries, getTelegramSourceLabel, getUnflushedTelegramAssistantContent, replaceTurnEntries, } from "./telegram-turn-ui";
import { getCompactTuiSelectionText } from "./terminal-selection-text";
import { dark } from "./theme";
const STAR_PALETTE = ["#5c9cf5", "#66d9c2", "#888888", "#666666", "#4a4a4a", "#333333", "#444466", "#336699"];
const LOADING_SPINNER_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
const TOOL_SPINNER_FRAMES = ["◐", "◓", "◑", "◒"];
const SUBAGENT_SPINNER_FRAMES = ["⣾", "⣽", "⣻", "⢿", "⡿", "⣟", "⣯", "⣷"];
const PROMPT_LOADING_FRAMES = [
    { active: 0, forward: true },
    { active: 1, forward: true },
    { active: 2, forward: true },
    { active: 3, forward: true },
    { active: 2, forward: false },
    { active: 1, forward: false },
];
function getPasteBlockToken(block) {
    if (block.isImage) {
        return `[Image #${block.id}]`;
    }
    return `[Pasted #${block.id} ${block.lines}+ lines]`;
}
function getFileMentionToken(block) {
    const name = block.path.split("/").pop() || block.path;
    return `[File: ${name}]`;
}
const HERO_ROWS = [
    {
        stars: [
            { col: 0, ch: "·" },
            { col: 7, ch: "·" },
            { col: 13, ch: "*" },
            { col: 21, ch: "·" },
            { col: 28, ch: "·" },
            { col: 34, ch: "·" },
        ],
    },
    {
        stars: [
            { col: 3, ch: "*" },
            { col: 9, ch: "·" },
            { col: 17, ch: "·" },
            { col: 22, ch: "·" },
            { col: 25, ch: "*" },
            { col: 30, ch: "·" },
        ],
    },
    {
        stars: [
            { col: 1, ch: "·" },
            { col: 6, ch: "·" },
            { col: 12, ch: "·" },
            { col: 15, ch: "·" },
            { col: 18, ch: "·" },
            { col: 24, ch: "·" },
            { col: 31, ch: "*" },
        ],
    },
    {
        stars: [
            { col: 2, ch: "·" },
            { col: 8, ch: "·" },
            { col: 10, ch: "·" },
            { col: 19, ch: "·" },
            { col: 27, ch: "·" },
            { col: 33, ch: "·" },
        ],
        grok: 13,
    },
    {
        stars: [
            { col: 1, ch: "·" },
            { col: 6, ch: "·" },
            { col: 12, ch: "·" },
            { col: 15, ch: "·" },
            { col: 18, ch: "·" },
            { col: 24, ch: "·" },
            { col: 32, ch: "·" },
        ],
    },
    {
        stars: [
            { col: 3, ch: "·" },
            { col: 9, ch: "*" },
            { col: 17, ch: "·" },
            { col: 22, ch: "·" },
            { col: 25, ch: "·" },
            { col: 30, ch: "*" },
        ],
    },
    {
        stars: [
            { col: 0, ch: "*" },
            { col: 7, ch: "·" },
            { col: 13, ch: "·" },
            { col: 21, ch: "*" },
            { col: 28, ch: "·" },
            { col: 34, ch: "·" },
        ],
    },
];
function HeroLogo({ t }) {
    const [tick, setTick] = useState(0);
    const starIdx = useRef(0);
    useEffect(() => {
        const id = setInterval(() => setTick((n) => n + 1), 450);
        return () => clearInterval(id);
    }, []);
    starIdx.current = 0;
    const nextColor = () => {
        const i = starIdx.current++;
        return STAR_PALETTE[(i * 7 + tick * 3 + i * tick) % STAR_PALETTE.length];
    };
    return (_jsx("box", { flexDirection: "column", alignItems: "center", children: HERO_ROWS.map((row, r) => {
            const els = [];
            let cursor = 0;
            for (const star of row.stars) {
                if (row.grok !== undefined && cursor <= row.grok && star.col > row.grok) {
                    els.push(" ".repeat(row.grok - cursor));
                    els.push(_jsx("span", { style: { fg: tick % 6 < 3 ? t.primary : t.accent }, children: "Grok" }, "grok"));
                    cursor = row.grok + 4;
                }
                const gap = star.col - cursor;
                if (gap > 0)
                    els.push(" ".repeat(gap));
                els.push(_jsx("span", { style: { fg: nextColor() }, children: star.ch }, `s-${star.col}`));
                cursor = star.col + 1;
            }
            if (row.grok !== undefined && cursor <= row.grok) {
                els.push(" ".repeat(row.grok - cursor));
                els.push(_jsx("span", { style: { fg: t.primary }, children: "Grok" }, "grok"));
                cursor = row.grok + 4;
            }
            els.push(" ".repeat(Math.max(0, 35 - cursor)));
            // biome-ignore lint/suspicious/noArrayIndexKey: static constant array that never reorders
            return _jsx("text", { children: els }, r);
        }) }));
}
const SPLIT = {
    topLeft: "",
    bottomLeft: "",
    vertical: "┃",
    topRight: "",
    bottomRight: "",
    horizontal: " ",
    bottomT: "",
    topT: "",
    cross: "",
    leftT: "",
    rightT: "",
};
const _SPLIT_END = { ...SPLIT, bottomLeft: "╹" };
const _EMPTY = {
    topLeft: "",
    bottomLeft: "",
    vertical: "",
    topRight: "",
    bottomRight: "",
    horizontal: " ",
    bottomT: "",
    topT: "",
    cross: "",
    leftT: "",
    rightT: "",
};
const _LINE = {
    topLeft: "━",
    bottomLeft: "━",
    vertical: "",
    topRight: "━",
    bottomRight: "━",
    horizontal: "━",
    bottomT: "━",
    topT: "━",
    cross: "━",
    leftT: "━",
    rightT: "━",
};
const REVIEW_PROMPT = `Review all current changes in this repository. Follow these steps:

1. Run \`git status\` to see which files have been modified, staged, or are untracked.
2. Run \`git diff\` to see unstaged changes and \`git diff --cached\` to see staged changes.
3. If there are no changes at all, say so and stop.
4. Read any changed files in full if needed for context.

Then produce a **Review Report** in this exact structure:

## Summary
One paragraph overview of what changed and why (inferred from the diff).

## Files Changed
For each changed file, list the filename and a brief description of the change.

## Issues Found
List any bugs, logic errors, security concerns, missing error handling, or correctness problems. If none, say "No issues found."

## Suggestions
Code quality, naming, performance, and best-practice improvements. If none, say "No suggestions."

## Risk Assessment
Rate the overall risk of these changes as **Low**, **Medium**, or **High** with a short justification.`;
const COMMIT_PUSH_PROMPT = `Create a git commit for the current repository changes and push the current branch to its remote.

Before committing, inspect the current branch. If it is not already a feature branch, create and switch to a new feature branch with a descriptive name based on the changes.

Follow the repository's commit workflow and safety checks. Inspect the current changes, stage any relevant untracked files, create an appropriate commit message, and push the branch if a commit was created. If there is nothing to commit, say so and stop.`;
const COMMIT_PR_PROMPT = `Create a git commit for the current repository changes and open a pull request for the current branch.

Before committing, inspect the current branch. If it is not already a feature branch, create and switch to a new feature branch with a descriptive name based on the changes.

Follow the repository's commit and pull request workflows. Inspect the current changes, stage any relevant untracked files, create an appropriate commit, push the branch if needed, then open a pull request with a concise summary and test plan. Return the pull request URL. If there is nothing to commit or open in a pull request, explain why and stop.`;
const BUILTIN_TYPED_SLASH_COMMANDS = new Set([
    "/clear",
    "/model",
    "/models",
    "/sandbox",
    "/recap",
    "/recaps",
    "/remote-control",
    "/mcp",
    "/mcps",
    "/agents",
    "/agent",
    "/schedule",
    "/schedules",
    "/quit",
    "/exit",
    "/q",
    "/review",
    "/verify",
    "/commit-push",
    "/commit-pr",
    "/wallet",
    "/btw",
]);
const SANDBOX_ROWS = [
    {
        key: "mode",
        label: "Mode",
        type: "toggle",
        getDisplay: (mode) => (mode === "shuru" ? "Shuru" : "Off"),
        getOptions: () => ["Off", "Shuru"],
        apply: (_mode, _s, value) => ({ mode: value === "Shuru" ? "shuru" : "off" }),
    },
    {
        key: "allowNet",
        label: "Network",
        type: "toggle",
        getDisplay: (_m, s) => (s.allowNet ? "On" : "Off"),
        getOptions: () => ["Off", "On"],
        apply: (_m, _s, value) => ({ settings: { allowNet: value === "On" } }),
    },
    {
        key: "allowedHosts",
        label: "Allowed hosts",
        type: "text",
        placeholder: "api.openai.com, registry.npmjs.org",
        getDisplay: (_m, s) => s.allowedHosts?.join(", ") || "(unrestricted)",
        apply: (_m, _s, value) => ({
            settings: {
                allowedHosts: value
                    ? value
                        .split(",")
                        .map((h) => h.trim())
                        .filter(Boolean)
                    : undefined,
            },
        }),
    },
    {
        key: "ports",
        label: "Port forwards",
        type: "text",
        placeholder: "8080:80, 8443:443",
        getDisplay: (_m, s) => s.ports?.join(", ") || "(none)",
        apply: (_m, _s, value) => ({
            settings: {
                ports: value
                    ? value
                        .split(",")
                        .map((p) => p.trim())
                        .filter(Boolean)
                    : undefined,
            },
        }),
    },
    {
        key: "cpus",
        label: "CPUs",
        type: "text",
        placeholder: "e.g. 4",
        getDisplay: (_m, s) => (s.cpus ? String(s.cpus) : "(default)"),
        apply: (_m, _s, value) => ({ settings: { cpus: value ? parseInt(value, 10) || undefined : undefined } }),
    },
    {
        key: "memory",
        label: "Memory (MB)",
        type: "text",
        placeholder: "e.g. 4096",
        getDisplay: (_m, s) => (s.memory ? String(s.memory) : "(default)"),
        apply: (_m, _s, value) => ({ settings: { memory: value ? parseInt(value, 10) || undefined : undefined } }),
    },
    {
        key: "diskSize",
        label: "Disk size (MB)",
        type: "text",
        placeholder: "e.g. 8192",
        getDisplay: (_m, s) => (s.diskSize ? String(s.diskSize) : "(default)"),
        apply: (_m, _s, value) => ({ settings: { diskSize: value ? parseInt(value, 10) || undefined : undefined } }),
    },
    {
        key: "from",
        label: "Checkpoint",
        type: "text",
        placeholder: "checkpoint name",
        getDisplay: (_m, s) => s.from || "(none)",
        apply: (_m, _s, value) => ({ settings: { from: value || undefined } }),
    },
];
function getSandboxVisibleRows(mode) {
    return mode === "shuru" ? SANDBOX_ROWS : SANDBOX_ROWS.slice(0, 1);
}
const RECAP_OPTIONS = ["Off", "On"];
function formatRecapsEnabled(enabled) {
    return enabled ? "On" : "Off";
}
const WALLET_ROWS = [
    {
        key: "enabled",
        label: "Payments",
        type: "toggle",
        getDisplay: (s) => (s.enabled ? "enabled" : "disabled"),
        getOptions: () => ["enabled", "disabled"],
        apply: (_s, v) => ({ enabled: v === "enabled" }),
    },
    {
        key: "chain",
        label: "Chain",
        type: "toggle",
        getDisplay: (s) => s.chain,
        getOptions: () => ["base-sepolia", "base"],
        apply: (_s, v) => ({ chain: v }),
    },
    {
        key: "autoApprove",
        label: "Auto-approve",
        type: "toggle",
        getDisplay: (s) => (s.approval.autoApprove ? "on" : "off"),
        getOptions: () => ["off", "on"],
        apply: (s, v) => ({ approval: { ...s.approval, autoApprove: v === "on" } }),
    },
    {
        key: "address",
        label: "Address",
        type: "readonly",
        getDisplay: (_s, info) => info.address ?? "No wallet",
    },
    {
        key: "eth",
        label: "ETH",
        type: "readonly",
        getDisplay: (_s, info) => info.ethBalance ?? "...",
    },
    {
        key: "usdc",
        label: "USDC",
        type: "readonly",
        getDisplay: (_s, info) => info.usdcBalance ?? "...",
    },
];
function parseCustomSubagentSlashCommand(cmd, subagents) {
    const trimmed = cmd.trim();
    if (!trimmed.startsWith("/"))
        return null;
    const body = trimmed.slice(1).trim();
    if (!body)
        return null;
    const commandToken = body.split(/\s+/, 1)[0]?.toLowerCase();
    if (commandToken && BUILTIN_TYPED_SLASH_COMMANDS.has(`/${commandToken}`)) {
        return null;
    }
    const lowerBody = body.toLowerCase();
    const sortedSubagents = [...subagents].sort((a, b) => b.name.length - a.name.length);
    const match = sortedSubagents.find((item) => {
        const lowerName = item.name.trim().toLowerCase();
        return lowerBody === lowerName || lowerBody.startsWith(`${lowerName} `);
    });
    if (!match)
        return null;
    return {
        agentName: match.name,
        prompt: body.slice(match.name.length).trim(),
    };
}
function buildCustomSubagentSlashPrompt(agentName, prompt) {
    return `Use the custom sub-agent "${agentName}" for this task.

Delegate the work with the \`task\` tool using:
- \`agent\`: "${agentName}"
- \`description\`: a short summary of the work
- \`prompt\`: a detailed prompt based on the user's request

User request:
${prompt}`;
}
const CONNECT_CHANNELS = [
    { id: "telegram", label: "Telegram", description: "Chat with Grok from Telegram" },
];
const MCP_REMOTE_FIELDS = ["transport", "label", "url", "headers", "env"];
const MCP_STDIO_FIELDS = ["transport", "label", "command", "args", "cwd", "env"];
export function App({ agent, startupConfig, initialMessage, onExit }) {
    const t = dark;
    const renderer = useRenderer();
    const initialHasApiKey = agent.hasApiKey();
    const [hasApiKey, setHasApiKey] = useState(initialHasApiKey);
    const [messages, setMessages] = useState(() => agent.getChatEntries());
    const [streamContent, setStreamContent] = useState("");
    const [_streamReasoning, setStreamReasoning] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [liveTurnSourceLabel, setLiveTurnSourceLabel] = useState(null);
    const [model, setModel] = useState(agent.getModel());
    const [sandboxMode, setSandboxModeState] = useState(agent.getSandboxMode());
    const [mode, setModeState] = useState(agent.getMode());
    const [showModelPicker, setShowModelPicker] = useState(false);
    const [modelPickerIndex, setModelPickerIndex] = useState(0);
    const [modelSearchQuery, setModelSearchQuery] = useState("");
    const [showSandboxPicker, setShowSandboxPicker] = useState(false);
    const [sandboxSettings, setSandboxSettingsState] = useState(() => agent.getSandboxSettings());
    const [sandboxSettingsFocusIndex, setSandboxSettingsFocusIndex] = useState(0);
    const [sandboxSettingsEditing, setSandboxSettingsEditing] = useState(null);
    const [sandboxSettingsEditBuffer, setSandboxSettingsEditBuffer] = useState("");
    const [showRecapPicker, setShowRecapPicker] = useState(false);
    const [recapsEnabled, setRecapsEnabledState] = useState(() => agent.getRecapsEnabled());
    const [showWalletPicker, setShowWalletPicker] = useState(false);
    const [walletSettings, setWalletSettings] = useState(() => loadPaymentSettings());
    const [walletFocusIndex, setWalletFocusIndex] = useState(0);
    const [walletDisplayInfo, setWalletDisplayInfo] = useState({
        address: null,
        ethBalance: null,
        usdcBalance: null,
    });
    const [pendingPaymentApproval, setPendingPaymentApproval] = useState(null);
    const [activeToolCalls, setActiveToolCalls] = useState([]);
    const [sessionTitle, setSessionTitle] = useState(() => agent.getSessionTitle());
    const [sessionId, setSessionId] = useState(() => agent.getSessionId());
    const [sessionRecap, setSessionRecap] = useState(() => agent.getSessionRecap());
    const [showApiKeyModal, setShowApiKeyModal] = useState(() => !initialHasApiKey);
    const [apiKeyError, setApiKeyError] = useState(null);
    const [showSlashMenu, setShowSlashMenu] = useState(false);
    const [slashMenuIndex, setSlashMenuIndex] = useState(0);
    const [slashSearchQuery, setSlashSearchQuery] = useState("");
    const [btwState, setBtwState] = useState(null);
    const btwAbortRef = useRef(null);
    const btwStateRef = useRef(null);
    const [reasoningEffortByModel, setReasoningEffortByModel] = useState(() => Object.fromEntries(Object.entries(loadUserSettings().reasoningEffortByModel ?? {}).map(([modelId, effort]) => [
        normalizeModelId(modelId),
        effort,
    ])));
    const [pasteBlocks, setPasteBlocks] = useState([]);
    const [activePlan, setActivePlan] = useState(null);
    /** Incremented on each successful TUI copy; drives a brief "Copied" banner. */
    const [copyFlashId, setCopyFlashId] = useState(0);
    const [expandedMessages, setExpandedMessages] = useState(() => new Set());
    const [activeSubagent, setActiveSubagent] = useState(null);
    const [pqs, setPqs] = useState(initialPlanQuestionsState());
    const pasteCounterRef = useRef(0);
    const pasteBlocksRef = useRef([]);
    const apiKeyInputRef = useRef(null);
    const inputRef = useRef(null);
    const scrollRef = useRef(null);
    const { width, height } = useTerminalDimensions();
    const processedInitial = useRef(false);
    const contentAccRef = useRef("");
    const startTimeRef = useRef(0);
    const isProcessingRef = useRef(false);
    const hasApiKeyRef = useRef(initialHasApiKey);
    const showApiKeyModalRef = useRef(!initialHasApiKey);
    const queuedMessagesRef = useRef([]);
    const processMessageRef = useRef(() => { });
    const [queuedMessages, setQueuedMessages] = useState([]);
    const modeInfoRef = useRef(MODES[0]);
    const activeRunIdRef = useRef(0);
    const interruptedRunIdRef = useRef(null);
    const activeTurnRef = useRef(null);
    const coordinatorRef = useRef(createTurnCoordinator());
    const bridgeRef = useRef(null);
    const telegramAgentsRef = useRef(new Map());
    const telegramEntryCountsRef = useRef(new Map());
    const telegramSubagentUnsubsRef = useRef(new Map());
    const [showConnectModal, setShowConnectModal] = useState(false);
    const [showTelegramTokenModal, setShowTelegramTokenModal] = useState(false);
    const [showTelegramPairModal, setShowTelegramPairModal] = useState(false);
    const [telegramTokenError, setTelegramTokenError] = useState(null);
    const [telegramPairError, setTelegramPairError] = useState(null);
    const [connectModalIndex, setConnectModalIndex] = useState(0);
    const telegramTokenInputRef = useRef(null);
    const telegramPairInputRef = useRef(null);
    const showConnectModalRef = useRef(false);
    const showTelegramTokenModalRef = useRef(false);
    const showTelegramPairModalRef = useRef(false);
    const [showMcpModal, setShowMcpModal] = useState(false);
    const [showMcpEditor, setShowMcpEditor] = useState(false);
    const [mcpSearchQuery, setMcpSearchQuery] = useState("");
    const [mcpModalIndex, setMcpModalIndex] = useState(0);
    const [mcpServers, setMcpServers] = useState(() => loadMcpServers());
    const [mcpEditorDraft, setMcpEditorDraft] = useState(createEmptyMcpEditorDraft());
    const [mcpEditorField, setMcpEditorField] = useState("transport");
    const [mcpEditorSyncKey, setMcpEditorSyncKey] = useState(0);
    const [mcpEditorError, setMcpEditorError] = useState(null);
    const [editingMcpId, setEditingMcpId] = useState(null);
    const showMcpModalRef = useRef(false);
    const showMcpEditorRef = useRef(false);
    const mcpLabelRef = useRef(null);
    const mcpUrlRef = useRef(null);
    const mcpHeadersRef = useRef(null);
    const mcpCommandRef = useRef(null);
    const mcpArgsRef = useRef(null);
    const mcpCwdRef = useRef(null);
    const mcpEnvRef = useRef(null);
    const [showAgentsModal, setShowAgentsModal] = useState(false);
    const [showAgentsEditor, setShowAgentsEditor] = useState(false);
    const [subAgents, setSubAgents] = useState(() => loadValidSubAgents());
    const [agentsSearchQuery, setAgentsSearchQuery] = useState("");
    const [agentsModalIndex, setAgentsModalIndex] = useState(0);
    const [editingSubagent, setEditingSubagent] = useState(null);
    const [agentsEditorDraft, setAgentsEditorDraft] = useState({ name: "", instruction: "" });
    const [agentsEditorField, setAgentsEditorField] = useState("name");
    const [agentsEditorModelIndex, setAgentsEditorModelIndex] = useState(() => Math.max(0, MODELS.findIndex((model) => model.id === DEFAULT_MODEL)));
    const [agentsEditorSyncKey, setAgentsEditorSyncKey] = useState(0);
    const [agentsEditorError, setAgentsEditorError] = useState(null);
    const showAgentsModalRef = useRef(false);
    const showAgentsEditorRef = useRef(false);
    const subagentNameRef = useRef(null);
    const subagentInstructionRef = useRef(null);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [schedules, setSchedules] = useState([]);
    const [scheduleSearchQuery, setScheduleSearchQuery] = useState("");
    const [scheduleModalIndex, setScheduleModalIndex] = useState(0);
    const showScheduleModalRef = useRef(false);
    const [updateInfo, setUpdateInfo] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateOutput, setUpdateOutput] = useState(null);
    const showUpdateModalRef = useRef(false);
    const fileIndexRef = useRef(null);
    if (!fileIndexRef.current) {
        fileIndexRef.current = new FileIndex(agent.getCwd());
    }
    const fileMentionCounterRef = useRef(0);
    const fileMentionBlocksRef = useRef([]);
    const handleFileAccept = useCallback((filePath, tokenInfo) => {
        const ta = inputRef.current;
        if (!ta)
            return;
        const id = ++fileMentionCounterRef.current;
        const block = { id, path: fileIndexRef.current?.resolvePath(filePath) ?? filePath };
        fileMentionBlocksRef.current = [...fileMentionBlocksRef.current, block];
        const text = ta.plainText;
        const before = text.slice(0, tokenInfo.startPos);
        const after = text.slice(tokenInfo.endPos);
        const token = getFileMentionToken(block);
        const newText = `${before}${token} ${after}`;
        ta.setText(newText);
        ta.cursorOffset = before.length + token.length + 1;
    }, []);
    const typeahead = useTypeahead(inputRef, fileIndexRef.current, handleFileAccept);
    const typeaheadRef = useRef(typeahead);
    typeaheadRef.current = typeahead;
    const setMode = useCallback((m) => {
        if (m === "agent" && mode === "plan" && activePlan) {
            const planText = [
                `# ${activePlan.title}`,
                activePlan.summary,
                "",
                ...activePlan.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.description}${s.filePaths?.length ? ` (${s.filePaths.join(", ")})` : ""}`),
            ].join("\n");
            agent.setPlanContext(planText);
        }
        agent.setMode(m);
        setModeState(m);
        setModel(agent.getModel());
    }, [agent, mode, activePlan]);
    const cycleMode = useCallback(() => {
        const idx = MODES.findIndex((m) => m.id === mode);
        setMode(MODES[(idx + 1) % MODES.length].id);
    }, [mode, setMode]);
    const modeInfo = MODES.find((m) => m.id === mode);
    modeInfoRef.current = modeInfo;
    const modelInfo = getModelInfo(model);
    const contextStats = modelInfo ? agent.getContextStats(modelInfo.contextWindow, streamContent) : null;
    const _flatModels = MODELS.map((m) => m.id);
    const filteredModels = modelSearchQuery
        ? MODELS.filter((m) => m.name.toLowerCase().includes(modelSearchQuery.toLowerCase()) ||
            m.id.toLowerCase().includes(modelSearchQuery.toLowerCase()))
        : MODELS;
    const filteredModelIds = filteredModels.map((m) => m.id);
    const filteredSlashItems = filterSlashMenuItems(SLASH_MENU_ITEMS, slashSearchQuery);
    const mcpRows = buildMcpBrowseRows(mcpServers, POPULAR_MCP_CATALOG, mcpSearchQuery);
    const mcpEditorFields = mcpEditorDraft.transport === "stdio" ? MCP_STDIO_FIELDS : MCP_REMOTE_FIELDS;
    const agentRows = useMemo(() => buildSubagentBrowseRows(subAgents, agentsSearchQuery), [subAgents, agentsSearchQuery]);
    const scheduleRows = useMemo(() => buildScheduleBrowseRows(schedules, scheduleSearchQuery), [schedules, scheduleSearchQuery]);
    const syncStoredMcpServers = useCallback((servers) => {
        setMcpServers(servers);
        saveMcpServers(servers);
    }, []);
    const applySandboxMode = useCallback((next) => {
        agent.setSandboxMode(next);
        for (const telegramAgent of telegramAgentsRef.current.values()) {
            telegramAgent.setSandboxMode(next);
        }
        setSandboxModeState(next);
        saveProjectSettings({ sandboxMode: next });
        saveUserSettings({ sandboxMode: next });
    }, [agent]);
    const applySandboxSettings = useCallback((next) => {
        agent.setSandboxSettings(next);
        for (const telegramAgent of telegramAgentsRef.current.values()) {
            telegramAgent.setSandboxSettings(next);
        }
        setSandboxSettingsState(next);
        saveProjectSettings({ sandbox: next });
        saveUserSettings({ sandbox: next });
    }, [agent]);
    const openSandboxPicker = useCallback(() => {
        setSandboxSettingsFocusIndex(0);
        setSandboxSettingsEditing(null);
        setSandboxSettingsEditBuffer("");
        setShowSandboxPicker(true);
    }, []);
    const applyRecapsEnabled = useCallback((enabled) => {
        agent.setRecapsEnabled(enabled);
        for (const telegramAgent of telegramAgentsRef.current.values()) {
            telegramAgent.setRecapsEnabled(enabled);
        }
        setRecapsEnabledState(enabled);
        saveRecapsEnabled(enabled);
        setSessionRecap(agent.getSessionRecap());
    }, [agent]);
    const openRecapPicker = useCallback(() => {
        setShowRecapPicker(true);
    }, []);
    const applyWalletSettings = useCallback((next) => {
        setWalletSettings(next);
        savePaymentSettings(next);
    }, []);
    const openWalletPicker = useCallback(() => {
        setWalletFocusIndex(0);
        setWalletSettings(loadPaymentSettings());
        setShowWalletPicker(true);
        setWalletDisplayInfo({ address: null, ethBalance: null, usdcBalance: null });
        import("../wallet/manager")
            .then(async ({ WalletManager }) => {
            if (!WalletManager.exists()) {
                setWalletDisplayInfo({ address: null, ethBalance: null, usdcBalance: null });
                return;
            }
            const wm = new WalletManager();
            const data = wm.getWalletData();
            setWalletDisplayInfo({ address: data.address, ethBalance: null, usdcBalance: null });
            const balance = await wm.getBalance();
            setWalletDisplayInfo({
                address: balance.address,
                ethBalance: balance.nativeBalance,
                usdcBalance: balance.usdcBalance,
            });
        })
            .catch(() => { });
    }, []);
    const setReasoningEfforts = useCallback((next) => {
        setReasoningEffortByModel(next);
        saveUserSettings({ reasoningEffortByModel: next });
    }, []);
    const replacePasteBlocks = useCallback((next) => {
        pasteBlocksRef.current = next;
        setPasteBlocks(next);
    }, []);
    const getModelReasoningEffort = useCallback((modelId) => {
        const normalizedModelId = normalizeModelId(modelId);
        return getEffectiveReasoningEffort(normalizedModelId, reasoningEffortByModel[normalizedModelId]);
    }, [reasoningEffortByModel]);
    const adjustModelReasoningEffort = useCallback((modelId, direction) => {
        const normalizedModelId = normalizeModelId(modelId);
        const supported = getSupportedReasoningEfforts(normalizedModelId);
        if (supported.length === 0)
            return;
        const current = getModelReasoningEffort(normalizedModelId);
        if (!current) {
            if (direction > 0) {
                setReasoningEfforts({ ...reasoningEffortByModel, [normalizedModelId]: supported[0] });
            }
            return;
        }
        const currentIndex = supported.indexOf(current);
        if (direction < 0 && currentIndex <= 0) {
            const { [normalizedModelId]: _, ...rest } = reasoningEffortByModel;
            setReasoningEfforts(rest);
        }
        else {
            const nextIndex = direction < 0 ? currentIndex - 1 : Math.min(supported.length - 1, currentIndex + 1);
            setReasoningEfforts({ ...reasoningEffortByModel, [normalizedModelId]: supported[nextIndex] });
        }
    }, [getModelReasoningEffort, reasoningEffortByModel, setReasoningEfforts]);
    const snapshotMcpEditorDraft = useCallback(() => {
        return {
            ...mcpEditorDraft,
            label: mcpLabelRef.current?.plainText ?? mcpEditorDraft.label,
            url: mcpUrlRef.current?.plainText ?? mcpEditorDraft.url,
            headersText: mcpHeadersRef.current?.plainText ?? mcpEditorDraft.headersText,
            command: mcpCommandRef.current?.plainText ?? mcpEditorDraft.command,
            argsText: mcpArgsRef.current?.plainText ?? mcpEditorDraft.argsText,
            cwd: mcpCwdRef.current?.plainText ?? mcpEditorDraft.cwd,
            envText: mcpEnvRef.current?.plainText ?? mcpEditorDraft.envText,
        };
    }, [mcpEditorDraft]);
    const openMcpModal = useCallback(() => {
        const latest = loadMcpServers();
        setMcpServers(latest);
        setMcpSearchQuery("");
        setMcpModalIndex(0);
        setShowMcpModal(true);
        setShowMcpEditor(false);
        setEditingMcpId(null);
        setMcpEditorError(null);
    }, []);
    const openMcpEditor = useCallback((draft, editingId = null) => {
        setMcpEditorDraft(draft);
        setEditingMcpId(editingId);
        setMcpEditorField("transport");
        setMcpEditorError(null);
        setMcpEditorSyncKey((n) => n + 1);
        setShowMcpEditor(true);
        setShowMcpModal(true);
    }, []);
    const openCatalogMcp = useCallback((entry) => {
        const existing = mcpServers.find((server) => toMcpServerId(server.id) === toMcpServerId(entry.id));
        if (existing) {
            openMcpEditor({
                label: existing.label,
                transport: existing.transport,
                url: existing.url ?? "",
                headersText: Object.entries(existing.headers ?? {})
                    .map(([key, value]) => `${key}: ${value}`)
                    .join("\n"),
                command: existing.command ?? "",
                argsText: (existing.args ?? []).join("\n"),
                cwd: existing.cwd ?? "",
                envText: Object.entries(existing.env ?? {})
                    .map(([key, value]) => `${key}=${value}`)
                    .join("\n"),
            }, existing.id);
            return;
        }
        openMcpEditor({
            ...createEmptyMcpEditorDraft(),
            label: entry.name,
            transport: entry.starterTransport ?? "stdio",
        });
    }, [mcpServers, openMcpEditor]);
    const editSavedMcp = useCallback((server) => {
        openMcpEditor({
            label: server.label,
            transport: server.transport,
            url: server.url ?? "",
            headersText: Object.entries(server.headers ?? {})
                .map(([key, value]) => `${key}: ${value}`)
                .join("\n"),
            command: server.command ?? "",
            argsText: (server.args ?? []).join("\n"),
            cwd: server.cwd ?? "",
            envText: Object.entries(server.env ?? {})
                .map(([key, value]) => `${key}=${value}`)
                .join("\n"),
        }, server.id);
    }, [openMcpEditor]);
    const toggleSavedMcp = useCallback((server) => {
        syncStoredMcpServers(mcpServers.map((item) => (item.id === server.id ? { ...item, enabled: !item.enabled } : item)));
    }, [mcpServers, syncStoredMcpServers]);
    const deleteSavedMcp = useCallback((server) => {
        syncStoredMcpServers(mcpServers.filter((item) => item.id !== server.id));
        setMcpModalIndex((idx) => Math.max(0, Math.min(idx, Math.max(0, mcpRows.length - 2))));
    }, [mcpRows.length, mcpServers, syncStoredMcpServers]);
    const openAgentsModal = useCallback(() => {
        setSubAgents(loadValidSubAgents());
        setAgentsSearchQuery("");
        setAgentsModalIndex(0);
        setEditingSubagent(null);
        setAgentsEditorError(null);
        setShowAgentsEditor(false);
        setShowAgentsModal(true);
    }, []);
    const openScheduleModal = useCallback(() => {
        void agent
            .listSchedules()
            .then((latest) => {
            setSchedules(latest);
            setScheduleSearchQuery("");
            setScheduleModalIndex(0);
            setShowScheduleModal(true);
        })
            .catch((err) => {
            const message = err instanceof Error ? err.message : String(err);
            setMessages((prev) => [...prev, buildAssistantEntry(`Failed to load schedules: ${message}`)]);
        });
    }, [agent]);
    const showScheduleDetails = useCallback((schedule) => {
        void agent
            .getScheduleDaemonStatus()
            .then((status) => {
            setMessages((prev) => [...prev, buildAssistantEntry(formatScheduleDetails(schedule, status))]);
            setShowScheduleModal(false);
            setScheduleSearchQuery("");
            setTimeout(() => {
                try {
                    scrollRef.current?.scrollTo(scrollRef.current?.scrollHeight ?? 99999);
                }
                catch {
                    /* */
                }
            }, 10);
        })
            .catch((err) => {
            const message = err instanceof Error ? err.message : String(err);
            setMessages((prev) => [...prev, buildAssistantEntry(`Failed to load schedule details: ${message}`)]);
        });
    }, [agent]);
    const removeSchedule = useCallback((schedule) => {
        void agent
            .removeSchedule(schedule.id)
            .then(async (message) => {
            const latest = await agent.listSchedules();
            setSchedules(latest);
            setScheduleModalIndex((index) => Math.max(0, Math.min(index, Math.max(0, latest.length - 1))));
            setMessages((prev) => [...prev, buildAssistantEntry(message)]);
            setTimeout(() => {
                try {
                    scrollRef.current?.scrollTo(scrollRef.current?.scrollHeight ?? 99999);
                }
                catch {
                    /* */
                }
            }, 10);
        })
            .catch((err) => {
            const message = err instanceof Error ? err.message : String(err);
            setMessages((prev) => [...prev, buildAssistantEntry(`Failed to remove schedule: ${message}`)]);
        });
    }, [agent]);
    const openSubagentEditor = useCallback((agent) => {
        setEditingSubagent(agent);
        if (agent) {
            setAgentsEditorDraft({ name: agent.name, instruction: agent.instruction });
            setAgentsEditorModelIndex(Math.max(0, MODELS.findIndex((model) => model.id === normalizeModelId(agent.model))));
        }
        else {
            setAgentsEditorDraft({ name: "", instruction: "" });
            setAgentsEditorModelIndex(Math.max(0, MODELS.findIndex((model) => model.id === DEFAULT_MODEL)));
        }
        setAgentsEditorField("name");
        setAgentsEditorError(null);
        setAgentsEditorSyncKey((n) => n + 1);
        setShowAgentsEditor(true);
        setShowAgentsModal(true);
    }, []);
    const submitSubagentEditor = useCallback(() => {
        const name = (subagentNameRef.current?.plainText || "").trim();
        const instruction = subagentInstructionRef.current?.plainText || "";
        const model = MODELS[agentsEditorModelIndex]?.id;
        if (!name) {
            setAgentsEditorError("Name is required.");
            return;
        }
        if (isReservedSubagentName(name)) {
            setAgentsEditorError('Names "general" and "explore" are reserved.');
            return;
        }
        if (!model || !getModelIds().includes(model)) {
            setAgentsEditorError("Pick a valid model.");
            return;
        }
        const next = [...subAgents];
        if (editingSubagent) {
            const index = next.findIndex((item) => item.name === editingSubagent.name);
            if (index >= 0)
                next.splice(index, 1);
        }
        if (next.some((item) => item.name.toLowerCase() === name.toLowerCase())) {
            setAgentsEditorError("Another sub-agent already uses this name.");
            return;
        }
        next.push({ name, model, instruction });
        saveUserSettings({ subAgents: next });
        setSubAgents(loadValidSubAgents());
        setShowAgentsEditor(false);
        setEditingSubagent(null);
        setAgentsEditorError(null);
    }, [agentsEditorModelIndex, editingSubagent, subAgents]);
    const removeEditingSubagent = useCallback(() => {
        if (!editingSubagent)
            return;
        const next = subAgents.filter((item) => item.name !== editingSubagent.name);
        saveUserSettings({ subAgents: next });
        setSubAgents(loadValidSubAgents());
        setShowAgentsEditor(false);
        setEditingSubagent(null);
        setAgentsEditorError(null);
        setAgentsModalIndex(0);
    }, [editingSubagent, subAgents]);
    const submitMcpEditor = useCallback(() => {
        const draft = {
            label: mcpLabelRef.current?.plainText || "",
            transport: mcpEditorDraft.transport,
            url: mcpUrlRef.current?.plainText || "",
            headersText: mcpHeadersRef.current?.plainText || "",
            command: mcpCommandRef.current?.plainText || "",
            argsText: mcpArgsRef.current?.plainText || "",
            cwd: mcpCwdRef.current?.plainText || "",
            envText: mcpEnvRef.current?.plainText || "",
        };
        const baseId = toMcpServerId(draft.label);
        const currentServers = loadMcpServers();
        const conflictingServer = currentServers.find((s) => s.id === baseId && s.id !== editingMcpId);
        if (conflictingServer) {
            setMcpEditorError(`Only one protocol is supported per MCP. Edit "${conflictingServer.label}" instead.`);
            return;
        }
        const id = editingMcpId ?? baseId;
        const server = {
            id,
            label: draft.label.trim(),
            enabled: true,
            transport: draft.transport,
            ...(draft.transport === "stdio"
                ? {
                    command: draft.command.trim(),
                    args: draft.argsText
                        .split("\n")
                        .map((line) => line.trim())
                        .filter(Boolean),
                    cwd: draft.cwd.trim() || undefined,
                    env: Object.keys(parseEnvLines(draft.envText)).length ? parseEnvLines(draft.envText) : undefined,
                }
                : {
                    url: draft.url.trim(),
                    headers: Object.keys(parseHeaderLines(draft.headersText)).length
                        ? parseHeaderLines(draft.headersText)
                        : undefined,
                    env: Object.keys(parseEnvLines(draft.envText)).length ? parseEnvLines(draft.envText) : undefined,
                }),
        };
        const validation = validateMcpServerConfig(server);
        if (!validation.ok) {
            setMcpEditorError(validation.error);
            return;
        }
        const nextServers = editingMcpId
            ? currentServers.map((item) => item.id === editingMcpId ? { ...server, id: editingMcpId, enabled: item.enabled } : item)
            : [...currentServers, server];
        saveMcpServers(nextServers);
        setMcpServers(nextServers);
        setShowMcpEditor(false);
        setEditingMcpId(null);
        setMcpEditorError(null);
        setMcpSearchQuery("");
        setMcpModalIndex(Math.max(0, nextServers.findIndex((item) => item.id === (editingMcpId ?? server.id))));
    }, [editingMcpId, mcpEditorDraft.transport]);
    const cycleMcpEditorTransport = useCallback((direction = 1) => {
        const draft = snapshotMcpEditorDraft();
        const order = ["stdio", "http", "sse"];
        const currentIndex = order.indexOf(draft.transport);
        const nextTransport = order[(currentIndex + direction + order.length) % order.length];
        const nextDraft = { ...draft, transport: nextTransport };
        setMcpEditorDraft(nextDraft);
        setMcpEditorField("transport");
        setMcpEditorSyncKey((n) => n + 1);
        if (!editingMcpId)
            return;
        const existing = mcpServers.find((server) => server.id === editingMcpId);
        if (!existing)
            return;
        const optimisticServer = {
            id: existing.id,
            label: nextDraft.label.trim() || existing.label,
            enabled: existing.enabled,
            transport: nextTransport,
            ...(nextTransport === "stdio"
                ? {
                    command: nextDraft.command.trim() || existing.command,
                    args: nextDraft.argsText
                        .split("\n")
                        .map((line) => line.trim())
                        .filter(Boolean),
                    cwd: nextDraft.cwd.trim() || undefined,
                    env: Object.keys(parseEnvLines(nextDraft.envText)).length ? parseEnvLines(nextDraft.envText) : undefined,
                }
                : {
                    url: nextDraft.url.trim() || existing.url,
                    headers: Object.keys(parseHeaderLines(nextDraft.headersText)).length
                        ? parseHeaderLines(nextDraft.headersText)
                        : undefined,
                    env: Object.keys(parseEnvLines(nextDraft.envText)).length ? parseEnvLines(nextDraft.envText) : undefined,
                }),
        };
        syncStoredMcpServers(mcpServers.map((server) => (server.id === editingMcpId ? optimisticServer : server)));
    }, [editingMcpId, mcpServers, snapshotMcpEditorDraft, syncStoredMcpServers]);
    useEffect(() => {
        if (!showMcpEditor || !editingMcpId)
            return;
        const existing = mcpServers.find((server) => server.id === editingMcpId);
        if (!existing)
            return;
        if (existing.transport === mcpEditorDraft.transport)
            return;
        const syncedServer = {
            id: existing.id,
            label: mcpEditorDraft.label.trim() || existing.label,
            enabled: existing.enabled,
            transport: mcpEditorDraft.transport,
            ...(mcpEditorDraft.transport === "stdio"
                ? {
                    command: mcpEditorDraft.command.trim() || undefined,
                    args: mcpEditorDraft.argsText
                        .split("\n")
                        .map((line) => line.trim())
                        .filter(Boolean),
                    cwd: mcpEditorDraft.cwd.trim() || undefined,
                    env: Object.keys(parseEnvLines(mcpEditorDraft.envText)).length
                        ? parseEnvLines(mcpEditorDraft.envText)
                        : undefined,
                }
                : {
                    url: mcpEditorDraft.url.trim() || undefined,
                    headers: Object.keys(parseHeaderLines(mcpEditorDraft.headersText)).length
                        ? parseHeaderLines(mcpEditorDraft.headersText)
                        : undefined,
                    env: Object.keys(parseEnvLines(mcpEditorDraft.envText)).length
                        ? parseEnvLines(mcpEditorDraft.envText)
                        : undefined,
                }),
        };
        syncStoredMcpServers(mcpServers.map((server) => (server.id === editingMcpId ? syncedServer : server)));
    }, [editingMcpId, mcpEditorDraft, mcpServers, showMcpEditor, syncStoredMcpServers]);
    useEffect(() => {
        setMcpModalIndex((idx) => Math.max(0, Math.min(idx, Math.max(0, mcpRows.length - 1))));
    }, [mcpRows.length]);
    useEffect(() => {
        setScheduleModalIndex((idx) => Math.max(0, Math.min(idx, Math.max(0, scheduleRows.length - 1))));
    }, [scheduleRows.length]);
    const scrollToBottom = useCallback(() => {
        try {
            scrollRef.current?.scrollTo(scrollRef.current?.scrollHeight ?? 99999);
        }
        catch {
            /* */
        }
    }, []);
    const clearLiveTurnUi = useCallback(() => {
        setStreamContent("");
        setStreamReasoning("");
        setActiveToolCalls([]);
        setActiveSubagent(null);
        setLiveTurnSourceLabel(null);
        contentAccRef.current = "";
    }, []);
    const finishTurnProcessing = useCallback(() => {
        const nextQueued = queuedMessagesRef.current.shift();
        if (nextQueued) {
            setQueuedMessages(queuedMessagesRef.current.map((msg) => msg.displayText));
            isProcessingRef.current = false;
            void processMessageRef.current(nextQueued.text, nextQueued.displayText);
            return;
        }
        isProcessingRef.current = false;
        setIsProcessing(false);
    }, []);
    const beginLiveTurn = useCallback((turn) => {
        clearLiveTurnUi();
        activeTurnRef.current = {
            ...turn,
            latestAssistantText: "",
            flushedAssistantChars: 0,
        };
        isProcessingRef.current = true;
        setIsProcessing(true);
        setLiveTurnSourceLabel(turn.sourceLabel ?? null);
        startTimeRef.current = Date.now();
    }, [clearLiveTurnUi]);
    const flushPendingAssistantMessage = useCallback(() => {
        const activeTurn = activeTurnRef.current;
        if (!activeTurn)
            return;
        const cleaned = sanitizeContent(contentAccRef.current);
        if (!cleaned) {
            contentAccRef.current = "";
            setStreamContent("");
            if (activeTurn.kind === "telegram") {
                activeTurn.flushedAssistantChars = activeTurn.latestAssistantText.length;
            }
            return;
        }
        setMessages((prev) => [
            ...prev,
            buildAssistantEntry(cleaned, {
                modeColor: activeTurn.modeColor,
                remoteKey: activeTurn.remoteKey,
                sourceLabel: activeTurn.sourceLabel,
            }),
        ]);
        if (activeTurn.kind === "telegram") {
            activeTurn.flushedAssistantChars = activeTurn.latestAssistantText.length;
        }
        contentAccRef.current = "";
        setStreamContent("");
    }, []);
    const applyLocalAssistantDelta = useCallback((delta) => {
        contentAccRef.current += delta;
        setStreamContent(sanitizeContent(contentAccRef.current));
        setTimeout(scrollToBottom, 10);
    }, [scrollToBottom]);
    const applyTelegramAssistantPreview = useCallback((fullContent) => {
        const activeTurn = activeTurnRef.current;
        if (!activeTurn || activeTurn.kind !== "telegram")
            return;
        activeTurn.latestAssistantText = fullContent;
        contentAccRef.current = getUnflushedTelegramAssistantContent(fullContent, activeTurn.flushedAssistantChars);
        setStreamContent(sanitizeContent(contentAccRef.current));
        setTimeout(scrollToBottom, 10);
    }, [scrollToBottom]);
    const showLiveToolCalls = useCallback((toolCalls) => {
        flushPendingAssistantMessage();
        setActiveToolCalls(toolCalls);
        setTimeout(scrollToBottom, 10);
    }, [flushPendingAssistantMessage, scrollToBottom]);
    const appendLiveToolResult = useCallback((toolCall, toolResult) => {
        const activeTurn = activeTurnRef.current;
        if (!activeTurn)
            return;
        setMessages((prev) => [
            ...prev,
            buildToolResultEntry(toolCall, toolResult, {
                modeColor: activeTurn.modeColor,
                remoteKey: activeTurn.remoteKey,
                sourceLabel: activeTurn.sourceLabel,
            }),
        ]);
        if (toolResult.plan?.questions?.length) {
            setActivePlan(toolResult.plan);
            setPqs(initialPlanQuestionsState());
        }
        setActiveToolCalls([]);
        setTimeout(scrollToBottom, 10);
    }, [scrollToBottom]);
    const syncTelegramTurnEntries = useCallback((activeTurn) => {
        if (activeTurn.kind !== "telegram" || activeTurn.userId === undefined || !activeTurn.remoteKey)
            return;
        const currentEntries = activeTurn.agent.getChatEntries();
        const syncedCount = telegramEntryCountsRef.current.get(activeTurn.userId) ?? 0;
        if (currentEntries.length <= syncedCount)
            return;
        const delta = decorateTelegramEntries(currentEntries.slice(syncedCount), activeTurn.userId, activeTurn.remoteKey);
        telegramEntryCountsRef.current.set(activeTurn.userId, currentEntries.length);
        setMessages((prev) => replaceTurnEntries(prev, activeTurn.remoteKey, delta));
    }, []);
    const finalizeActiveTurn = useCallback(({ wasInterrupted = false, hadError = false } = {}) => {
        const activeTurn = activeTurnRef.current;
        if (!activeTurn) {
            finishTurnProcessing();
            return;
        }
        const finalContent = sanitizeContent(contentAccRef.current);
        if (!wasInterrupted && finalContent) {
            setMessages((prev) => [
                ...prev,
                buildAssistantEntry(finalContent, {
                    modeColor: activeTurn.modeColor,
                    remoteKey: activeTurn.remoteKey,
                    sourceLabel: activeTurn.sourceLabel,
                }),
            ]);
        }
        if (!wasInterrupted && !hadError) {
            if (activeTurn.kind === "local" && activeTurn.agent.getSessionId()) {
                setMessages((prev) => {
                    const fresh = activeTurn.agent.getChatEntries();
                    let prevUserIdx = 0;
                    for (let i = 0; i < fresh.length; i++) {
                        if (fresh[i].type !== "user")
                            continue;
                        while (prevUserIdx < prev.length && prev[prevUserIdx].type !== "user")
                            prevUserIdx++;
                        if (prevUserIdx < prev.length) {
                            fresh[i] = { ...fresh[i], content: prev[prevUserIdx].content };
                            prevUserIdx++;
                        }
                    }
                    return fresh;
                });
                setSessionTitle(activeTurn.agent.getSessionTitle());
                setSessionId(activeTurn.agent.getSessionId());
                setSessionRecap(activeTurn.agent.getSessionRecap());
            }
            else if (activeTurn.kind === "telegram") {
                syncTelegramTurnEntries(activeTurn);
            }
        }
        activeTurnRef.current = null;
        clearLiveTurnUi();
        finishTurnProcessing();
        setTimeout(scrollToBottom, 50);
    }, [clearLiveTurnUi, finishTurnProcessing, scrollToBottom, syncTelegramTurnEntries]);
    const wireTelegramAgentUi = useCallback((userId, telegramAgent) => {
        if (!telegramEntryCountsRef.current.has(userId)) {
            telegramEntryCountsRef.current.set(userId, telegramAgent.getChatEntries().length);
        }
        if (telegramSubagentUnsubsRef.current.has(userId)) {
            return;
        }
        const unsubscribe = telegramAgent.onSubagentStatus((status) => {
            if (activeTurnRef.current?.agent !== telegramAgent)
                return;
            setActiveSubagent(status);
        });
        telegramSubagentUnsubsRef.current.set(userId, unsubscribe);
    }, []);
    const getTelegramAgent = useCallback((userId) => {
        const map = telegramAgentsRef.current;
        const existing = map.get(userId);
        if (existing) {
            wireTelegramAgentUi(userId, existing);
            return existing;
        }
        const apiKey = getApiKey(startupConfig.provider);
        if (!apiKey) {
            throw new Error(`API key required for ${startupConfig.provider}. Add it in the CLI or set the provider env var.`);
        }
        const u = loadUserSettings();
        const sid = u.telegram?.sessionsByUserId?.[String(userId)];
        const a = new Agent(apiKey, startupConfig.baseURL, startupConfig.model, startupConfig.maxToolRounds, {
            session: sid,
            sandboxMode,
            sandboxSettings,
            provider: startupConfig.provider,
            toolsets: startupConfig.toolsets,
        });
        if (!sid && a.getSessionId()) {
            saveUserSettings({
                telegram: {
                    ...u.telegram,
                    sessionsByUserId: {
                        ...u.telegram?.sessionsByUserId,
                        [String(userId)]: a.getSessionId(),
                    },
                },
            });
        }
        wireTelegramAgentUi(userId, a);
        map.set(userId, a);
        return a;
    }, [sandboxMode, sandboxSettings, startupConfig, wireTelegramAgentUi]);
    const appendTelegramUserMessage = useCallback((event) => {
        const telegramAgent = getTelegramAgent(event.userId);
        beginLiveTurn({
            kind: "telegram",
            agent: telegramAgent,
            remoteKey: event.turnKey,
            userId: event.userId,
            sourceLabel: getTelegramSourceLabel("assistant", event.userId),
        });
        setMessages((prev) => [
            ...prev,
            buildUserEntry(event.content, {
                remoteKey: event.turnKey,
                sourceLabel: getTelegramSourceLabel("user", event.userId),
            }),
        ]);
        setTimeout(scrollToBottom, 10);
    }, [beginLiveTurn, getTelegramAgent, scrollToBottom]);
    const upsertTelegramAssistantMessage = useCallback((event) => {
        if (activeTurnRef.current?.remoteKey !== event.turnKey) {
            const telegramAgent = getTelegramAgent(event.userId);
            beginLiveTurn({
                kind: "telegram",
                agent: telegramAgent,
                remoteKey: event.turnKey,
                userId: event.userId,
                sourceLabel: getTelegramSourceLabel("assistant", event.userId),
            });
        }
        applyTelegramAssistantPreview(event.content);
        if (event.done) {
            finalizeActiveTurn();
        }
    }, [applyTelegramAssistantPreview, beginLiveTurn, finalizeActiveTurn, getTelegramAgent]);
    const showTelegramToolCalls = useCallback((event) => {
        if (activeTurnRef.current?.remoteKey !== event.turnKey) {
            const telegramAgent = getTelegramAgent(event.userId);
            beginLiveTurn({
                kind: "telegram",
                agent: telegramAgent,
                remoteKey: event.turnKey,
                userId: event.userId,
                sourceLabel: getTelegramSourceLabel("assistant", event.userId),
            });
        }
        showLiveToolCalls(event.toolCalls);
    }, [beginLiveTurn, getTelegramAgent, showLiveToolCalls]);
    const appendTelegramToolResult = useCallback((event) => {
        if (activeTurnRef.current?.remoteKey !== event.turnKey) {
            const telegramAgent = getTelegramAgent(event.userId);
            beginLiveTurn({
                kind: "telegram",
                agent: telegramAgent,
                remoteKey: event.turnKey,
                userId: event.userId,
                sourceLabel: getTelegramSourceLabel("assistant", event.userId),
            });
        }
        appendLiveToolResult(event.toolCall, event.toolResult);
    }, [appendLiveToolResult, beginLiveTurn, getTelegramAgent]);
    const startTelegramBridge = useCallback(() => {
        const token = getTelegramBotToken();
        if (!token || !getApiKey(startupConfig.provider))
            return;
        if (bridgeRef.current)
            return;
        const bridge = createTelegramBridge({
            token,
            getApprovedUserIds: () => loadUserSettings().telegram?.approvedUserIds ?? [],
            coordinator: coordinatorRef.current,
            getTelegramAgent,
            onUserMessage: appendTelegramUserMessage,
            onAssistantMessage: upsertTelegramAssistantMessage,
            onToolCalls: showTelegramToolCalls,
            onToolResult: appendTelegramToolResult,
            onError: (msg) => {
                setMessages((p) => [...p, { type: "assistant", content: `Telegram: ${msg}`, timestamp: new Date() }]);
            },
        });
        bridgeRef.current = bridge;
        bridge.start();
    }, [
        appendTelegramToolResult,
        appendTelegramUserMessage,
        getTelegramAgent,
        showTelegramToolCalls,
        upsertTelegramAssistantMessage,
    ]);
    /** Start long polling when a bot token is already saved (pairing UI is optional if already approved). */
    useEffect(() => {
        if (!hasApiKey)
            return;
        if (!getTelegramBotToken())
            return;
        startTelegramBridge();
    }, [hasApiKey, startTelegramBridge]);
    const handleExit = useCallback(() => {
        void bridgeRef.current?.stop();
        bridgeRef.current = null;
        onExit?.();
    }, [onExit]);
    const showCopyBanner = useCallback(() => {
        setCopyFlashId((n) => n + 1);
    }, []);
    /** Match OpenCode: OSC 52 + real OS clipboard; used from keyboard and root onMouseUp. */
    const copyTuiSelectionToHost = useCallback(() => {
        if (!renderer.hasSelection)
            return false;
        const sel = renderer.getSelection();
        const text = sel ? getCompactTuiSelectionText(sel) : "";
        if (!text)
            return false;
        renderer.copyToClipboardOSC52(text);
        copyTextToHostClipboard(text);
        renderer.clearSelection();
        showCopyBanner();
        return true;
    }, [renderer, showCopyBanner]);
    const handleRootMouseUp = useCallback(() => {
        copyTuiSelectionToHost();
    }, [copyTuiSelectionToHost]);
    useEffect(() => {
        if (copyFlashId === 0)
            return;
        const id = setTimeout(() => setCopyFlashId(0), 2000);
        return () => clearTimeout(id);
    }, [copyFlashId]);
    const openApiKeyModal = useCallback(() => {
        showApiKeyModalRef.current = true;
        setApiKeyError(null);
        setShowApiKeyModal(true);
    }, []);
    const closeApiKeyModal = useCallback(() => {
        showApiKeyModalRef.current = false;
        setApiKeyError(null);
        setShowApiKeyModal(false);
    }, []);
    const submitApiKey = useCallback(() => {
        const apiKey = (apiKeyInputRef.current?.plainText || "").trim();
        if (!apiKey) {
            setApiKeyError("Enter an API key to continue.");
            return;
        }
        saveUserSettings({
            ...(startupConfig.provider === "xai" ? { apiKey } : {}),
            providerApiKeys: { [startupConfig.provider]: apiKey },
        });
        agent.setApiKey(apiKey, startupConfig.baseURL, startupConfig.provider);
        hasApiKeyRef.current = true;
        showApiKeyModalRef.current = false;
        setHasApiKey(true);
        setApiKeyError(null);
        setShowApiKeyModal(false);
        apiKeyInputRef.current?.clear();
        if (getTelegramBotToken()) {
            startTelegramBridge();
        }
    }, [agent, startTelegramBridge]);
    useEffect(() => {
        hasApiKeyRef.current = hasApiKey;
    }, [hasApiKey]);
    useEffect(() => {
        showApiKeyModalRef.current = showApiKeyModal;
    }, [showApiKeyModal]);
    useEffect(() => {
        showConnectModalRef.current = showConnectModal;
    }, [showConnectModal]);
    useEffect(() => {
        showTelegramTokenModalRef.current = showTelegramTokenModal;
    }, [showTelegramTokenModal]);
    useEffect(() => {
        showTelegramPairModalRef.current = showTelegramPairModal;
    }, [showTelegramPairModal]);
    useEffect(() => {
        showMcpModalRef.current = showMcpModal;
    }, [showMcpModal]);
    useEffect(() => {
        showMcpEditorRef.current = showMcpEditor;
    }, [showMcpEditor]);
    useEffect(() => {
        showAgentsModalRef.current = showAgentsModal;
    }, [showAgentsModal]);
    useEffect(() => {
        showAgentsEditorRef.current = showAgentsEditor;
    }, [showAgentsEditor]);
    useEffect(() => {
        showScheduleModalRef.current = showScheduleModal;
    }, [showScheduleModal]);
    useEffect(() => {
        showUpdateModalRef.current = showUpdateModal;
    }, [showUpdateModal]);
    useEffect(() => {
        let cancelled = false;
        checkForUpdate(startupConfig.version).then((result) => {
            if (cancelled || !result?.hasUpdate)
                return;
            setUpdateInfo(result);
            setShowUpdateModal(true);
        });
        return () => {
            cancelled = true;
        };
    }, [startupConfig.version]);
    useEffect(() => {
        return () => {
            void bridgeRef.current?.stop();
            bridgeRef.current = null;
        };
    }, []);
    const submitTelegramToken = useCallback(() => {
        const token = (telegramTokenInputRef.current?.plainText || "").trim();
        if (!token) {
            setTelegramTokenError("Paste your bot token from @BotFather.");
            return;
        }
        if (!getApiKey(startupConfig.provider)) {
            setTelegramTokenError(`Add an API key for ${startupConfig.provider} first.`);
            return;
        }
        const u = loadUserSettings();
        saveUserSettings({ telegram: { ...u.telegram, botToken: token } });
        telegramTokenInputRef.current?.clear();
        setShowTelegramTokenModal(false);
        setTelegramTokenError(null);
        startTelegramBridge();
        setShowTelegramPairModal(true);
        setTelegramPairError(null);
        setMessages((p) => [
            ...p,
            {
                type: "assistant",
                content: "Telegram polling started. In Telegram, DM your bot and send /pair. Copy the code, then enter it below.",
                timestamp: new Date(),
            },
        ]);
    }, [startTelegramBridge]);
    const submitTelegramPair = useCallback(async () => {
        const code = (telegramPairInputRef.current?.plainText || "").trim();
        if (!code) {
            setTelegramPairError("Enter the pairing code.");
            return;
        }
        const result = approvePairingCode(code);
        if (!result.ok) {
            setTelegramPairError(result.error);
            return;
        }
        saveApprovedTelegramUserId(result.userId);
        telegramPairInputRef.current?.clear();
        setShowTelegramPairModal(false);
        setTelegramPairError(null);
        setMessages((p) => [
            ...p,
            {
                type: "assistant",
                content: `Telegram user ${result.userId} paired. Keep this CLI open while you use the bot.`,
                timestamp: new Date(),
            },
        ]);
        try {
            await bridgeRef.current?.sendDm(result.userId, "Pairing approved. You can message Grok here.");
        }
        catch {
            /* optional DM */
        }
    }, []);
    const beginTelegramFromConnect = useCallback(() => {
        setShowConnectModal(false);
        if (!getApiKey(startupConfig.provider)) {
            setMessages((p) => [
                ...p,
                { type: "assistant", content: `Add an API key for ${startupConfig.provider} first.`, timestamp: new Date() },
            ]);
            openApiKeyModal();
            return;
        }
        if (!getTelegramBotToken()) {
            setShowTelegramTokenModal(true);
            setTelegramTokenError(null);
            return;
        }
        startTelegramBridge();
        const alreadyPaired = (loadUserSettings().telegram?.approvedUserIds?.length ?? 0) > 0;
        if (!alreadyPaired) {
            setShowTelegramPairModal(true);
            setTelegramPairError(null);
            setMessages((p) => [
                ...p,
                {
                    type: "assistant",
                    content: "Telegram polling started. In Telegram, DM your bot and send /pair. Copy the code, then enter it below.",
                    timestamp: new Date(),
                },
            ]);
        }
        else {
            setMessages((p) => [
                ...p,
                {
                    type: "assistant",
                    content: "Telegram polling is running. Your chat is already paired.",
                    timestamp: new Date(),
                },
            ]);
        }
    }, [openApiKeyModal, startTelegramBridge]);
    const interruptActiveRun = useCallback((key) => {
        if (btwStateRef.current) {
            btwAbortRef.current?.abort();
            btwAbortRef.current = null;
            btwStateRef.current = null;
            setBtwState(null);
            key?.preventDefault();
            key?.stopPropagation();
            return true;
        }
        if (!isProcessingRef.current)
            return false;
        key?.preventDefault();
        key?.stopPropagation();
        interruptedRunIdRef.current = activeRunIdRef.current;
        queuedMessagesRef.current = [];
        setQueuedMessages([]);
        const activeAgent = activeTurnRef.current?.agent ?? agent;
        activeTurnRef.current = null;
        clearLiveTurnUi();
        activeAgent.abort();
        return true;
    }, [agent, clearLiveTurnUi]);
    useEffect(() => {
        const onInternalKey = (key) => {
            if (isEscapeKey(key)) {
                interruptActiveRun(key);
            }
        };
        renderer._internalKeyInput.onInternal("keypress", onInternalKey);
        return () => {
            renderer._internalKeyInput.offInternal("keypress", onInternalKey);
        };
    }, [interruptActiveRun, renderer]);
    useEffect(() => {
        const onRawInput = (sequence) => {
            const parsed = parseKeypress(sequence, { useKittyKeyboard: renderer.useKittyKeyboard });
            if (parsed?.name === "escape" || sequence === "\u001b" || sequence === "\u001b\u001b") {
                return interruptActiveRun();
            }
            return false;
        };
        renderer.prependInputHandler(onRawInput);
        return () => {
            renderer.removeInputHandler(onRawInput);
        };
    }, [interruptActiveRun, renderer]);
    useEffect(() => {
        const onStdinData = (chunk) => {
            const data = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
            if (data.length === 1 && data[0] === 27) {
                interruptActiveRun();
            }
        };
        renderer.stdin.on("data", onStdinData);
        return () => {
            renderer.stdin.off("data", onStdinData);
        };
    }, [interruptActiveRun, renderer]);
    const resetToNewSession = useCallback(() => {
        const snapshot = agent.startNewSession();
        setMessages(snapshot?.entries ?? []);
        setExpandedMessages(new Set());
        activeTurnRef.current = null;
        clearLiveTurnUi();
        setSessionTitle(snapshot?.session.title ?? null);
        setSessionId(snapshot?.session.id ?? agent.getSessionId());
        setSessionRecap(agent.getSessionRecap());
        setActivePlan(null);
        setPqs(initialPlanQuestionsState());
        replacePasteBlocks([]);
        queuedMessagesRef.current = [];
        setQueuedMessages([]);
    }, [agent, clearLiveTurnUi, replacePasteBlocks]);
    const processMessage = useCallback(async (text, displayText) => {
        if (!text.trim() || isProcessingRef.current)
            return;
        const runId = ++activeRunIdRef.current;
        const isStale = () => activeRunIdRef.current !== runId;
        isProcessingRef.current = true;
        setIsProcessing(true);
        if (!sessionTitle)
            agent
                .generateTitle((displayText ?? text).trim())
                .then(setSessionTitle)
                .catch(() => { });
        await coordinatorRef.current.run(async () => {
            const color = modeInfoRef.current.color;
            beginLiveTurn({ kind: "local", agent, modeColor: color });
            setMessages((prev) => [...prev, buildUserEntry((displayText ?? text).trim(), { modeColor: color })]);
            setTimeout(scrollToBottom, 50);
            await new Promise((r) => setTimeout(r, 0));
            let turnHadError = false;
            let turnHadAuthError = false;
            try {
                for await (const chunk of agent.processMessage(text.trim())) {
                    if (isStale()) {
                        break;
                    }
                    switch (chunk.type) {
                        case "content":
                            applyLocalAssistantDelta(chunk.content || "");
                            break;
                        case "reasoning":
                            setStreamReasoning((p) => p + (chunk.content || ""));
                            break;
                        case "tool_calls":
                            if (chunk.toolCalls) {
                                showLiveToolCalls(chunk.toolCalls);
                            }
                            break;
                        case "tool_result":
                            if (chunk.toolCall && chunk.toolResult) {
                                appendLiveToolResult(chunk.toolCall, chunk.toolResult);
                            }
                            break;
                        case "tool_approval_request":
                            if (chunk.toolCall && chunk.approvalId) {
                                let args = {};
                                try {
                                    args = JSON.parse(chunk.toolCall.function.arguments);
                                }
                                catch {
                                    /* ignore */
                                }
                                const pc = chunk.paymentPrecheck;
                                setPendingPaymentApproval({
                                    url: args?.url ?? "",
                                    description: pc?.description ?? "",
                                    security: pc?.security ?? "",
                                    securityLabel: pc?.securityLabel ?? "",
                                    securityUrl: pc?.securityUrl ?? "",
                                    amount: pc?.amount ?? "",
                                    network: pc?.network ?? "",
                                    asset: pc?.asset ?? "",
                                    approvalId: chunk.approvalId,
                                    selected: 0,
                                });
                            }
                            break;
                        case "error":
                            turnHadError = true;
                            if (chunk.isAuthError) {
                                turnHadAuthError = true;
                            }
                            contentAccRef.current += `\n${chunk.content || "Unknown error"}`;
                            setStreamContent(contentAccRef.current);
                            break;
                        case "done":
                            break;
                    }
                }
            }
            catch {
                turnHadError = true;
                if (!isStale()) {
                    contentAccRef.current += "\nAn unexpected error occurred.";
                    setStreamContent(contentAccRef.current);
                }
            }
            const wasInterrupted = interruptedRunIdRef.current === runId;
            if (isStale()) {
                contentAccRef.current = "";
                return;
            }
            if (turnHadAuthError) {
                setApiKeyError("Your API key is invalid or expired. Please enter a new key.");
                setShowApiKeyModal(true);
                showApiKeyModalRef.current = true;
            }
            if (!isStale()) {
                finalizeActiveTurn({ wasInterrupted, hadError: turnHadError });
            }
            if (wasInterrupted) {
                interruptedRunIdRef.current = null;
            }
        });
    }, [
        agent,
        appendLiveToolResult,
        applyLocalAssistantDelta,
        beginLiveTurn,
        finalizeActiveTurn,
        scrollToBottom,
        sessionTitle,
        showLiveToolCalls,
    ]);
    useEffect(() => {
        if (initialMessage && hasApiKey && !processedInitial.current) {
            processedInitial.current = true;
            processMessage(initialMessage);
        }
    }, [hasApiKey, initialMessage, processMessage]);
    useEffect(() => {
        processMessageRef.current = processMessage;
    }, [processMessage]);
    useEffect(() => agent.onSubagentStatus((status) => {
        if (activeTurnRef.current?.agent !== agent)
            return;
        setActiveSubagent(status);
    }), [agent]);
    useEffect(() => () => {
        for (const unsubscribe of telegramSubagentUnsubsRef.current.values()) {
            unsubscribe();
        }
        telegramSubagentUnsubsRef.current.clear();
    }, []);
    useEffect(() => {
        let active = true;
        const id = setInterval(() => {
            agent
                .consumeBackgroundNotifications()
                .then((notifications) => {
                if (!active || notifications.length === 0)
                    return;
                setMessages((prev) => [
                    ...prev,
                    ...notifications.map((message) => ({
                        type: "assistant",
                        content: message,
                        timestamp: new Date(),
                    })),
                ]);
                setTimeout(scrollToBottom, 10);
            })
                .catch(() => { });
        }, 2000);
        return () => {
            active = false;
            clearInterval(id);
        };
    }, [agent, scrollToBottom]);
    const handleCommand = useCallback((cmd) => {
        const c = cmd.trim().toLowerCase();
        if (c === "/clear") {
            resetToNewSession();
            return true;
        }
        if (c === "/model" || c === "/models") {
            setShowModelPicker(true);
            setModelPickerIndex(0);
            setModelSearchQuery("");
            return true;
        }
        if (c === "/sandbox") {
            openSandboxPicker();
            return true;
        }
        if (c === "/recap" || c === "/recaps") {
            openRecapPicker();
            return true;
        }
        if (c === "/wallet") {
            openWalletPicker();
            return true;
        }
        if (c === "/remote-control") {
            setConnectModalIndex(0);
            setShowConnectModal(true);
            return true;
        }
        if (c === "/mcp" || c === "/mcps") {
            openMcpModal();
            return true;
        }
        if (c === "/agents" || c === "/agent") {
            openAgentsModal();
            return true;
        }
        if (c === "/schedule" || c === "/schedules") {
            openScheduleModal();
            return true;
        }
        if (c === "/quit" || c === "/exit" || c === "/q") {
            handleExit();
            return true;
        }
        if (c === "/review") {
            processMessage(REVIEW_PROMPT);
            return true;
        }
        if (c === "/verify") {
            processMessage(buildVerifyPrompt(agent.getCwd()));
            return true;
        }
        if (c === "/commit-push") {
            processMessage(COMMIT_PUSH_PROMPT);
            return true;
        }
        if (c === "/commit-pr") {
            processMessage(COMMIT_PR_PROMPT);
            return true;
        }
        if (c.startsWith("/btw ") || c === "/btw") {
            const question = cmd.trim().slice(4).trim();
            if (!question) {
                setMessages((prev) => [
                    ...prev,
                    buildAssistantEntry("Usage: /btw <question>\nExample: /btw what does useEffect cleanup do?"),
                ]);
                return true;
            }
            const ac = new AbortController();
            btwAbortRef.current = ac;
            const loadingState = { status: "loading", question };
            btwStateRef.current = loadingState;
            setBtwState(loadingState);
            agent
                .askSideQuestion(question, ac.signal)
                .then((result) => {
                if (ac.signal.aborted)
                    return;
                const doneState = { status: "done", question, answer: result.response };
                btwStateRef.current = doneState;
                setBtwState(doneState);
            })
                .catch((err) => {
                if (ac.signal.aborted)
                    return;
                const errState = {
                    status: "error",
                    question,
                    error: err instanceof Error ? err.message : String(err),
                };
                btwStateRef.current = errState;
                setBtwState(errState);
            });
            return true;
        }
        const customSubagentCommand = parseCustomSubagentSlashCommand(cmd, subAgents);
        if (customSubagentCommand) {
            if (!customSubagentCommand.prompt) {
                setMessages((prev) => [
                    ...prev,
                    buildAssistantEntry(`Usage: /${customSubagentCommand.agentName} <task>\nExample: /${customSubagentCommand.agentName} review the latest changes`),
                ]);
                return true;
            }
            processMessage(buildCustomSubagentSlashPrompt(customSubagentCommand.agentName, customSubagentCommand.prompt));
            return true;
        }
        return false;
    }, [
        agent,
        handleExit,
        openAgentsModal,
        openMcpModal,
        openRecapPicker,
        openSandboxPicker,
        openWalletPicker,
        openScheduleModal,
        processMessage,
        resetToNewSession,
        subAgents,
    ]);
    const handleSlashMenuSelect = useCallback((item) => {
        setShowSlashMenu(false);
        inputRef.current?.clear();
        switch (item.id) {
            case "new":
                resetToNewSession();
                break;
            case "models":
                setShowModelPicker(true);
                setModelPickerIndex(0);
                setModelSearchQuery("");
                break;
            case "sandbox":
                openSandboxPicker();
                break;
            case "recaps":
                openRecapPicker();
                break;
            case "wallet":
                openWalletPicker();
                break;
            case "remote-control":
                setConnectModalIndex(0);
                setShowConnectModal(true);
                break;
            case "exit":
                handleExit();
                break;
            case "help":
                setMessages((p) => [
                    ...p,
                    {
                        type: "assistant",
                        content: SLASH_MENU_ITEMS.map((i) => `/${i.label} — ${i.description}`).join("\n"),
                        timestamp: new Date(),
                    },
                ]);
                break;
            case "skills":
                setMessages((p) => [
                    ...p,
                    {
                        type: "assistant",
                        content: formatSkillsForChat(discoverSkills(agent.getCwd()), agent.getCwd()),
                        timestamp: new Date(),
                    },
                ]);
                break;
            case "mcp":
                openMcpModal();
                break;
            case "agents":
                openAgentsModal();
                break;
            case "schedule":
                openScheduleModal();
                break;
            case "review":
                processMessage(REVIEW_PROMPT);
                break;
            case "verify":
                processMessage(buildVerifyPrompt(agent.getCwd()));
                break;
            case "commit-push":
                processMessage(COMMIT_PUSH_PROMPT);
                break;
            case "commit-pr":
                processMessage(COMMIT_PR_PROMPT);
                break;
            case "btw":
                inputRef.current?.clear();
                inputRef.current?.insertText("/btw ");
                break;
            case "update":
                setIsUpdating(true);
                setUpdateOutput(null);
                runUpdate(startupConfig.version).then((result) => {
                    setIsUpdating(false);
                    setUpdateOutput(result.success ? result.output : `Update failed: ${result.output}`);
                });
                break;
        }
    }, [
        agent,
        handleExit,
        openAgentsModal,
        openMcpModal,
        openRecapPicker,
        openSandboxPicker,
        openWalletPicker,
        openScheduleModal,
        processMessage,
        resetToNewSession,
        startupConfig.version,
    ]);
    const blockPrompt = showConnectModal ||
        showTelegramTokenModal ||
        showTelegramPairModal ||
        showMcpModal ||
        showSandboxPicker ||
        showRecapPicker ||
        showWalletPicker ||
        !!pendingPaymentApproval ||
        showScheduleModal ||
        showAgentsModal ||
        showAgentsEditor ||
        showUpdateModal;
    const showPlanPanel = !!activePlan?.questions?.length;
    const planQuestions = activePlan?.questions ?? [];
    const isSinglePlan = planQuestions.length === 1 && planQuestions[0]?.type !== "multiselect";
    const planTabCount = isSinglePlan ? 1 : planQuestions.length + 1;
    const isPlanConfirmTab = !isSinglePlan && pqs.tab === planQuestions.length;
    const dismissPlan = useCallback(() => {
        setActivePlan(null);
        setPqs(initialPlanQuestionsState());
    }, []);
    const submitPlanAnswers = useCallback(() => {
        if (!activePlan?.questions?.length)
            return;
        const text = formatPlanAnswers(activePlan.questions, pqs.answers);
        setActivePlan(null);
        setPqs(initialPlanQuestionsState());
        processMessage(text);
    }, [activePlan, pqs.answers, processMessage]);
    const handlePlanSelect = useCallback((q, idx, options, showCustom) => {
        const isCustom = showCustom && idx === options.length;
        if (isCustom) {
            if (q.type === "multiselect") {
                const customVal = pqs.customInputs[q.id] ?? "";
                if (customVal) {
                    const existing = pqs.answers[q.id] ?? [];
                    if (existing.includes(customVal)) {
                        setPqs((s) => ({ ...s, answers: { ...s.answers, [q.id]: existing.filter((x) => x !== customVal) } }));
                    }
                    else {
                        setPqs((s) => ({ ...s, editing: true }));
                    }
                }
                else {
                    setPqs((s) => ({ ...s, editing: true }));
                }
            }
            else {
                setPqs((s) => ({ ...s, editing: true }));
            }
            return;
        }
        const opt = options[idx];
        if (!opt)
            return;
        if (q.type === "multiselect") {
            setPqs((s) => {
                const existing = s.answers[q.id] ?? [];
                const next = existing.includes(opt.id) ? existing.filter((x) => x !== opt.id) : [...existing, opt.id];
                return { ...s, answers: { ...s.answers, [q.id]: next } };
            });
        }
        else {
            setPqs((s) => ({ ...s, answers: { ...s.answers, [q.id]: opt.id } }));
            if (isSinglePlan) {
                submitPlanAnswers();
                return;
            }
            setPqs((s) => ({ ...s, tab: s.tab + 1, selected: 0 }));
        }
    }, [pqs, isSinglePlan, submitPlanAnswers]);
    const dismissBtw = useCallback(() => {
        btwAbortRef.current?.abort();
        btwAbortRef.current = null;
        btwStateRef.current = null;
        setBtwState(null);
    }, []);
    const handleKey = useCallback((key) => {
        if (btwState) {
            if (isEscapeKey(key) || key.name === "return") {
                dismissBtw();
            }
            return;
        }
        if (showPlanPanel) {
            const q = planQuestions[pqs.tab];
            // Escape always dismisses
            if (isEscapeKey(key)) {
                dismissPlan();
                return;
            }
            // When editing custom text input
            if (pqs.editing && !isPlanConfirmTab) {
                if (key.name === "return") {
                    const qId = q?.id;
                    if (qId) {
                        const text = (pqs.customInputs[qId] ?? "").trim();
                        if (text) {
                            if (q.type === "multiselect") {
                                const existing = pqs.answers[qId] ?? [];
                                const next = existing.includes(text) ? existing : [...existing, text];
                                setPqs((s) => ({ ...s, editing: false, answers: { ...s.answers, [qId]: next } }));
                            }
                            else if (q.type === "text") {
                                setPqs((s) => ({ ...s, editing: false, answers: { ...s.answers, [qId]: text } }));
                                if (isSinglePlan) {
                                    submitPlanAnswers();
                                    return;
                                }
                                setPqs((s) => ({ ...s, tab: s.tab + 1, selected: 0 }));
                            }
                            else {
                                setPqs((s) => ({ ...s, editing: false, answers: { ...s.answers, [qId]: text } }));
                                if (isSinglePlan) {
                                    submitPlanAnswers();
                                    return;
                                }
                                setPqs((s) => ({ ...s, tab: s.tab + 1, selected: 0 }));
                            }
                        }
                        else {
                            setPqs((s) => ({ ...s, editing: false }));
                        }
                    }
                    return;
                }
                if (key.name === "backspace") {
                    const qId = q?.id;
                    if (qId)
                        setPqs((s) => ({
                            ...s,
                            customInputs: { ...s.customInputs, [qId]: (s.customInputs[qId] ?? "").slice(0, -1) },
                        }));
                    return;
                }
                if (key.sequence && key.sequence.length === 1 && !key.ctrl && !key.meta) {
                    const qId = q?.id;
                    if (qId)
                        setPqs((s) => ({
                            ...s,
                            customInputs: { ...s.customInputs, [qId]: (s.customInputs[qId] ?? "") + key.sequence },
                        }));
                    return;
                }
                return;
            }
            // Tab / left / right — switch between question tabs
            if (key.name === "tab") {
                const dir = key.shift ? -1 : 1;
                setPqs((s) => ({ ...s, tab: (s.tab + dir + planTabCount) % planTabCount, selected: 0 }));
                return;
            }
            if (key.name === "left" || key.name === "h") {
                setPqs((s) => ({ ...s, tab: (s.tab - 1 + planTabCount) % planTabCount, selected: 0 }));
                return;
            }
            if (key.name === "right" || key.name === "l") {
                setPqs((s) => ({ ...s, tab: (s.tab + 1) % planTabCount, selected: 0 }));
                return;
            }
            // Confirm tab
            if (isPlanConfirmTab) {
                if (key.name === "return") {
                    submitPlanAnswers();
                    return;
                }
                return;
            }
            if (!q)
                return;
            // Text-only question (no options)
            if (q.type === "text") {
                setPqs((s) => ({ ...s, editing: true }));
                return;
            }
            // Up/down — navigate options
            const options = q.options ?? [];
            const showCustom = true;
            const totalItems = options.length + 1;
            if (key.name === "up" || key.name === "k") {
                setPqs((s) => ({ ...s, selected: (s.selected - 1 + totalItems) % totalItems }));
                return;
            }
            if (key.name === "down" || key.name === "j") {
                setPqs((s) => ({ ...s, selected: (s.selected + 1) % totalItems }));
                return;
            }
            // Number keys 1-9 for quick selection
            const digit = Number(key.name);
            if (!Number.isNaN(digit) && digit >= 1 && digit <= Math.min(totalItems, 9)) {
                const idx = digit - 1;
                setPqs((s) => ({ ...s, selected: idx }));
                handlePlanSelect(q, idx, options, showCustom);
                return;
            }
            // Enter — select current option
            if (key.name === "return") {
                handlePlanSelect(q, pqs.selected, options, showCustom);
                return;
            }
            return;
        }
        if (showUpdateModalRef.current) {
            if (isEscapeKey(key)) {
                setShowUpdateModal(false);
                return;
            }
            if (key.name === "return") {
                setIsUpdating(true);
                setShowUpdateModal(false);
                runUpdate(startupConfig.version).then((result) => {
                    setIsUpdating(false);
                    setUpdateOutput(result.output);
                });
                return;
            }
            return;
        }
        if (showMcpEditorRef.current) {
            if (isEscapeKey(key)) {
                setShowMcpEditor(false);
                setMcpEditorError(null);
                setMcpSearchQuery("");
                return;
            }
            if (key.name === "return") {
                submitMcpEditor();
                return;
            }
            if (mcpEditorField === "transport" && (key.name === "left" || key.name === "right")) {
                cycleMcpEditorTransport(key.name === "left" ? -1 : 1);
                return;
            }
            if (key.name === "tab") {
                const idx = mcpEditorFields.indexOf(mcpEditorField);
                const nextIdx = (idx + (key.shift ? -1 : 1) + mcpEditorFields.length) % mcpEditorFields.length;
                setMcpEditorField(mcpEditorFields[nextIdx]);
                return;
            }
            if (mcpEditorField === "transport") {
                return;
            }
        }
        if (showAgentsEditorRef.current) {
            if (isEscapeKey(key)) {
                setShowAgentsEditor(false);
                setAgentsEditorError(null);
                return;
            }
            if (key.name === "x" && key.ctrl && editingSubagent) {
                removeEditingSubagent();
                return;
            }
            if (key.name === "return") {
                submitSubagentEditor();
                return;
            }
            if (agentsEditorField === "model" &&
                (key.name === "up" ||
                    key.name === "down" ||
                    key.name === "left" ||
                    key.name === "right" ||
                    key.name === "j" ||
                    key.name === "k")) {
                const decrement = key.name === "up" || key.name === "left" || key.name === "k";
                setAgentsEditorModelIndex((index) => decrement ? Math.max(0, index - 1) : Math.min(MODELS.length - 1, index + 1));
                return;
            }
            if (key.name === "tab") {
                const index = SUBAGENT_EDITOR_FIELDS.indexOf(agentsEditorField);
                const nextIndex = (index + (key.shift ? -1 : 1) + SUBAGENT_EDITOR_FIELDS.length) % SUBAGENT_EDITOR_FIELDS.length;
                setAgentsEditorField(SUBAGENT_EDITOR_FIELDS[nextIndex]);
                return;
            }
            if (agentsEditorField === "model") {
                return;
            }
        }
        if (showMcpModalRef.current) {
            const row = mcpRows[mcpModalIndex];
            if (isEscapeKey(key)) {
                setShowMcpEditor(false);
                setShowMcpModal(false);
                setMcpSearchQuery("");
                setEditingMcpId(null);
                setMcpEditorError(null);
                return;
            }
            if (key.name === "up") {
                setMcpModalIndex((i) => Math.max(0, i - 1));
                return;
            }
            if (key.name === "down") {
                setMcpModalIndex((i) => Math.min(mcpRows.length - 1, i + 1));
                return;
            }
            if (key.name === "return") {
                if (row?.kind === "server") {
                    toggleSavedMcp(row.server);
                }
                else if (row?.kind === "catalog") {
                    openCatalogMcp(row.entry);
                }
                else {
                    openMcpEditor(createEmptyMcpEditorDraft());
                }
                return;
            }
            if (key.name === "a" && key.ctrl) {
                openMcpEditor(createEmptyMcpEditorDraft());
                return;
            }
            if (key.name === "e" && key.ctrl && row?.kind === "server") {
                editSavedMcp(row.server);
                return;
            }
            if (key.name === "x" && key.ctrl && row?.kind === "server") {
                deleteSavedMcp(row.server);
                return;
            }
            if (key.name === "backspace") {
                setMcpSearchQuery((q) => q.slice(0, -1));
                setMcpModalIndex(0);
                return;
            }
            if (key.sequence && key.sequence.length === 1 && !key.ctrl && !key.meta) {
                setMcpSearchQuery((q) => q + key.sequence);
                setMcpModalIndex(0);
                return;
            }
            return;
        }
        if (showScheduleModalRef.current) {
            const row = scheduleRows[scheduleModalIndex];
            if (isEscapeKey(key)) {
                setShowScheduleModal(false);
                setScheduleSearchQuery("");
                return;
            }
            if (key.name === "up") {
                setScheduleModalIndex((index) => Math.max(0, index - 1));
                return;
            }
            if (key.name === "down") {
                setScheduleModalIndex((index) => Math.min(Math.max(0, scheduleRows.length - 1), index + 1));
                return;
            }
            if (key.name === "return") {
                if (row?.kind === "schedule") {
                    showScheduleDetails(row.schedule);
                }
                return;
            }
            if (key.name === "x" && key.ctrl && row?.kind === "schedule") {
                removeSchedule(row.schedule);
                return;
            }
            if (key.name === "backspace") {
                setScheduleSearchQuery((query) => query.slice(0, -1));
                setScheduleModalIndex(0);
                return;
            }
            if (key.sequence && key.sequence.length === 1 && !key.ctrl && !key.meta) {
                setScheduleSearchQuery((query) => query + key.sequence);
                setScheduleModalIndex(0);
                return;
            }
            return;
        }
        if (showAgentsModalRef.current && !showAgentsEditorRef.current) {
            const row = agentRows[agentsModalIndex];
            if (isEscapeKey(key)) {
                setShowAgentsModal(false);
                setShowAgentsEditor(false);
                setAgentsSearchQuery("");
                setEditingSubagent(null);
                setAgentsEditorError(null);
                return;
            }
            if (key.name === "up") {
                setAgentsModalIndex((index) => Math.max(0, index - 1));
                return;
            }
            if (key.name === "down") {
                setAgentsModalIndex((index) => Math.min(Math.max(0, agentRows.length - 1), index + 1));
                return;
            }
            if (key.name === "return") {
                if (row?.kind === "agent") {
                    openSubagentEditor(row.agent);
                }
                return;
            }
            if (key.name === "a" && key.ctrl) {
                openSubagentEditor(null);
                return;
            }
            if (key.name === "backspace") {
                setAgentsSearchQuery((query) => query.slice(0, -1));
                setAgentsModalIndex(0);
                return;
            }
            if (key.sequence && key.sequence.length === 1 && !key.ctrl && !key.meta) {
                setAgentsSearchQuery((query) => query + key.sequence);
                setAgentsModalIndex(0);
                return;
            }
            return;
        }
        if (showTelegramTokenModalRef.current) {
            if (isEscapeKey(key)) {
                setShowTelegramTokenModal(false);
                setTelegramTokenError(null);
                return;
            }
            if (key.name === "return") {
                submitTelegramToken();
            }
            return;
        }
        if (showTelegramPairModalRef.current) {
            if (isEscapeKey(key)) {
                setShowTelegramPairModal(false);
                setTelegramPairError(null);
                return;
            }
            if (key.name === "return") {
                void submitTelegramPair();
            }
            return;
        }
        if (showConnectModalRef.current) {
            if (isEscapeKey(key)) {
                setShowConnectModal(false);
                return;
            }
            if (key.name === "up") {
                setConnectModalIndex((i) => Math.max(0, i - 1));
                return;
            }
            if (key.name === "down") {
                setConnectModalIndex((i) => Math.min(CONNECT_CHANNELS.length - 1, i + 1));
                return;
            }
            if (key.name === "return") {
                const ch = CONNECT_CHANNELS[connectModalIndex];
                if (ch?.id === "telegram")
                    beginTelegramFromConnect();
                return;
            }
            return;
        }
        if (showApiKeyModalRef.current) {
            if (isEscapeKey(key)) {
                closeApiKeyModal();
                return;
            }
            if (key.name === "return") {
                submitApiKey();
            }
            return;
        }
        if (showSlashMenu) {
            if (isEscapeKey(key)) {
                setShowSlashMenu(false);
                setSlashSearchQuery("");
                inputRef.current?.clear();
                return;
            }
            if (key.name === "up") {
                setSlashMenuIndex((i) => Math.max(0, i - 1));
                return;
            }
            if (key.name === "down") {
                setSlashMenuIndex((i) => Math.min(filteredSlashItems.length - 1, i + 1));
                return;
            }
            if (key.name === "return") {
                const item = filteredSlashItems[slashMenuIndex];
                if (item)
                    handleSlashMenuSelect(item);
                setSlashSearchQuery("");
                return;
            }
            if (key.name === "backspace") {
                setSlashSearchQuery((q) => q.slice(0, -1));
                setSlashMenuIndex(0);
                return;
            }
            if (key.sequence && key.sequence.length === 1 && !key.ctrl && !key.meta) {
                setSlashSearchQuery((q) => q + key.sequence);
                setSlashMenuIndex(0);
                return;
            }
            return;
        }
        if (showModelPicker) {
            if (isEscapeKey(key)) {
                setShowModelPicker(false);
                setModelSearchQuery("");
                return;
            }
            if (key.name === "up") {
                setModelPickerIndex((i) => Math.max(0, i - 1));
                return;
            }
            if (key.name === "down") {
                setModelPickerIndex((i) => Math.min(filteredModelIds.length - 1, i + 1));
                return;
            }
            if (key.name === "left" || key.name === "right") {
                const sel = filteredModelIds[modelPickerIndex];
                if (sel) {
                    adjustModelReasoningEffort(sel, key.name === "left" ? -1 : 1);
                }
                return;
            }
            if (key.name === "return") {
                const sel = filteredModelIds[modelPickerIndex];
                if (sel) {
                    agent.setModel(sel);
                    setModel(sel);
                    saveProjectSettings({ model: sel });
                    saveUserSettings({ defaultModel: sel });
                }
                setShowModelPicker(false);
                setModelSearchQuery("");
                return;
            }
            if (key.name === "backspace") {
                setModelSearchQuery((q) => q.slice(0, -1));
                setModelPickerIndex(0);
                return;
            }
            if (key.sequence && key.sequence.length === 1 && !key.ctrl && !key.meta) {
                setModelSearchQuery((q) => q + key.sequence);
                setModelPickerIndex(0);
                return;
            }
            return;
        }
        if (pendingPaymentApproval) {
            if (isEscapeKey(key)) {
                setPendingPaymentApproval(null);
                return;
            }
            if (key.name === "up" || key.name === "down") {
                setPendingPaymentApproval((p) => (p ? { ...p, selected: p.selected === 0 ? 1 : 0 } : p));
                return;
            }
            if (key.name === "return") {
                const approved = pendingPaymentApproval.selected === 0;
                const aid = pendingPaymentApproval.approvalId;
                setPendingPaymentApproval(null);
                if (aid) {
                    agent.respondToToolApproval(aid, approved);
                    if (approved) {
                        processMessage("[Payment approved]");
                    }
                }
                return;
            }
            return;
        }
        if (showRecapPicker) {
            if (isEscapeKey(key)) {
                setShowRecapPicker(false);
                return;
            }
            if (key.name === "left" || key.name === "right") {
                const current = formatRecapsEnabled(recapsEnabled);
                const idx = RECAP_OPTIONS.indexOf(current);
                const next = key.name === "right"
                    ? RECAP_OPTIONS[Math.min(RECAP_OPTIONS.length - 1, idx + 1)]
                    : RECAP_OPTIONS[Math.max(0, idx - 1)];
                if (next && next !== current) {
                    applyRecapsEnabled(next === "On");
                }
                return;
            }
            if (key.name === "return") {
                applyRecapsEnabled(!recapsEnabled);
                return;
            }
            return;
        }
        if (showWalletPicker) {
            if (isEscapeKey(key)) {
                setShowWalletPicker(false);
                return;
            }
            if (key.name === "up") {
                setWalletFocusIndex((i) => Math.max(0, i - 1));
                return;
            }
            if (key.name === "down") {
                setWalletFocusIndex((i) => Math.min(WALLET_ROWS.length - 1, i + 1));
                return;
            }
            const focusedWalletRow = WALLET_ROWS[walletFocusIndex];
            if (!focusedWalletRow || focusedWalletRow.type === "readonly")
                return;
            if (key.name === "left" || key.name === "right") {
                const options = focusedWalletRow.getOptions();
                const current = focusedWalletRow.getDisplay(walletSettings, walletDisplayInfo);
                const idx = options.indexOf(current);
                const next = key.name === "right" ? options[Math.min(options.length - 1, idx + 1)] : options[Math.max(0, idx - 1)];
                if (next && next !== current && focusedWalletRow.apply) {
                    const patch = focusedWalletRow.apply(walletSettings, next);
                    applyWalletSettings({ ...walletSettings, ...patch });
                }
                return;
            }
            if (key.name === "return") {
                const options = focusedWalletRow.getOptions();
                const current = focusedWalletRow.getDisplay(walletSettings, walletDisplayInfo);
                const idx = options.indexOf(current);
                const next = options[(idx + 1) % options.length];
                if (next && focusedWalletRow.apply) {
                    const patch = focusedWalletRow.apply(walletSettings, next);
                    applyWalletSettings({ ...walletSettings, ...patch });
                }
                return;
            }
            return;
        }
        if (showSandboxPicker) {
            const visibleRows = getSandboxVisibleRows(sandboxMode);
            if (sandboxSettingsEditing) {
                if (isEscapeKey(key)) {
                    setSandboxSettingsEditing(null);
                    setSandboxSettingsEditBuffer("");
                    return;
                }
                if (key.name === "return") {
                    const row = visibleRows.find((r) => r.key === sandboxSettingsEditing);
                    if (row) {
                        const result = row.apply(sandboxMode, sandboxSettings, sandboxSettingsEditBuffer.trim());
                        if (result.mode !== undefined)
                            applySandboxMode(result.mode);
                        if (result.settings)
                            applySandboxSettings({ ...sandboxSettings, ...result.settings });
                    }
                    setSandboxSettingsEditing(null);
                    setSandboxSettingsEditBuffer("");
                    return;
                }
                if (key.name === "backspace") {
                    setSandboxSettingsEditBuffer((b) => b.slice(0, -1));
                    return;
                }
                if (key.sequence && key.sequence.length === 1 && !key.ctrl && !key.meta) {
                    setSandboxSettingsEditBuffer((b) => b + key.sequence);
                    return;
                }
                return;
            }
            if (isEscapeKey(key)) {
                setShowSandboxPicker(false);
                return;
            }
            if (key.name === "up") {
                setSandboxSettingsFocusIndex((i) => Math.max(0, i - 1));
                return;
            }
            if (key.name === "down") {
                setSandboxSettingsFocusIndex((i) => Math.min(visibleRows.length - 1, i + 1));
                return;
            }
            const focusedRow = visibleRows[sandboxSettingsFocusIndex];
            if (!focusedRow)
                return;
            if (focusedRow.type === "toggle" && (key.name === "left" || key.name === "right")) {
                const options = focusedRow.getOptions();
                const current = focusedRow.getDisplay(sandboxMode, sandboxSettings);
                const idx = options.indexOf(current);
                const next = key.name === "right" ? options[Math.min(options.length - 1, idx + 1)] : options[Math.max(0, idx - 1)];
                if (next && next !== current) {
                    const result = focusedRow.apply(sandboxMode, sandboxSettings, next);
                    if (result.mode !== undefined)
                        applySandboxMode(result.mode);
                    if (result.settings)
                        applySandboxSettings({ ...sandboxSettings, ...result.settings });
                }
                return;
            }
            if (key.name === "return") {
                if (focusedRow.type === "toggle") {
                    const options = focusedRow.getOptions();
                    const current = focusedRow.getDisplay(sandboxMode, sandboxSettings);
                    const idx = options.indexOf(current);
                    const next = options[(idx + 1) % options.length];
                    const result = focusedRow.apply(sandboxMode, sandboxSettings, next);
                    if (result.mode !== undefined)
                        applySandboxMode(result.mode);
                    if (result.settings)
                        applySandboxSettings({ ...sandboxSettings, ...result.settings });
                }
                else {
                    setSandboxSettingsEditing(focusedRow.key);
                    const current = sandboxSettings[focusedRow.key];
                    setSandboxSettingsEditBuffer(Array.isArray(current) ? current.join(", ") : current != null ? String(current) : "");
                }
                return;
            }
            return;
        }
        if (isEscapeKey(key) && interruptActiveRun(key)) {
            return;
        }
        if (!hasApiKeyRef.current && shouldOpenApiKeyModalForKey(key)) {
            openApiKeyModal();
            return;
        }
        if (key.sequence === "/" && !isProcessing) {
            const text = inputRef.current?.plainText || "";
            if (!text.trim()) {
                setShowSlashMenu(true);
                setSlashMenuIndex(0);
                setSlashSearchQuery("");
                return;
            }
        }
        if (key.name === "e" && key.ctrl) {
            let lastUserIdx = -1;
            for (let i = messages.length - 1; i >= 0; i--) {
                if (messages[i].type === "user") {
                    lastUserIdx = i;
                    break;
                }
            }
            if (lastUserIdx >= 0) {
                setExpandedMessages((prev) => {
                    const next = new Set(prev);
                    if (next.has(lastUserIdx))
                        next.delete(lastUserIdx);
                    else
                        next.add(lastUserIdx);
                    return next;
                });
            }
            return;
        }
        if (key.name === "c" && key.ctrl && key.shift) {
            if (copyTuiSelectionToHost()) {
                key.preventDefault();
                key.stopPropagation();
            }
            return;
        }
        if (key.name === "y" && key.ctrl && copyTuiSelectionToHost()) {
            key.preventDefault();
            key.stopPropagation();
            return;
        }
        // ⌘C: Kitty / iTerm report Command as `super`; some setups use `meta` instead.
        if (key.name === "c" && !key.ctrl && (key.meta || key.super)) {
            if (copyTuiSelectionToHost()) {
                key.preventDefault();
                key.stopPropagation();
                return;
            }
        }
        if (key.name === "c" && key.ctrl) {
            if (copyTuiSelectionToHost()) {
                key.preventDefault();
                key.stopPropagation();
                return;
            }
            const text = inputRef.current?.plainText || "";
            if (text.trim()) {
                inputRef.current?.clear();
                replacePasteBlocks([]);
            }
            else {
                handleExit();
            }
            return;
        }
        if (typeaheadRef.current.visible) {
            if (key.name === "up") {
                typeaheadRef.current.navigateUp();
                return;
            }
            if (key.name === "down") {
                typeaheadRef.current.navigateDown();
                return;
            }
            if (key.name === "tab" || key.name === "return") {
                key.preventDefault();
                key.stopPropagation();
                typeaheadRef.current.accept();
                return;
            }
            if (isEscapeKey(key)) {
                typeaheadRef.current.dismiss();
                return;
            }
        }
        if (key.name === "tab" && !isProcessing) {
            cycleMode();
            return;
        }
    }, [
        agent,
        agentRows,
        agentsEditorField,
        agentsModalIndex,
        beginTelegramFromConnect,
        btwState,
        closeApiKeyModal,
        connectModalIndex,
        cycleMode,
        cycleMcpEditorTransport,
        deleteSavedMcp,
        dismissBtw,
        dismissPlan,
        editingSubagent,
        editSavedMcp,
        adjustModelReasoningEffort,
        filteredModelIds,
        filteredSlashItems,
        handleExit,
        handlePlanSelect,
        handleSlashMenuSelect,
        interruptActiveRun,
        isPlanConfirmTab,
        isProcessing,
        isSinglePlan,
        mcpEditorField,
        mcpEditorFields,
        mcpModalIndex,
        mcpRows,
        modelPickerIndex,
        openApiKeyModal,
        openCatalogMcp,
        openMcpEditor,
        replacePasteBlocks,
        openSubagentEditor,
        removeSchedule,
        scheduleModalIndex,
        scheduleRows,
        showScheduleDetails,
        submitTelegramPair,
        submitTelegramToken,
        submitMcpEditor,
        submitSubagentEditor,
        planQuestions,
        planTabCount,
        pqs,
        removeEditingSubagent,
        applyRecapsEnabled,
        applySandboxMode,
        applySandboxSettings,
        recapsEnabled,
        sandboxSettings,
        sandboxSettingsEditing,
        sandboxSettingsEditBuffer,
        sandboxSettingsFocusIndex,
        sandboxMode,
        showModelPicker,
        showPlanPanel,
        showRecapPicker,
        showSandboxPicker,
        pendingPaymentApproval,
        processMessage,
        showWalletPicker,
        walletSettings,
        walletFocusIndex,
        walletDisplayInfo,
        applyWalletSettings,
        showSlashMenu,
        slashMenuIndex,
        submitApiKey,
        submitPlanAnswers,
        copyTuiSelectionToHost,
        toggleSavedMcp,
        messages,
        startupConfig.version,
    ]);
    useKeyboard(handleKey);
    const handlePaste = useCallback((event) => {
        if (!hasApiKeyRef.current) {
            event.preventDefault();
            openApiKeyModal();
            return;
        }
        const text = decodePasteBytes(event.bytes);
        const trimmed = text.trim();
        const imageExts = /\.(png|jpe?g|gif|webp|svg|bmp|ico|tiff?)$/i;
        if (imageExts.test(trimmed) && !trimmed.includes("\n")) {
            event.preventDefault();
            const id = ++pasteCounterRef.current;
            const block = { id, content: trimmed, lines: 1, isImage: true };
            replacePasteBlocks([...pasteBlocksRef.current, block]);
            inputRef.current?.insertText(getPasteBlockToken(block));
            return;
        }
        const lineCount = text.split("\n").length;
        if (lineCount < 2)
            return;
        event.preventDefault();
        const id = ++pasteCounterRef.current;
        const block = { id, content: text, lines: lineCount };
        replacePasteBlocks([...pasteBlocksRef.current, block]);
        inputRef.current?.insertText(getPasteBlockToken(block));
    }, [openApiKeyModal, replacePasteBlocks]);
    const handleSubmit = useCallback(() => {
        const raw = inputRef.current?.plainText || "";
        if (!raw.trim() && pasteBlocksRef.current.length === 0) {
            if (queuedMessagesRef.current.length > 0 && isProcessingRef.current) {
                interruptedRunIdRef.current = activeRunIdRef.current;
                const activeAgent = activeTurnRef.current?.agent ?? agent;
                activeTurnRef.current = null;
                clearLiveTurnUi();
                activeAgent.abort();
            }
            return;
        }
        inputRef.current?.clear();
        let message = raw;
        const blocks = [...pasteBlocksRef.current];
        replacePasteBlocks([]);
        for (const block of blocks) {
            message = message.replace(getPasteBlockToken(block), block.content);
        }
        const displayText = message.trim();
        const fileBlocks = [...fileMentionBlocksRef.current];
        fileMentionBlocksRef.current = [];
        for (const block of fileBlocks) {
            message = message.replace(getFileMentionToken(block), `@${block.path}`);
        }
        if (!message.trim())
            return;
        if (!hasApiKeyRef.current) {
            openApiKeyModal();
            return;
        }
        if (handleCommand(message))
            return;
        const { enhancedMessage } = processAtMentions(message.trim(), agent.getCwd());
        if (isProcessingRef.current) {
            queuedMessagesRef.current.push({ text: enhancedMessage, displayText });
            setQueuedMessages(queuedMessagesRef.current.map((msg) => msg.displayText));
            setTimeout(scrollToBottom, 10);
            return;
        }
        processMessage(enhancedMessage, displayText);
    }, [agent, clearLiveTurnUi, handleCommand, openApiKeyModal, processMessage, replacePasteBlocks, scrollToBottom]);
    const hasMessages = messages.length > 0 || streamContent || isProcessing;
    return (
    // biome-ignore lint/a11y/noStaticElementInteractions: OpenCode-style copy-on-mouse-up on root surface
    _jsxs("box", { width: width, height: height, backgroundColor: t.background, flexDirection: "column", onMouseUp: handleRootMouseUp, children: [copyFlashId > 0 ? _jsx(CopyFlashBanner, { t: t, width: width }) : null, hasMessages ? (_jsxs("box", { flexGrow: 1, flexDirection: "column", children: [_jsx(SessionHeader, { t: t, modeInfo: modeInfo, sessionTitle: sessionTitle, sessionId: sessionId }), _jsxs("box", { flexGrow: 1, paddingBottom: 1, paddingTop: 1, paddingLeft: 2, paddingRight: 2, gap: 1, children: [_jsxs("scrollbox", { ref: scrollRef, flexGrow: 1, stickyScroll: true, stickyStart: "bottom", children: [messages.map((msg, i) => (_jsx(MessageView, { entry: msg, index: i, t: t, modeColor: modeInfo.color, expandedMessages: expandedMessages }, `${(msg.timestamp ?? new Date(0)).getTime()}-${msg.type}-${msg.remoteKey ?? ""}-${String(msg.content).slice(0, 24)}`))), liveTurnSourceLabel && (activeToolCalls.length > 0 || streamContent || isProcessing) && (_jsx("box", { paddingLeft: 3, marginTop: 1, flexShrink: 0, children: _jsx("text", { fg: t.textMuted, children: liveTurnSourceLabel }) })), activeToolCalls.map((tc) => tc.function.name === "task" ? (_jsx(SubagentTaskLine, { t: t, agent: tryParseArg(tc, "agent") || "sub-agent", label: toolArgs(tc) || "Working", pending: true }, tc.id)) : tc.function.name === "delegate" ? (_jsx(DelegationTaskLine, { t: t, label: toolArgs(tc) || "Background research", pending: true, id: undefined }, tc.id)) : (_jsx(InlineTool, { t: t, pending: true, children: toolLabel(tc) }, tc.id))), activeSubagent && _jsx(SubagentActivity, { t: t, status: activeSubagent }), streamContent && (_jsxs("box", { paddingLeft: 3, marginTop: 1, flexShrink: 0, children: [_jsx(Markdown, { content: streamContent, t: t }), _jsx(StreamCursor, { t: t })] })), isProcessing && !streamContent && activeToolCalls.length === 0 && (_jsx(ShimmerText, { t: t, text: "Planning next moves" })), showPlanPanel && _jsx(PlanQuestionsPanel, { t: t, questions: planQuestions, state: pqs }), pendingPaymentApproval && _jsx(PaymentApprovalPanel, { t: t, payment: pendingPaymentApproval })] }), btwState && _jsx(BtwOverlay, { state: btwState, theme: t }), _jsxs("box", { flexShrink: 0, flexDirection: "column", children: [sessionRecap ? _jsx(RecapBanner, { t: t, recap: sessionRecap }) : null, _jsx(PromptBox, { t: t, inputRef: inputRef, isProcessing: isProcessing, showModelPicker: showModelPicker, showSandboxPicker: showSandboxPicker, showWalletPicker: showWalletPicker, showSlashMenu: showSlashMenu, showPlanQuestions: showPlanPanel, showApiKeyModal: showApiKeyModal, blockPrompt: blockPrompt, onSubmit: handleSubmit, onPaste: handlePaste, pasteBlocks: pasteBlocks, modeInfo: modeInfo, model: model, modelInfo: modelInfo, contextStats: contextStats, queuedCount: queuedMessages.length, queuedMessages: queuedMessages, typeahead: typeahead })] })] }), _jsxs("box", { paddingLeft: 2, paddingRight: 2, paddingBottom: 1, flexDirection: "row", flexShrink: 0, children: [_jsx("text", { fg: t.textDim, children: agent.getCwd().replace(os.homedir(), "~") }), sandboxMode === "shuru" ? _jsx("text", { fg: "#f97316", children: " · sandbox" }) : null, _jsx("box", { flexGrow: 1 })] })] })) : (
            /* ── Home ───────────────────────────────────────── */
            _jsxs(_Fragment, { children: [_jsxs("box", { flexGrow: 1, alignItems: "center", paddingLeft: 2, paddingRight: 2, children: [_jsx("box", { flexGrow: 1, minHeight: 0 }), _jsx("box", { flexShrink: 0, alignItems: "center", children: _jsx(HeroLogo, { t: t }) }), _jsx("box", { height: 1, minHeight: 0, flexShrink: 1 }), _jsx("box", { width: "100%", maxWidth: 75, flexShrink: 0, children: _jsx(PromptBox, { t: t, inputRef: inputRef, isProcessing: isProcessing, showModelPicker: showModelPicker, showSandboxPicker: showSandboxPicker, showWalletPicker: showWalletPicker, showSlashMenu: showSlashMenu, showPlanQuestions: showPlanPanel, showApiKeyModal: showApiKeyModal, blockPrompt: blockPrompt, onSubmit: handleSubmit, onPaste: handlePaste, pasteBlocks: pasteBlocks, modeInfo: modeInfo, model: model, modelInfo: modelInfo, contextStats: contextStats, placeholder: "What are we building?", typeahead: typeahead }) }), _jsx("box", { height: 2, minHeight: 0, flexShrink: 1 }), _jsx("box", { flexGrow: 1, minHeight: 0 })] }), updateInfo?.hasUpdate && (_jsx("box", { paddingLeft: 2, paddingRight: 2, flexDirection: "row", flexShrink: 0, children: _jsxs("text", { fg: "#f59e0b", children: ["┃ Update available: v", startupConfig.version, " → v", updateInfo.latestVersion, " — run /update to install"] }) })), isUpdating && (_jsx("box", { paddingLeft: 2, paddingRight: 2, flexDirection: "row", flexShrink: 0, children: _jsx("text", { fg: "#f59e0b", children: "┃ Updating..." }) })), updateOutput && !isUpdating && (_jsx("box", { paddingLeft: 2, paddingRight: 2, flexDirection: "row", flexShrink: 0, children: _jsxs("text", { fg: updateOutput.startsWith("Update complete") ? "#22c55e" : "#ef4444", children: ["┃ ", updateOutput] }) })), _jsxs("box", { paddingLeft: 2, paddingRight: 2, paddingBottom: 1, flexDirection: "row", flexShrink: 0, children: [_jsx("text", { fg: t.textDim, children: agent.getCwd().replace(os.homedir(), "~") }), sandboxMode === "shuru" ? _jsx("text", { fg: "#f97316", children: " · sandbox" }) : null, _jsx("box", { flexGrow: 1 }), _jsx("text", { fg: t.textDim, children: `v${startupConfig.version}` })] })] })), showApiKeyModal && (_jsx(ApiKeyModal, { t: t, width: width, height: height, inputRef: apiKeyInputRef, error: apiKeyError, provider: startupConfig.provider, onSubmit: submitApiKey })), showUpdateModal && updateInfo && (_jsx(UpdateModal, { t: t, width: width, height: height, currentVersion: startupConfig.version, latestVersion: updateInfo.latestVersion })), showSlashMenu && (_jsx(SlashMenuModal, { t: t, selectedIndex: slashMenuIndex, width: width, height: height, searchQuery: slashSearchQuery, filteredItems: filteredSlashItems })), showMcpModal && !showMcpEditor && (_jsx(McpBrowserModal, { t: t, width: width, height: height, selectedIndex: mcpModalIndex, searchQuery: mcpSearchQuery, rows: mcpRows })), showMcpEditor && (_jsx(McpEditorModal, { t: t, width: width, height: height, draft: mcpEditorDraft, focusedField: mcpEditorField, syncKey: mcpEditorSyncKey, error: mcpEditorError, title: editingMcpId ? "Edit MCP Server" : "Add MCP Server", labelRef: mcpLabelRef, urlRef: mcpUrlRef, headersRef: mcpHeadersRef, commandRef: mcpCommandRef, argsRef: mcpArgsRef, cwdRef: mcpCwdRef, envRef: mcpEnvRef, onSubmit: submitMcpEditor })), showScheduleModal && (_jsx(ScheduleBrowserModal, { t: t, width: width, height: height, selectedIndex: scheduleModalIndex, searchQuery: scheduleSearchQuery, rows: scheduleRows })), showAgentsModal && !showAgentsEditor && (_jsx(SubagentsBrowserModal, { t: t, width: width, height: height, selectedIndex: agentsModalIndex, searchQuery: agentsSearchQuery, rows: agentRows })), showAgentsEditor && (_jsx(SubagentEditorModal, { t: t, width: width, height: height, draft: agentsEditorDraft, focusedField: agentsEditorField, modelIndex: agentsEditorModelIndex, error: agentsEditorError, title: editingSubagent ? `Edit sub-agent: ${formatSubagentName(editingSubagent.name)}` : "Add sub-agent", nameRef: subagentNameRef, instructionRef: subagentInstructionRef, onSubmit: submitSubagentEditor, showRemoveHint: !!editingSubagent }, `subagent-editor-${agentsEditorSyncKey}`)), showModelPicker && (_jsx(ModelPickerModal, { t: t, currentModel: model, selectedIndex: modelPickerIndex, width: width, height: height, searchQuery: modelSearchQuery, filteredModels: filteredModels, reasoningEffortByModel: reasoningEffortByModel })), showWalletPicker && (_jsx(WalletPickerModal, { t: t, settings: walletSettings, walletInfo: walletDisplayInfo, focusIndex: walletFocusIndex, width: width, height: height })), showRecapPicker && _jsx(RecapPickerModal, { t: t, enabled: recapsEnabled, width: width, height: height }), showSandboxPicker && (_jsx(SandboxPickerModal, { t: t, currentMode: sandboxMode, settings: sandboxSettings, focusIndex: sandboxSettingsFocusIndex, editing: sandboxSettingsEditing, editBuffer: sandboxSettingsEditBuffer, width: width, height: height })), showConnectModal && (_jsx(ConnectModal, { t: t, width: width, height: height, selectedIndex: connectModalIndex, channels: CONNECT_CHANNELS })), showTelegramTokenModal && (_jsx(TelegramTokenModal, { t: t, width: width, height: height, inputRef: telegramTokenInputRef, error: telegramTokenError, onSubmit: submitTelegramToken })), showTelegramPairModal && (_jsx(TelegramPairModal, { t: t, width: width, height: height, inputRef: telegramPairInputRef, error: telegramPairError, onSubmit: () => void submitTelegramPair() }))] }));
}
/* ── Session Header ──────────────────────────────────────────── */
function SessionHeader({ t, modeInfo, sessionTitle, sessionId, }) {
    return (_jsx("box", { flexShrink: 0, width: "100%", children: _jsxs("box", { flexDirection: "row", width: "100%", paddingTop: 1, paddingBottom: 1, paddingLeft: 2, paddingRight: 2, children: [_jsxs("text", { children: [_jsx("span", { style: { fg: modeInfo.color }, children: _jsx("b", { children: modeInfo.label }) }), sessionTitle ? (_jsx("span", { style: { fg: t.text }, children: _jsxs("b", { children: [": ", sessionTitle] }) })) : null] }), _jsx("box", { flexGrow: 1 }), sessionId ? _jsx("text", { fg: t.textDim, children: sessionId }) : null] }) }));
}
function RecapBanner({ t, recap }) {
    return (_jsx("box", { width: "100%", paddingBottom: 1, children: _jsxs("text", { children: [_jsx("span", { style: { fg: t.textDim }, children: "※ recap: " }), _jsx("span", { style: { fg: t.textMuted }, children: recap })] }) }));
}
/* ── Prompt Box ──────────────────────────────────────────────── */
const TEXTAREA_KEYBINDINGS = [
    { name: "return", action: "submit" },
    { name: "return", shift: true, action: "newline" },
];
function formatTokenCount(tokens) {
    if (tokens >= 1_000_000)
        return `${(tokens / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
    if (tokens >= 1_000)
        return `${Math.round(tokens / 1_000)}K`;
    return String(tokens);
}
function ContextMeter({ t, stats }) {
    return (_jsxs("text", { children: [_jsx("span", { style: { fg: t.textMuted }, children: `${Math.round(stats.ratioRemaining * 100)}%` }), _jsx("span", { style: { fg: t.textDim }, children: ` ${formatTokenCount(stats.remainingTokens)}` })] }));
}
function PromptBox({ t, inputRef, isProcessing, showModelPicker, showSandboxPicker, showWalletPicker, showSlashMenu, showPlanQuestions, showApiKeyModal, blockPrompt, onSubmit, onPaste, pasteBlocks: _pasteBlocks, modeInfo, model, modelInfo, contextStats, placeholder, queuedCount, queuedMessages, typeahead, }) {
    const hasQueue = (queuedMessages?.length ?? 0) > 0;
    const showSuggestions = typeahead?.visible ?? false;
    return (_jsxs("box", { backgroundColor: t.backgroundPanel, children: [_jsxs("box", { children: [hasQueue && (_jsxs("box", { paddingLeft: 2, paddingRight: 2, paddingTop: 1, paddingBottom: 1, backgroundColor: t.queueBg, flexShrink: 0, children: [queuedMessages.map((msg, i) => (
                            // biome-ignore lint/suspicious/noArrayIndexKey: append-only queue of plain strings
                            _jsxs("text", { fg: t.text, children: ["→ ", msg] }, i))), _jsx("box", { height: 1 }), _jsxs("text", { children: [_jsx("span", { style: { fg: t.primary }, children: "enter " }), _jsx("span", { style: { fg: t.textMuted }, children: "send now" }), _jsx("span", { style: { fg: t.textDim }, children: " · " }), _jsx("span", { style: { fg: t.primary }, children: "↑ " }), _jsx("span", { style: { fg: t.textMuted }, children: "edit" }), _jsx("span", { style: { fg: t.textDim }, children: " · " }), _jsx("span", { style: { fg: t.primary }, children: "esc " }), _jsx("span", { style: { fg: t.textMuted }, children: "cancel" })] })] })), showSuggestions && typeahead && (_jsx(SuggestionOverlay, { t: t, suggestions: typeahead.suggestions, selectedIndex: typeahead.selectedIndex })), _jsxs("box", { paddingLeft: 2, paddingRight: 2, paddingTop: 1, paddingBottom: 1, backgroundColor: t.backgroundElement, flexDirection: "row", gap: 2, alignItems: "flex-start", flexShrink: 0, children: [_jsx(PromptModeLabel, { t: t, modeInfo: modeInfo, isProcessing: isProcessing }), _jsx("box", { flexGrow: 1, children: _jsx("textarea", { ref: inputRef, focused: !showModelPicker &&
                                        !showSandboxPicker &&
                                        !showWalletPicker &&
                                        !showSlashMenu &&
                                        !showPlanQuestions &&
                                        !showApiKeyModal &&
                                        !blockPrompt, placeholder: isProcessing ? "Queue a follow-up... (esc to interrupt)" : placeholder || "Message Grok...", textColor: t.text, backgroundColor: t.backgroundElement, placeholderColor: t.textMuted, minHeight: 1, maxHeight: 10, wrapMode: "word", keyBindings: TEXTAREA_KEYBINDINGS, onSubmit: onSubmit, onPaste: onPaste }) })] })] }), _jsxs("box", { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingLeft: 2, paddingRight: 2, height: 1, flexShrink: 0, children: [_jsxs("box", { flexDirection: "row", gap: 1, alignItems: "center", height: 1, children: [_jsx("text", { fg: t.text, children: modelInfo?.name || model }), contextStats ? _jsx(ContextMeter, { t: t, stats: contextStats }) : null] }), _jsx("box", { flexDirection: "row", gap: 1, alignItems: "center", height: 1, children: isProcessing ? (_jsxs("box", { flexDirection: "row", gap: 1, children: [_jsxs("text", { fg: t.text, children: ["enter ", _jsx("span", { style: { fg: t.textMuted }, children: "queue" })] }), _jsxs("text", { fg: t.text, children: ["esc ", _jsx("span", { style: { fg: t.textMuted }, children: (queuedCount ?? 0) > 0 ? "clear queue" : "interrupt" })] })] })) : showSuggestions ? (_jsxs("box", { flexDirection: "row", gap: 1, children: [_jsxs("text", { fg: t.text, children: ["tab ", _jsx("span", { style: { fg: t.textMuted }, children: "accept" })] }), _jsxs("text", { fg: t.text, children: ["↑↓ ", _jsx("span", { style: { fg: t.textMuted }, children: "navigate" })] }), _jsxs("text", { fg: t.text, children: ["esc ", _jsx("span", { style: { fg: t.textMuted }, children: "dismiss" })] })] })) : (_jsxs(_Fragment, { children: [_jsxs("text", { fg: t.text, children: ["@ ", _jsx("span", { style: { fg: t.textMuted }, children: "files" })] }), _jsxs("text", { fg: t.text, children: ["shift+enter ", _jsx("span", { style: { fg: t.textMuted }, children: "new line" })] }), _jsxs("text", { fg: t.text, children: ["tab ", _jsx("span", { style: { fg: t.textMuted }, children: "modes" })] })] })) })] })] }));
}
function PromptModeLabel({ t, modeInfo, isProcessing, }) {
    if (!isProcessing) {
        return (_jsx("text", { fg: modeInfo.color, children: _jsx("b", { children: modeInfo.label }) }));
    }
    return _jsx(PromptLoadingBoxes, { t: t, color: modeInfo.color });
}
function PromptLoadingBoxes({ t: _t, color }) {
    const [frame, setFrame] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setFrame((n) => (n + 1) % PROMPT_LOADING_FRAMES.length), 120);
        return () => clearInterval(id);
    }, []);
    const step = PROMPT_LOADING_FRAMES[frame] ?? PROMPT_LOADING_FRAMES[0];
    return (_jsx("text", { children: [0, 1, 2, 3].map((idx) => (_jsx("span", { style: { fg: promptLoadingCellColor(color, idx, step.active, step.forward) }, children: promptLoadingCellGlyph(idx, step.active, step.forward) }, idx))) }));
}
function promptLoadingCellGlyph(index, active, forward) {
    const distance = forward ? active - index : index - active;
    return distance >= 0 && distance < 2 ? "■" : "⬝";
}
function promptLoadingCellColor(color, index, active, forward) {
    const distance = forward ? active - index : index - active;
    if (distance === 0)
        return color;
    if (distance === 1)
        return withAlpha(color, 0.72);
    return withAlpha(color, 0.22);
}
function withAlpha(color, alpha) {
    const normalized = color.trim();
    const hex = normalized.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (!hex)
        return color;
    const body = hex[1];
    const expanded = body.length === 3
        ? body
            .split("")
            .map((ch) => ch + ch)
            .join("")
        : body;
    const alphaHex = Math.round(Math.max(0, Math.min(1, alpha)) * 255)
        .toString(16)
        .padStart(2, "0");
    return `#${expanded}${alphaHex}`;
}
function CopyFlashBanner({ t, width }) {
    return (_jsx("box", { position: "absolute", left: 0, top: 1, width: width, zIndex: 500, alignItems: "center", flexShrink: 0, backgroundColor: t.background, shouldFill: false, children: _jsx("box", { height: 3, paddingLeft: 2, paddingRight: 2, backgroundColor: t.queueBg, justifyContent: "center", alignItems: "center", children: _jsxs("text", { children: [_jsx("span", { style: { fg: t.accent }, children: "✓ " }), _jsx("span", { style: { fg: t.text }, children: "Copied to clipboard" })] }) }) }));
}
function ApiKeyModal({ t, width, height, inputRef, error, provider, onSubmit, }) {
    const overlayBg = "#000000cc";
    const panelWidth = Math.min(68, width - 6);
    const panelHeight = 13;
    const top = bottomAlignedModalTop(height, panelHeight);
    return (_jsx("box", { position: "absolute", left: 0, top: 0, width: width, height: height, alignItems: "center", paddingTop: top, backgroundColor: overlayBg, children: _jsxs("box", { width: panelWidth, height: panelHeight, backgroundColor: t.backgroundPanel, paddingTop: 1, paddingBottom: 1, flexDirection: "column", children: [_jsxs("box", { flexShrink: 0, flexDirection: "row", justifyContent: "space-between", paddingLeft: 2, paddingRight: 2, children: [_jsx("text", { fg: t.primary, children: _jsx("b", { children: "Add API key" }) }), _jsx("text", { fg: t.textMuted, children: "esc" })] }), _jsx("box", { paddingLeft: 2, paddingRight: 2, paddingTop: 1, children: _jsx("text", { fg: t.text, children: `Paste your ${provider} API key to unlock chat. You can hide this prompt with esc.` }) }), _jsx("box", { paddingLeft: 2, paddingRight: 2, paddingTop: 1, children: _jsx("box", { backgroundColor: t.backgroundElement, paddingLeft: 1, paddingRight: 1, width: "100%", children: _jsx("textarea", { ref: inputRef, focused: true, placeholder: "api key", textColor: t.text, backgroundColor: t.backgroundElement, placeholderColor: t.textMuted, minHeight: 1, maxHeight: 3, wrapMode: "word", keyBindings: TEXTAREA_KEYBINDINGS, onSubmit: onSubmit }) }) }), _jsx("box", { flexGrow: 1, minHeight: 0 }), _jsx("box", { paddingLeft: 2, paddingRight: 2, paddingTop: 2, paddingBottom: 1, children: error ? (_jsx("text", { fg: t.diffRemovedFg, children: error })) : (_jsxs("text", { children: [_jsx("span", { style: { fg: t.primary }, children: "enter " }), _jsx("span", { style: { fg: t.textMuted }, children: "save key  ·  " }), _jsx("span", { style: { fg: t.primary }, children: "esc " }), _jsx("span", { style: { fg: t.textMuted }, children: "hide" })] })) })] }) }));
}
/* ── Messages ────────────────────────────────────────────────── */
const USER_MSG_COLLAPSED_LINES = 5;
function UserMessageContent({ content, t, expanded }) {
    const lines = content.split("\n");
    const isLong = lines.length > USER_MSG_COLLAPSED_LINES;
    if (!isLong) {
        return _jsx("text", { fg: t.text, children: content });
    }
    if (expanded) {
        return (_jsxs(_Fragment, { children: [_jsx("text", { fg: t.text, children: content }), _jsx("box", { marginTop: 1, children: _jsxs("text", { fg: t.textDim, children: ["ctrl+e ", _jsx("span", { style: { fg: t.textMuted }, children: "collapse" })] }) })] }));
    }
    const preview = lines.slice(0, USER_MSG_COLLAPSED_LINES).join("\n");
    const hiddenCount = lines.length - USER_MSG_COLLAPSED_LINES;
    return (_jsxs(_Fragment, { children: [_jsx("text", { fg: t.text, children: preview }), _jsx("box", { marginTop: 1, children: _jsxs("text", { fg: t.textDim, children: ["ctrl+e ", _jsx("span", { style: { fg: t.textMuted }, children: `expand (${hiddenCount} more lines)` })] }) })] }));
}
function MessageView({ entry, index, t, modeColor, expandedMessages, }) {
    switch (entry.type) {
        case "user":
            return (_jsx("box", { border: ["left"], customBorderChars: SPLIT, borderColor: entry.modeColor || modeColor, marginTop: index === 0 ? 0 : 1, marginBottom: 1, children: _jsxs("box", { paddingTop: 1, paddingBottom: 1, paddingLeft: 2, backgroundColor: t.backgroundPanel, flexShrink: 0, flexDirection: "column", children: [entry.sourceLabel ? _jsx("text", { fg: t.textMuted, children: entry.sourceLabel }) : null, _jsx(UserMessageContent, { content: entry.content, t: t, expanded: expandedMessages?.has(index) ?? false })] }) }));
        case "assistant":
            return (_jsxs("box", { paddingLeft: 3, marginTop: 1, flexShrink: 0, flexDirection: "column", children: [entry.sourceLabel ? _jsx("text", { fg: t.textMuted, children: entry.sourceLabel }) : null, _jsx(Markdown, { content: entry.content, t: t })] }));
        case "tool_call":
            return (_jsx("box", { paddingLeft: 3, marginTop: 1, children: _jsxs("text", { children: [_jsx("span", { style: { fg: entry.modeColor || modeColor }, children: "▣ " }), _jsx("span", { style: { fg: t.textMuted }, children: entry.content.replace("▣  ", "") })] }) }));
        case "tool_result": {
            const name = entry.toolCall?.function.name || "tool";
            const args = toolArgs(entry.toolCall);
            const diff = entry.toolResult?.diff;
            const plan = entry.toolResult?.plan;
            if (name === "generate_plan" && plan) {
                return _jsx(PlanView, { plan: plan, t: t });
            }
            if (name === "task" && entry.toolResult?.task) {
                return _jsx(TaskResultView, { t: t, entry: entry });
            }
            if (name === "delegate" && entry.toolResult?.delegation) {
                return _jsx(DelegationResultView, { t: t, entry: entry });
            }
            if (name === "delegation_list") {
                return _jsx(DelegationListView, { t: t, content: entry.content });
            }
            if (name === "delegation_read") {
                return _jsx(ToolTextOutputView, { t: t, label: toolLabel(entry.toolCall), content: entry.content });
            }
            if (name === "lsp") {
                const lspOp = tryParseArg(entry.toolCall, "operation") || "query";
                const lspFile = tryParseArg(entry.toolCall, "filePath") || "";
                const lspLine = tryParseArg(entry.toolCall, "line");
                const lspPos = lspLine ? `:${lspLine}` : "";
                return (_jsxs("box", { gap: 0, marginTop: 1, children: [_jsx(InlineTool, { t: t, pending: false, children: `lsp ${lspOp} ${lspFile}${lspPos}` }), _jsx(LspResultView, { t: t, operation: lspOp, filePath: lspFile, position: lspPos, content: entry.content })] }));
            }
            if ((entry.toolResult?.media?.length ?? 0) > 0) {
                if (name === "generate_image" || name === "generate_video") {
                    return _jsx(MediaAutoOpenView, { t: t, label: toolLabel(entry.toolCall), toolResult: entry.toolResult });
                }
                return _jsx(MediaToolResultView, { t: t, label: toolLabel(entry.toolCall), toolResult: entry.toolResult });
            }
            if (name === "write_file" || name === "edit_file") {
                const filePath = diff?.filePath || tryParseArg(entry.toolCall, "path") || args;
                const label = name === "write_file" ? `Write ${filePath}` : `Edit ${filePath}`;
                return (_jsxs("box", { gap: 0, children: [_jsx(InlineTool, { t: t, pending: false, children: label }), diff && _jsx(DiffView, { t: t, diff: diff }), (entry.toolResult?.lspDiagnostics?.length ?? 0) > 0 && (_jsx(LspDiagnosticsView, { t: t, diagnostics: entry.toolResult?.lspDiagnostics ?? [] }))] }));
            }
            if (name === "bash" && entry.toolResult?.backgroundProcess) {
                const bp = entry.toolResult.backgroundProcess;
                return _jsx(BackgroundProcessLine, { t: t, id: bp.id, pid: bp.pid, command: bp.command });
            }
            if (name === "process_logs") {
                return _jsx(ProcessLogsView, { t: t, content: entry.content });
            }
            if (name === "process_stop" || name === "process_list") {
                return (_jsx(InlineTool, { t: t, pending: false, children: entry.content }));
            }
            if (name === "read_file")
                return (_jsx(InlineTool, { t: t, pending: false, children: `Read ${trunc(tryParseArg(entry.toolCall, "path") || args, 60)}` }));
            if (name === "search_web" || name === "search_x")
                return (_jsxs(InlineTool, { t: t, pending: false, children: [name === "search_web" ? "Web" : "X", ` Search "${trunc(args, 60)}"`] }));
            return (_jsx(InlineTool, { t: t, pending: false, children: trunc(name === "bash" ? args : `${name} ${args}`, 80) }));
        }
        default:
            return _jsx("text", { fg: t.textMuted, children: entry.content });
    }
}
const MAX_DIFF_ROWS = 20;
const LINE_NUM_WIDTH = 4;
function parsePatch(patch) {
    const lines = patch.split("\n");
    const rows = [];
    let oldLine = 0;
    let newLine = 0;
    let prevOldEnd = 0;
    for (const line of lines) {
        const hunkMatch = line.match(/^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
        if (hunkMatch) {
            oldLine = parseInt(hunkMatch[1], 10);
            newLine = parseInt(hunkMatch[2], 10);
            const skipped = oldLine - prevOldEnd - 1;
            if (skipped > 0) {
                rows.push({ kind: "separator", count: skipped });
            }
            continue;
        }
        if (line.startsWith("---") || line.startsWith("+++") || line.startsWith("\\"))
            continue;
        if (line.startsWith("Index:") || line.startsWith("===="))
            continue;
        if (line.startsWith("-")) {
            rows.push({ kind: "removed", oldNum: oldLine, text: line.slice(1) });
            oldLine++;
            prevOldEnd = oldLine - 1;
        }
        else if (line.startsWith("+")) {
            rows.push({ kind: "added", newNum: newLine, text: line.slice(1) });
            newLine++;
        }
        else if (line.length > 0 || (oldLine > 0 && newLine > 0)) {
            const content = line.startsWith(" ") ? line.slice(1) : line;
            rows.push({ kind: "context", oldNum: oldLine, newNum: newLine, text: content });
            oldLine++;
            newLine++;
            prevOldEnd = oldLine - 1;
        }
    }
    return rows;
}
function DiffView({ t, diff }) {
    const rows = parsePatch(diff.patch ?? "");
    if (rows.length === 0)
        return null;
    const truncated = rows.length > MAX_DIFF_ROWS;
    const visible = truncated ? rows.slice(0, MAX_DIFF_ROWS) : rows;
    const pad = (n) => n !== undefined ? String(n).padStart(LINE_NUM_WIDTH) : " ".repeat(LINE_NUM_WIDTH);
    return (_jsx("box", { paddingLeft: 5, marginTop: 0, flexShrink: 0, children: _jsxs("box", { flexDirection: "column", children: [_jsx("box", { backgroundColor: t.diffHeader, paddingLeft: 1, paddingRight: 1, children: _jsxs("text", { children: [_jsx("span", { style: { fg: t.diffHeaderFg }, children: diff.filePath }), _jsx("span", { style: { fg: t.textDim }, children: "  " }), _jsx("span", { style: { fg: t.diffRemovedFg }, children: `-${diff.removals}` }), _jsx("span", { style: { fg: t.textDim }, children: " " }), _jsx("span", { style: { fg: t.diffAddedFg }, children: `+${diff.additions}` })] }) }), visible.map((row, i) => {
                    if (row.kind === "separator") {
                        return (
                        // biome-ignore lint/suspicious/noArrayIndexKey: separator rows lack unique identifiers
                        _jsx("box", { backgroundColor: t.diffSeparator, paddingLeft: 1, children: _jsxs("text", { fg: t.diffSeparatorFg, children: ["⌃  ", row.count, " unmodified lines"] }) }, `sep-${i}`));
                    }
                    if (row.kind === "removed") {
                        return (_jsxs("box", { backgroundColor: t.diffRemoved, flexDirection: "row", children: [_jsx("text", { fg: t.diffRemovedLineNum, children: pad(row.oldNum) }), _jsx("text", { fg: t.diffRemovedFg, children: ` ${row.text}` })] }, `rm-${row.oldNum}`));
                    }
                    if (row.kind === "added") {
                        return (_jsxs("box", { backgroundColor: t.diffAdded, flexDirection: "row", children: [_jsx("text", { fg: t.diffAddedLineNum, children: pad(row.newNum) }), _jsx("text", { fg: t.diffAddedFg, children: ` ${row.text}` })] }, `add-${row.newNum}`));
                    }
                    return (_jsxs("box", { backgroundColor: t.diffContext, flexDirection: "row", children: [_jsx("text", { fg: t.diffLineNumber, children: pad(row.oldNum) }), _jsx("text", { fg: t.diffContextFg, children: ` ${row.text}` })] }, `ctx-${row.oldNum}`));
                }), truncated && (_jsx("box", { backgroundColor: t.diffSeparator, paddingLeft: 1, children: _jsxs("text", { fg: t.diffSeparatorFg, children: ["⌃  ", rows.length - MAX_DIFF_ROWS, " more lines"] }) }))] }) }));
}
const MAX_LSP_RESULT_LINES = 10;
function LspResultView({ t, operation, filePath, position, content, }) {
    const body = content.trim();
    const lines = body.split("\n");
    const truncated = lines.length > MAX_LSP_RESULT_LINES;
    const visible = truncated ? lines.slice(0, MAX_LSP_RESULT_LINES).join("\n") : body;
    const label = `${operation} ${filePath}${position}`;
    return (_jsx("box", { paddingLeft: 5, marginTop: 0, flexShrink: 0, children: _jsxs("box", { flexDirection: "column", children: [_jsx("box", { backgroundColor: t.diffHeader, paddingLeft: 1, paddingRight: 1, children: _jsxs("text", { children: [_jsx("span", { style: { fg: t.primary }, children: "lsp" }), _jsx("span", { style: { fg: t.textDim }, children: " · " }), _jsx("span", { style: { fg: t.diffHeaderFg }, children: label })] }) }), _jsx("box", { backgroundColor: t.mdCodeBlockBg, paddingLeft: 1, paddingRight: 1, children: _jsx("text", { fg: t.mdCodeBlockFg, children: visible }) }), truncated && (_jsx("box", { backgroundColor: t.diffSeparator, paddingLeft: 1, children: _jsxs("text", { fg: t.diffSeparatorFg, children: ["⌃  ", lines.length - MAX_LSP_RESULT_LINES, " more lines"] }) }))] }) }));
}
function LspDiagnosticsView({ t, diagnostics }) {
    const files = diagnostics.slice(0, 3);
    return (_jsx("box", { paddingLeft: 5, marginTop: 1, children: _jsxs("box", { flexDirection: "column", children: [_jsx("box", { children: _jsx("text", { fg: t.textMuted, children: "LSP diagnostics" }) }), files.map((entry) => (_jsxs("box", { flexDirection: "column", children: [_jsx("text", { fg: t.textDim, children: `${entry.serverId} • ${entry.filePath}` }), entry.diagnostics.slice(0, 5).map((diagnostic, index) => (_jsx("text", { fg: diagnostic.severity === 1 ? t.diffRemovedFg : diagnostic.severity === 2 ? t.primary : t.textMuted, children: `${formatLspSeverity(diagnostic.severity)} ${diagnostic.range.start.line + 1}:${diagnostic.range.start.character + 1} ${diagnostic.message}` }, `${entry.serverId}:${entry.filePath}:${index}`)))] }, `${entry.serverId}:${entry.filePath}`)))] }) }));
}
function formatLspSeverity(severity) {
    switch (severity) {
        case 1:
            return "error";
        case 2:
            return "warning";
        case 3:
            return "info";
        case 4:
            return "hint";
        default:
            return "issue";
    }
}
const SHIMMER_MESSAGES = [
    "Planning next moves",
    "Reasoning through options",
    "Thinking deeply",
    "Synthesizing context",
    "Crafting response",
    "Analyzing patterns",
    "Grokking the problem",
];
function ShimmerText({ t, text }) {
    const startRef = useRef(Date.now());
    const [tick, setTick] = useState(0);
    const [elapsed, setElapsed] = useState(0);
    useEffect(() => {
        const id = setInterval(() => {
            setTick((n) => n + 1);
            setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
        }, 1100);
        return () => clearInterval(id);
    }, []);
    const allMessages = [text, ...SHIMMER_MESSAGES.filter((m) => m !== text)];
    const displayText = allMessages[tick % allMessages.length] ?? text;
    return (_jsx("box", { paddingLeft: 3, children: _jsxs("text", { children: [_jsx("span", { style: { fg: t.accent }, children: _jsx(LoadingSpinner, {}) }), _jsxs("span", { style: { fg: t.textMuted }, children: [" ", displayText] }), elapsed >= 2 ? _jsx("span", { style: { fg: t.textDim }, children: ` ${elapsed}s` }) : null] }) }));
}
function InlineTool({ t, pending, children }) {
    return (_jsx("box", { paddingLeft: 3, children: _jsxs("text", { fg: pending ? t.accent : t.textMuted, children: [pending ? _jsx(ToolSpinner, {}) : "→", " ", children] }) }));
}
function SubagentTaskLine({ t, agent, label, pending }) {
    const displayLabel = compactTaskLabel(label);
    const displayAgent = formatSubagentName(agent);
    return (_jsx("box", { paddingLeft: 3, children: _jsxs("text", { children: [pending ? (_jsx("span", { style: { fg: t.subagentAccent }, children: _jsx(SubagentSpinner, {}) })) : null, pending ? " " : "", _jsx("span", { style: { fg: t.subagentAccent }, children: _jsx("b", { children: `${displayAgent}: ${displayLabel}` }) })] }) }));
}
function DelegationTaskLine({ t, label, pending, id }) {
    const displayLabel = compactTaskLabel(label);
    return (_jsx("box", { paddingLeft: 3, children: _jsxs("text", { children: [pending ? (_jsx("span", { style: { fg: t.subagentAccent }, children: _jsx(SubagentSpinner, {}) })) : (_jsx("span", { style: { fg: t.subagentAccent }, children: "◆" })), " ", _jsx("span", { style: { fg: t.subagentAccent }, children: _jsx("b", { children: "Background" }) }), _jsxs("span", { style: { fg: t.textMuted }, children: [" — ", displayLabel] }), id ? _jsx("span", { style: { fg: t.textDim }, children: `  (${id})` }) : null] }) }));
}
function LoadingSpinner() {
    const [frame, setFrame] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setFrame((n) => (n + 1) % LOADING_SPINNER_FRAMES.length), 80);
        return () => clearInterval(id);
    }, []);
    return _jsx(_Fragment, { children: LOADING_SPINNER_FRAMES[frame] });
}
function ToolSpinner() {
    const [frame, setFrame] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setFrame((n) => (n + 1) % TOOL_SPINNER_FRAMES.length), 100);
        return () => clearInterval(id);
    }, []);
    return _jsx(_Fragment, { children: TOOL_SPINNER_FRAMES[frame] });
}
function SubagentSpinner() {
    const [frame, setFrame] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setFrame((n) => (n + 1) % SUBAGENT_SPINNER_FRAMES.length), 70);
        return () => clearInterval(id);
    }, []);
    return _jsx(_Fragment, { children: SUBAGENT_SPINNER_FRAMES[frame] });
}
function StreamCursor({ t }) {
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        const id = setInterval(() => setVisible((v) => !v), 530);
        return () => clearInterval(id);
    }, []);
    return _jsx("span", { style: { fg: t.accent }, children: visible ? "▋" : " " });
}
function SubagentActivity({ t, status }) {
    return (_jsx("box", { paddingLeft: 5, children: _jsxs("text", { fg: t.textMuted, children: ["→ ", truncateLine(status.detail, 100)] }) }));
}
function TaskResultView({ t, entry }) {
    const task = entry.toolResult?.task;
    if (!task)
        return null;
    return (_jsxs("box", { gap: 0, children: [_jsx(SubagentTaskLine, { t: t, agent: task.agent, label: task.description, pending: false }), _jsx("box", { paddingLeft: 5, children: _jsxs("text", { fg: t.text, children: [formatSubagentName(task.agent), ": ", truncateLine(task.summary, 90)] }) })] }));
}
function DelegationResultView({ t, entry }) {
    const delegation = entry.toolResult?.delegation;
    if (!delegation)
        return null;
    return _jsx(DelegationTaskLine, { t: t, label: delegation.description, pending: false, id: delegation.id });
}
function DelegationListView({ t, content }) {
    const items = parseDelegationList(content);
    if (items.length === 0) {
        return (_jsx(InlineTool, { t: t, pending: false, children: "No background delegations" }));
    }
    return (_jsx("box", { paddingLeft: 3, gap: 0, children: items.map((item) => {
            const statusColor = item.status === "complete"
                ? "#8adf8a"
                : item.status === "running"
                    ? t.subagentAccent
                    : item.status === "error"
                        ? "#df8a8a"
                        : t.textMuted;
            return (_jsx("box", { children: _jsxs("text", { children: [_jsx("span", { style: { fg: statusColor }, children: "◆ " }), _jsx("span", { style: { fg: t.text }, children: item.id }), _jsx("span", { style: { fg: statusColor }, children: ` ${item.status}` }), _jsxs("span", { style: { fg: t.textMuted }, children: [" — ", truncateLine(item.label, 60)] })] }) }, item.id));
        }) }));
}
function parseDelegationList(content) {
    const items = [];
    for (const line of content.split("\n")) {
        const match = line.match(/`([^`]+)`\s+\[(\w+)]\s+(.*)/);
        if (match) {
            items.push({ id: match[1], status: match[2], label: match[3].trim() });
        }
    }
    return items;
}
function BackgroundProcessLine({ t, id, pid, command }) {
    return (_jsx("box", { paddingLeft: 3, children: _jsxs("text", { children: [_jsx("span", { style: { fg: t.subagentAccent }, children: "◆ " }), _jsx("span", { style: { fg: t.subagentAccent }, children: _jsx("b", { children: "Background process" }) }), _jsx("span", { style: { fg: t.textMuted }, children: ` id:${id} pid:${pid}` }), _jsxs("span", { style: { fg: t.textDim }, children: [" — ", truncateLine(command, 60)] })] }) }));
}
function formatScheduleDetails(schedule, daemonStatus) {
    const daemonText = daemonStatus.running
        ? `running${daemonStatus.pid ? ` (pid ${daemonStatus.pid})` : ""}`
        : "not running";
    return [
        `Schedule: ${schedule.name}`,
        `ID: ${schedule.id}`,
        `Type: ${schedule.cron ? "recurring" : "one-time"}`,
        `Cron: ${schedule.cron ?? "runs once immediately"}`,
        `Enabled: ${schedule.enabled ? "yes" : "no"}`,
        `Model: ${schedule.model}`,
        `Directory: ${schedule.directory}`,
        `Last run: ${schedule.lastRunAt ?? "never"}`,
        `Daemon: ${daemonText}`,
        "",
        "Instruction:",
        schedule.instruction,
    ].join("\n");
}
function ProcessLogsView({ t, content }) {
    const lines = content.split("\n");
    const header = lines[0] || "";
    const body = lines.slice(1).join("\n").trim();
    return (_jsxs("box", { paddingLeft: 3, gap: 0, children: [_jsxs("text", { fg: t.textMuted, children: ["→ ", header] }), body ? (_jsx("box", { paddingLeft: 2, marginTop: 0, children: _jsx("box", { backgroundColor: t.mdCodeBlockBg, paddingLeft: 1, paddingRight: 1, children: _jsx("text", { fg: t.mdCodeBlockFg, children: truncateBlock(body, 15) }) }) })) : null] }));
}
function truncateBlock(text, maxLines) {
    const lines = text.split("\n");
    if (lines.length <= maxLines)
        return text;
    return [...lines.slice(0, maxLines), `… ${lines.length - maxLines} more lines`].join("\n");
}
function ToolTextOutputView({ t, label, content }) {
    return (_jsxs("box", { gap: 0, children: [_jsx(InlineTool, { t: t, pending: false, children: label }), _jsx("box", { paddingLeft: 5, marginTop: 1, flexShrink: 0, children: _jsx(Markdown, { content: content, t: t }) })] }));
}
function openMediaFile(filePath) {
    try {
        const cmd = process.platform === "darwin" ? "open" : "xdg-open";
        require("child_process").execFile(cmd, [filePath]);
    }
    catch { }
}
function MediaAutoOpenView({ t, label, toolResult }) {
    const media = toolResult.media ?? [];
    const openedRef = useRef(new Set());
    useEffect(() => {
        for (const asset of media) {
            if (!openedRef.current.has(asset.path)) {
                openedRef.current.add(asset.path);
                openMediaFile(asset.path);
            }
        }
    }, [media]);
    return (_jsx("box", { gap: 0, children: _jsx(InlineTool, { t: t, pending: false, children: label }) }));
}
function MediaToolResultView({ t, label, toolResult }) {
    const media = toolResult.media ?? [];
    return (_jsxs("box", { gap: 0, children: [_jsx(InlineTool, { t: t, pending: false, children: label }), toolResult.output ? (_jsx("box", { paddingLeft: 5, marginTop: 1, flexShrink: 0, children: _jsx(Markdown, { content: toolResult.output, t: t }) })) : null, media.length > 0 ? (_jsx("box", { paddingLeft: 5, marginTop: toolResult.output ? 1 : 0, flexDirection: "column", children: media.map((asset) => (_jsxs("box", { flexDirection: "column", children: [_jsx("text", { fg: t.text, children: asset.path }), asset.url ? _jsx("text", { fg: t.textMuted, children: `url: ${asset.url}` }) : null, asset.sourcePath ? _jsx("text", { fg: t.textMuted, children: `source: ${asset.sourcePath}` }) : null, asset.sourceUrl ? _jsx("text", { fg: t.textMuted, children: `source_url: ${asset.sourceUrl}` }) : null] }, `${asset.path}-${asset.url ?? ""}-${asset.sourcePath ?? ""}-${asset.sourceUrl ?? ""}`))) })) : null] }));
}
/* ── Slash Menu ──────────────────────────────────────────────── */
function bottomAlignedModalTop(height, panelHeight) {
    return Math.max(2, Math.floor((height - panelHeight) / 2));
}
/* ── Update Modal ────────────────────────────────────────────── */
function UpdateModal({ t, width, height, currentVersion, latestVersion, }) {
    const overlayBg = "#000000cc";
    const panelWidth = Math.min(60, width - 6);
    const panelHeight = 9;
    const top = bottomAlignedModalTop(height, panelHeight);
    return (_jsx("box", { position: "absolute", left: 0, top: 0, width: width, height: height, alignItems: "center", paddingTop: top, backgroundColor: overlayBg, children: _jsxs("box", { width: panelWidth, height: panelHeight, backgroundColor: t.backgroundPanel, paddingTop: 1, paddingBottom: 1, flexDirection: "column", children: [_jsxs("box", { flexShrink: 0, flexDirection: "row", justifyContent: "space-between", paddingLeft: 2, paddingRight: 2, children: [_jsx("text", { fg: "#f59e0b", children: _jsx("b", { children: "Update Available" }) }), _jsx("text", { fg: t.textMuted, children: "esc to dismiss" })] }), _jsx("box", { flexShrink: 0, paddingLeft: 2, paddingRight: 2, paddingTop: 1, children: _jsxs("text", { fg: t.text, children: ["A new version of grok is available: ", _jsxs("span", { style: { fg: t.textMuted }, children: ["v", currentVersion] }), " → ", _jsxs("span", { style: { fg: "#22c55e" }, children: ["v", latestVersion] })] }) }), _jsx("box", { flexShrink: 0, paddingLeft: 2, paddingRight: 2, paddingTop: 1, children: _jsx("text", { fg: t.textMuted, children: "Press enter to update now, or esc to dismiss" }) })] }) }));
}
function SlashMenuModal({ t, selectedIndex, width, height, searchQuery, filteredItems, }) {
    const listRef = useRef(null);
    useEffect(() => {
        const item = filteredItems[selectedIndex];
        if (item)
            listRef.current?.scrollChildIntoView(`slash-${item.id}`);
    }, [selectedIndex, filteredItems]);
    const itemCount = Math.max(filteredItems.length, 1);
    const contentHeight = itemCount + 5;
    const maxH = Math.floor(height * 0.6);
    const panelHeight = Math.min(contentHeight, maxH);
    const top = bottomAlignedModalTop(height, panelHeight);
    const overlayBg = "#000000cc";
    return (_jsx("box", { position: "absolute", left: 0, top: 0, width: width, height: height, alignItems: "center", paddingTop: top, backgroundColor: overlayBg, children: _jsxs("box", { width: Math.min(50, width - 6), height: panelHeight, backgroundColor: t.backgroundPanel, paddingTop: 1, paddingBottom: 1, flexDirection: "column", children: [_jsxs("box", { flexShrink: 0, flexDirection: "row", justifyContent: "space-between", paddingLeft: 2, paddingRight: 2, children: [_jsx("text", { fg: t.primary, children: _jsx("b", { children: "Commands" }) }), _jsx("text", { fg: t.textMuted, children: "esc" })] }), _jsx("box", { flexShrink: 0, paddingLeft: 2, paddingRight: 2, paddingTop: 1, paddingBottom: 1, children: _jsx("text", { fg: t.text, children: searchQuery || _jsx("span", { style: { fg: t.textMuted }, children: "Search..." }) }) }), _jsxs("scrollbox", { ref: listRef, flexGrow: 1, minHeight: 0, children: [filteredItems.map((item, idx) => (_jsx("box", { id: `slash-${item.id}`, backgroundColor: idx === selectedIndex ? t.selectedBg : undefined, paddingLeft: 2, paddingRight: 2, children: _jsxs("box", { flexDirection: "row", justifyContent: "space-between", children: [_jsxs("text", { fg: idx === selectedIndex ? t.selected : t.text, children: ["/", item.label] }), _jsx("text", { fg: t.textMuted, children: item.description })] }) }, item.id))), filteredItems.length === 0 && (_jsx("box", { paddingLeft: 2, children: _jsx("text", { fg: t.textMuted, children: "No commands match your search" }) }))] })] }) }));
}
function ConnectModal({ t, width, height, selectedIndex, channels, }) {
    const listRef = useRef(null);
    useEffect(() => {
        const ch = channels[selectedIndex];
        if (ch)
            listRef.current?.scrollChildIntoView(`connect-${ch.id}`);
    }, [selectedIndex, channels]);
    const panelHeight = Math.min(channels.length + 9, Math.floor(height * 0.5));
    const top = bottomAlignedModalTop(height, panelHeight);
    const overlayBg = "#000000cc";
    return (_jsx("box", { position: "absolute", left: 0, top: 0, width: width, height: height, alignItems: "center", paddingTop: top, backgroundColor: overlayBg, children: _jsxs("box", { width: Math.min(56, width - 6), height: panelHeight, backgroundColor: t.backgroundPanel, paddingTop: 1, paddingBottom: 1, flexDirection: "column", children: [_jsxs("box", { flexShrink: 0, flexDirection: "row", justifyContent: "space-between", paddingLeft: 2, paddingRight: 2, children: [_jsx("text", { fg: t.primary, children: _jsx("b", { children: "Connect" }) }), _jsx("text", { fg: t.textMuted, children: "esc" })] }), _jsx("box", { flexShrink: 0, paddingLeft: 2, paddingRight: 2, paddingTop: 1, paddingBottom: 1, children: _jsx("text", { fg: t.textMuted, children: "Choose a channel" }) }), _jsx("scrollbox", { ref: listRef, flexGrow: 1, minHeight: 0, children: channels.map((ch, idx) => (_jsx("box", { id: `connect-${ch.id}`, backgroundColor: idx === selectedIndex ? t.selectedBg : undefined, paddingLeft: 2, paddingRight: 2, children: _jsxs("box", { flexDirection: "row", justifyContent: "space-between", children: [_jsx("text", { fg: idx === selectedIndex ? t.selected : t.text, children: ch.label }), _jsx("text", { fg: t.textMuted, children: ch.description })] }) }, ch.id))) }), _jsx("box", { flexShrink: 0, paddingLeft: 2, paddingRight: 2, paddingTop: 2, paddingBottom: 1, children: _jsxs("text", { children: [_jsx("span", { style: { fg: t.primary }, children: "enter " }), _jsx("span", { style: { fg: t.textMuted }, children: "select  ·  " }), _jsx("span", { style: { fg: t.primary }, children: "↑↓ " }), _jsx("span", { style: { fg: t.textMuted }, children: "navigate  ·  " }), _jsx("span", { style: { fg: t.primary }, children: "esc " }), _jsx("span", { style: { fg: t.textMuted }, children: "close" })] }) })] }) }));
}
function TelegramTokenModal({ t, width, height, inputRef, error, onSubmit, }) {
    const overlayBg = "#000000cc";
    const panelWidth = Math.min(68, width - 6);
    const panelHeight = 14;
    const top = bottomAlignedModalTop(height, panelHeight);
    return (_jsx("box", { position: "absolute", left: 0, top: 0, width: width, height: height, alignItems: "center", paddingTop: top, backgroundColor: overlayBg, children: _jsxs("box", { width: panelWidth, height: panelHeight, backgroundColor: t.backgroundPanel, paddingTop: 1, paddingBottom: 1, flexDirection: "column", children: [_jsxs("box", { flexShrink: 0, flexDirection: "row", justifyContent: "space-between", paddingLeft: 2, paddingRight: 2, children: [_jsx("text", { fg: t.primary, children: _jsx("b", { children: "Telegram bot token" }) }), _jsx("text", { fg: t.textMuted, children: "esc" })] }), _jsx("box", { paddingLeft: 2, paddingRight: 2, paddingTop: 1, children: _jsx("text", { fg: t.text, children: "From @BotFather: /newbot, then paste the token here. Stored in ~/.grok/user-settings.json." }) }), _jsx("box", { paddingLeft: 2, paddingRight: 2, paddingTop: 1, children: _jsx("box", { backgroundColor: t.backgroundElement, paddingLeft: 1, paddingRight: 1, width: "100%", children: _jsx("textarea", { ref: inputRef, focused: true, placeholder: "123456:ABC...", textColor: t.text, backgroundColor: t.backgroundElement, placeholderColor: t.textMuted, minHeight: 1, maxHeight: 3, wrapMode: "word", keyBindings: TEXTAREA_KEYBINDINGS, onSubmit: onSubmit }) }) }), _jsx("box", { flexGrow: 1, minHeight: 0 }), _jsx("box", { paddingLeft: 2, paddingRight: 2, paddingTop: 2, paddingBottom: 1, children: error ? (_jsx("text", { fg: t.diffRemovedFg, children: error })) : (_jsxs("text", { children: [_jsx("span", { style: { fg: t.primary }, children: "enter " }), _jsx("span", { style: { fg: t.textMuted }, children: "save token  ·  " }), _jsx("span", { style: { fg: t.primary }, children: "esc " }), _jsx("span", { style: { fg: t.textMuted }, children: "close" })] })) })] }) }));
}
function TelegramPairModal({ t, width, height, inputRef, error, onSubmit, }) {
    const overlayBg = "#000000cc";
    const panelWidth = Math.min(68, width - 6);
    const panelHeight = 13;
    const top = bottomAlignedModalTop(height, panelHeight);
    return (_jsx("box", { position: "absolute", left: 0, top: 0, width: width, height: height, alignItems: "center", paddingTop: top, backgroundColor: overlayBg, children: _jsxs("box", { width: panelWidth, height: panelHeight, backgroundColor: t.backgroundPanel, paddingTop: 1, paddingBottom: 1, flexDirection: "column", children: [_jsxs("box", { flexShrink: 0, flexDirection: "row", justifyContent: "space-between", paddingLeft: 2, paddingRight: 2, children: [_jsx("text", { fg: t.primary, children: _jsx("b", { children: "Pairing code" }) }), _jsx("text", { fg: t.textMuted, children: "esc" })] }), _jsx("box", { paddingLeft: 2, paddingRight: 2, paddingTop: 1, children: _jsx("text", { fg: t.text, children: "DM your bot with /pair, then paste the 6-character code." }) }), _jsx("box", { paddingLeft: 2, paddingRight: 2, paddingTop: 1, children: _jsx("box", { backgroundColor: t.backgroundElement, paddingLeft: 1, paddingRight: 1, width: "100%", children: _jsx("textarea", { ref: inputRef, focused: true, placeholder: "ABC123", textColor: t.text, backgroundColor: t.backgroundElement, placeholderColor: t.textMuted, minHeight: 1, maxHeight: 2, wrapMode: "word", keyBindings: TEXTAREA_KEYBINDINGS, onSubmit: onSubmit }) }) }), _jsx("box", { flexGrow: 1, minHeight: 0 }), _jsx("box", { paddingLeft: 2, paddingRight: 2, paddingTop: 2, paddingBottom: 1, children: error ? (_jsx("text", { fg: t.diffRemovedFg, children: error })) : (_jsxs("text", { children: [_jsx("span", { style: { fg: t.primary }, children: "enter " }), _jsx("span", { style: { fg: t.textMuted }, children: "approve pairing  ·  " }), _jsx("span", { style: { fg: t.primary }, children: "esc " }), _jsx("span", { style: { fg: t.textMuted }, children: "close" })] })) })] }) }));
}
/* ── Model Picker ────────────────────────────────────────────── */
function ModelPickerModal({ t, currentModel, selectedIndex, width, height, searchQuery, filteredModels, reasoningEffortByModel, }) {
    const listRef = useRef(null);
    useEffect(() => {
        const m = filteredModels[selectedIndex];
        if (m)
            listRef.current?.scrollChildIntoView(`model-${m.id}`);
    }, [selectedIndex, filteredModels]);
    const itemCount = Math.max(filteredModels.length, 1);
    const selectedModel = filteredModels[selectedIndex];
    const selectedSupportsReasoning = !!selectedModel && getSupportedReasoningEfforts(selectedModel.id).length > 0;
    const contentHeight = itemCount + 6;
    const maxH = Math.floor(height * 0.6);
    const panelHeight = Math.min(contentHeight, maxH);
    const top = bottomAlignedModalTop(height, panelHeight);
    const overlayBg = "#000000cc";
    return (_jsx("box", { position: "absolute", left: 0, top: 0, width: width, height: height, alignItems: "center", paddingTop: top, backgroundColor: overlayBg, children: _jsxs("box", { width: Math.min(60, width - 6), height: panelHeight, backgroundColor: t.backgroundPanel, paddingTop: 1, paddingBottom: 1, flexDirection: "column", children: [_jsxs("box", { flexShrink: 0, flexDirection: "row", justifyContent: "space-between", paddingLeft: 2, paddingRight: 2, children: [_jsx("text", { fg: t.primary, children: _jsx("b", { children: "Select model" }) }), _jsx("text", { fg: t.textMuted, children: "esc" })] }), _jsx("box", { flexShrink: 0, paddingLeft: 2, paddingRight: 2, paddingTop: 1, paddingBottom: 1, children: _jsx("text", { fg: t.text, children: searchQuery || _jsx("span", { style: { fg: t.textMuted }, children: "Search..." }) }) }), _jsxs("scrollbox", { ref: listRef, flexGrow: 1, minHeight: 0, children: [filteredModels.map((m, idx) => {
                            const selected = idx === selectedIndex;
                            const current = m.id === currentModel;
                            const supportedReasoningEfforts = getSupportedReasoningEfforts(m.id);
                            const reasoningEffort = getEffectiveReasoningEffort(m.id, reasoningEffortByModel[normalizeModelId(m.id)]) ?? "auto";
                            return (_jsx("box", { id: `model-${m.id}`, backgroundColor: selected ? t.selectedBg : undefined, paddingLeft: 2, paddingRight: 2, width: "100%", children: _jsxs("box", { width: "100%", flexDirection: "row", justifyContent: "space-between", children: [_jsx("text", { fg: current ? t.accent : selected ? t.selected : t.text, children: m.name }), supportedReasoningEfforts.length > 0 ? (_jsx("text", { fg: selected ? t.primary : t.textMuted, children: `[${reasoningEffort}]` })) : null] }) }, m.id));
                        }), filteredModels.length === 0 && (_jsx("box", { paddingLeft: 2, children: _jsx("text", { fg: t.textMuted, children: "No models match your search" }) }))] }), _jsx("box", { flexShrink: 0, paddingLeft: 2, paddingRight: 2, paddingTop: 1, children: _jsx("text", { fg: t.textMuted, children: selectedSupportsReasoning ? "left/right reasoning  enter select  esc close" : "enter select  esc close" }) })] }) }));
}
function SandboxPickerModal({ t, currentMode, settings, focusIndex, editing, editBuffer, width, height, }) {
    const visibleRows = getSandboxVisibleRows(currentMode);
    const panelHeight = Math.min(visibleRows.length + 6, Math.floor(height * 0.6));
    const top = bottomAlignedModalTop(height, panelHeight);
    const overlayBg = "#000000cc";
    return (_jsx("box", { position: "absolute", left: 0, top: 0, width: width, height: height, alignItems: "center", paddingTop: top, backgroundColor: overlayBg, children: _jsxs("box", { width: Math.min(64, width - 6), height: panelHeight, backgroundColor: t.backgroundPanel, paddingTop: 1, paddingBottom: 1, flexDirection: "column", children: [_jsxs("box", { flexShrink: 0, flexDirection: "row", justifyContent: "space-between", paddingLeft: 2, paddingRight: 2, children: [_jsx("text", { fg: t.primary, children: _jsx("b", { children: "Sandbox settings" }) }), _jsx("text", { fg: t.textMuted, children: "esc" })] }), _jsx("scrollbox", { flexGrow: 1, minHeight: 0, children: visibleRows.map((row, idx) => {
                        const focused = idx === focusIndex;
                        const isEditing = editing === row.key;
                        const display = row.getDisplay(currentMode, settings);
                        return (_jsx("box", { backgroundColor: focused ? t.selectedBg : undefined, paddingLeft: 2, paddingRight: 2, width: "100%", children: _jsxs("box", { width: "100%", flexDirection: "row", justifyContent: "space-between", children: [_jsx("text", { fg: focused ? t.selected : t.text, children: row.label }), isEditing ? (_jsxs("text", { fg: t.accent, children: [editBuffer || row.placeholder || "", "_"] })) : row.type === "toggle" ? (_jsxs("text", { fg: focused ? t.primary : t.textMuted, children: ["< ", display, " >"] })) : (_jsx("text", { fg: focused ? t.primary : t.textMuted, children: display }))] }) }, row.key));
                    }) }), _jsx("box", { flexShrink: 0, paddingLeft: 2, paddingRight: 2, paddingTop: 1, children: _jsx("text", { fg: t.textMuted, children: editing
                            ? "type value  enter confirm  esc cancel"
                            : "arrows navigate  left/right toggle  enter edit  esc close" }) })] }) }));
}
function RecapPickerModal({ t, enabled, width, height, }) {
    const panelHeight = Math.min(7, Math.floor(height * 0.6));
    const top = bottomAlignedModalTop(height, panelHeight);
    const overlayBg = "#000000cc";
    const display = formatRecapsEnabled(enabled);
    return (_jsx("box", { position: "absolute", left: 0, top: 0, width: width, height: height, alignItems: "center", paddingTop: top, backgroundColor: overlayBg, children: _jsxs("box", { width: Math.min(64, width - 6), height: panelHeight, backgroundColor: t.backgroundPanel, paddingTop: 1, paddingBottom: 1, flexDirection: "column", children: [_jsxs("box", { flexShrink: 0, flexDirection: "row", justifyContent: "space-between", paddingLeft: 2, paddingRight: 2, children: [_jsx("text", { fg: t.primary, children: _jsx("b", { children: "Recap settings" }) }), _jsx("text", { fg: t.textMuted, children: "esc" })] }), _jsx("box", { flexGrow: 1, minHeight: 0, children: _jsx("box", { backgroundColor: t.selectedBg, paddingLeft: 2, paddingRight: 2, width: "100%", children: _jsxs("box", { width: "100%", flexDirection: "row", justifyContent: "space-between", children: [_jsx("text", { fg: t.selected, children: "Recaps" }), _jsxs("text", { fg: t.primary, children: ["< ", display, " >"] })] }) }) }), _jsx("box", { flexShrink: 0, paddingLeft: 2, paddingRight: 2, paddingTop: 1, children: _jsx("text", { fg: t.textMuted, children: "left/right toggle  enter cycle  esc close" }) })] }) }));
}
function PaymentApprovalPanel({ t, payment, }) {
    const options = ["Approve payment", "Reject"];
    return (_jsxs("box", { flexDirection: "column", border: ["left"], customBorderChars: {
            topLeft: "",
            bottomLeft: "",
            vertical: "┃",
            topRight: "",
            bottomRight: "",
            horizontal: " ",
            bottomT: "",
            topT: "",
            cross: "",
            leftT: "",
            rightT: "",
        }, borderColor: "#e5c07b", marginTop: 1, paddingLeft: 2, paddingRight: 2, paddingTop: 1, paddingBottom: 1, backgroundColor: t.backgroundPanel, children: [_jsx("text", { children: _jsx("span", { style: { fg: t.planTitle ?? t.primary }, children: _jsx("b", { children: "Payment required" }) }) }), _jsxs("box", { marginTop: 1, flexDirection: "column", children: [_jsx("text", { children: _jsx("span", { style: { fg: t.text }, children: payment.url }) }), payment.description ? (_jsx("text", { children: _jsx("span", { style: { fg: t.textMuted }, children: payment.description }) })) : null, payment.security ? (_jsxs("text", { children: [_jsx("span", { style: { fg: t.textMuted }, children: "Security: " }), _jsx("span", { style: { fg: "#60a5fa" }, children: payment.securityLabel })] })) : null, _jsxs("text", { children: [_jsx("span", { style: { fg: t.textMuted }, children: "Price: " }), _jsx("span", { style: { fg: "#22c55e" }, children: _jsx("b", { children: `${payment.amount} USDC` }) }), _jsx("span", { style: { fg: t.textMuted }, children: ` on ${payment.network}` })] })] }), _jsx("box", { marginTop: 1, flexDirection: "column", children: options.map((label, i) => {
                    const isSel = i === payment.selected;
                    return (_jsxs("text", { children: [_jsx("span", { style: { fg: isSel ? "#22c55e" : t.textMuted }, children: isSel ? "> " : "  " }), _jsx("span", { style: { fg: isSel ? t.text : t.textMuted }, children: isSel ? _jsx("b", { children: label }) : label })] }, label));
                }) }), _jsxs("box", { flexDirection: "row", gap: 3, marginTop: 1, flexShrink: 0, children: [_jsxs("text", { children: [_jsx("span", { style: { fg: t.text }, children: "↑↓" }), _jsx("span", { style: { fg: t.textMuted }, children: " select" })] }), _jsxs("text", { children: [_jsx("span", { style: { fg: t.text }, children: "enter" }), _jsx("span", { style: { fg: t.textMuted }, children: " confirm" })] }), _jsxs("text", { children: [_jsx("span", { style: { fg: t.text }, children: "esc" }), _jsx("span", { style: { fg: t.textMuted }, children: " reject" })] })] })] }));
}
function WalletPickerModal({ t, settings, walletInfo, focusIndex, width, height, }) {
    const panelHeight = Math.min(WALLET_ROWS.length + 6, Math.floor(height * 0.6));
    const top = bottomAlignedModalTop(height, panelHeight);
    const overlayBg = "#000000cc";
    return (_jsx("box", { position: "absolute", left: 0, top: 0, width: width, height: height, alignItems: "center", paddingTop: top, backgroundColor: overlayBg, children: _jsxs("box", { width: Math.min(64, width - 6), height: panelHeight, backgroundColor: t.backgroundPanel, paddingTop: 1, paddingBottom: 1, flexDirection: "column", children: [_jsxs("box", { flexShrink: 0, flexDirection: "row", justifyContent: "space-between", paddingLeft: 2, paddingRight: 2, children: [_jsx("text", { fg: t.primary, children: _jsx("b", { children: "Wallet & Payments" }) }), _jsx("text", { fg: t.textMuted, children: "esc" })] }), _jsx("scrollbox", { flexGrow: 1, minHeight: 0, children: WALLET_ROWS.map((row, idx) => {
                        const focused = idx === focusIndex;
                        const display = row.getDisplay(settings, walletInfo);
                        return (_jsx("box", { backgroundColor: focused ? t.selectedBg : undefined, paddingLeft: 2, paddingRight: 2, width: "100%", children: _jsxs("box", { width: "100%", flexDirection: "row", justifyContent: "space-between", children: [_jsx("text", { fg: focused ? t.selected : t.text, children: row.label }), row.type === "toggle" ? (_jsxs("text", { fg: focused ? t.primary : t.textMuted, children: ["< ", display, " >"] })) : (_jsx("text", { fg: focused ? t.primary : t.textMuted, children: display }))] }) }, row.key));
                    }) }), _jsx("box", { flexShrink: 0, paddingLeft: 2, paddingRight: 2, paddingTop: 1, children: _jsx("text", { fg: t.textMuted, children: "arrows navigate  left/right toggle  esc close" }) })] }) }));
}
/* ── Helpers ──────────────────────────────────────────────────── */
function isEscapeKey(key) {
    return (key.name === "escape" ||
        key.code === "Escape" ||
        key.baseCode === 27 ||
        key.sequence === "\u001b" ||
        key.raw === "\u001b");
}
function toolArgs(tc) {
    if (!tc)
        return "";
    try {
        const a = JSON.parse(tc.function.arguments);
        if (tc.function.name === "bash")
            return a.command || "";
        if (tc.function.name === "read_file" || tc.function.name === "write_file" || tc.function.name === "edit_file")
            return a.path || "";
        if (tc.function.name === "generate_image" || tc.function.name === "generate_video")
            return a.prompt || "";
        if (tc.function.name === "task")
            return a.description || "";
        if (tc.function.name === "lsp")
            return `${a.operation || "query"} ${a.filePath || ""}`.trim();
        if (tc.function.name === "delegate")
            return a.description || "";
        if (tc.function.name === "delegation_read")
            return a.id || "";
        if (tc.function.name === "process_logs" || tc.function.name === "process_stop")
            return a.id != null ? String(a.id) : "";
        return a.query || "";
    }
    catch {
        return "";
    }
}
function tryParseArg(tc, key) {
    if (!tc)
        return "";
    try {
        return JSON.parse(tc.function.arguments)[key] || "";
    }
    catch {
        return "";
    }
}
function toolLabel(tc) {
    const args = toolArgs(tc);
    if (tc.function.name === "bash") {
        try {
            const parsed = JSON.parse(tc.function.arguments);
            if (parsed.background)
                return `Background: ${trunc(args || "Starting process...", 70)}`;
        }
        catch {
            /* */
        }
        return trunc(args || "Running command...", 80);
    }
    if (tc.function.name === "read_file")
        return `Read ${trunc(args, 60)}`;
    if (tc.function.name === "write_file")
        return `Write ${trunc(args, 60)}`;
    if (tc.function.name === "edit_file")
        return `Edit ${trunc(args, 60)}`;
    if (tc.function.name === "search_web")
        return `Web Search "${trunc(args, 60)}"`;
    if (tc.function.name === "search_x")
        return `X Search "${trunc(args, 60)}"`;
    if (tc.function.name === "generate_image")
        return `Generate image "${trunc(args, 60)}"`;
    if (tc.function.name === "generate_video")
        return `Generate video "${trunc(args, 60)}"`;
    if (tc.function.name === "task")
        return `Task ${trunc(args, 60)}`;
    if (tc.function.name === "delegate")
        return `Background ${trunc(args, 60)}`;
    if (tc.function.name === "delegation_read")
        return `Read delegation ${trunc(args, 60)}`;
    if (tc.function.name === "delegation_list")
        return "List delegations";
    if (tc.function.name === "process_logs")
        return `Logs for process ${args}`;
    if (tc.function.name === "process_stop")
        return `Stop process ${args}`;
    if (tc.function.name === "process_list")
        return "List processes";
    if (tc.function.name === "generate_plan")
        return "Generating plan...";
    return trunc(`${tc.function.name} ${args}`, 80);
}
function sanitizeContent(raw) {
    let s = raw.replace(/^[\s\n]*assistant:\s*/gi, "");
    s = s.replace(/\{"success"\s*:\s*(true|false)\s*,\s*"output"\s*:\s*"[\s\S]*$/m, "");
    return s.trim();
}
function shouldOpenApiKeyModalForKey(key) {
    if (key.ctrl || key.meta)
        return false;
    if (key.name === "return" || key.name === "backspace")
        return true;
    return !!(key.sequence && key.sequence.length === 1);
}
function compactTaskLabel(label) {
    const words = label.trim().split(/\s+/).filter(Boolean);
    if (words.length <= 3)
        return label.trim() || "Working";
    return `${words.slice(0, 3).join(" ")}...`;
}
function trunc(s, n) {
    return s.length <= n ? s : `${s.slice(0, n)}…`;
}
function truncateLine(s, n) {
    return trunc(s.replace(/\s+/g, " ").trim(), n);
}
//# sourceMappingURL=app.js.map