import { type ScheduleDaemonStatus, type StoredSchedule } from "../tools/schedule";
import type { AgentMode, ChatEntry, SessionInfo, SessionSnapshot, StreamChunk, SubagentStatus, TaskRequest, ToolCall, ToolResult, VerifyRecipe } from "../types/index";
import { type SandboxMode, type SandboxSettings } from "../utils/settings";
import { type SideQuestionResult } from "../utils/side-question";
interface AgentOptions {
    persistSession?: boolean;
    session?: string;
    sandboxMode?: SandboxMode;
    sandboxSettings?: SandboxSettings;
    batchApi?: boolean;
}
type ProcessMessageFinishReason = "stop" | "length" | "content-filter" | "tool-calls" | "error" | "other";
export interface ProcessMessageUsage {
    inputTokens?: number;
    outputTokens?: number;
    totalTokens?: number;
    costUsdTicks?: number;
}
export interface ProcessMessageStepStart {
    stepNumber: number;
    timestamp: number;
}
export interface ProcessMessageStepFinish {
    stepNumber: number;
    timestamp: number;
    finishReason: ProcessMessageFinishReason;
    usage: ProcessMessageUsage;
}
export interface ProcessMessageToolStart {
    toolCall: ToolCall;
    timestamp: number;
}
export interface ProcessMessageToolFinish {
    toolCall: ToolCall;
    toolResult: ToolResult;
    timestamp: number;
}
export interface ProcessMessageError {
    message: string;
    timestamp: number;
}
export interface ProcessMessageObserver {
    onStepStart?(info: ProcessMessageStepStart): void;
    onStepFinish?(info: ProcessMessageStepFinish): void;
    onToolStart?(info: ProcessMessageToolStart): void;
    onToolFinish?(info: ProcessMessageToolFinish): void;
    onError?(info: ProcessMessageError): void;
}
export declare class Agent {
    private provider;
    private apiKey;
    private baseURL;
    private bash;
    private delegations;
    private schedules;
    private sessionStore;
    private workspace;
    private session;
    private messages;
    private messageSeqs;
    private abortController;
    private maxToolRounds;
    private mode;
    private modelId;
    private maxTokens;
    private planContext;
    private subagentStatusListeners;
    private sendTelegramFile;
    private batchApi;
    private sessionStartHookFired;
    private recapsEnabled;
    constructor(apiKey: string | undefined, baseURL?: string, model?: string, maxToolRounds?: number, options?: AgentOptions);
    getModel(): string;
    setModel(model: string): void;
    getMode(): AgentMode;
    getSandboxMode(): SandboxMode;
    setSandboxMode(mode: SandboxMode): void;
    getSandboxSettings(): SandboxSettings;
    setSandboxSettings(settings: SandboxSettings): void;
    setMode(mode: AgentMode): void;
    setPlanContext(ctx: string | null): void;
    setSendTelegramFile(fn: ((filePath: string) => Promise<ToolResult>) | null): void;
    hasApiKey(): boolean;
    setApiKey(apiKey: string, baseURL?: string | undefined): void;
    getCwd(): string;
    listSchedules(): Promise<StoredSchedule[]>;
    removeSchedule(id: string): Promise<string>;
    getScheduleDaemonStatus(): Promise<ScheduleDaemonStatus>;
    getContextStats(contextWindow: number, inFlightText?: string): {
        contextWindow: number;
        usedTokens: number;
        remainingTokens: number;
        ratioUsed: number;
        ratioRemaining: number;
    };
    generateTitle(userMessage: string): Promise<string>;
    getSessionRecap(): string | null;
    getRecapsEnabled(): boolean;
    setRecapsEnabled(enabled: boolean): void;
    askSideQuestion(question: string, signal?: AbortSignal): Promise<SideQuestionResult>;
    abort(): void;
    cleanup(): Promise<void>;
    respondToToolApproval(approvalId: string, approved: boolean): void;
    clearHistory(): void;
    startNewSession(): SessionSnapshot | null;
    getSessionInfo(): SessionInfo | null;
    getSessionId(): string | null;
    getSessionTitle(): string | null;
    getChatEntries(): ChatEntry[];
    getSessionSnapshot(): SessionSnapshot | null;
    onSubagentStatus(listener: (status: SubagentStatus | null) => void): () => void;
    private emitSubagentStatus;
    private discardAbortedTurn;
    private refreshSessionRecap;
    private buildRecapPrompt;
    private recordUsage;
    consumeBackgroundNotifications(): Promise<string[]>;
    private getBatchClientOptions;
    private executeBatchToolCall;
    private runTaskRequestBatch;
    runTaskRequest(request: TaskRequest, onActivity?: (detail: string) => void, abortSignal?: AbortSignal): Promise<ToolResult>;
    private runTask;
    private runDelegation;
    private readDelegation;
    private listDelegations;
    private getCompactionSettings;
    private compactForContext;
    private processMessageBatchTurn;
    private appendCompletedTurn;
    private fireHook;
    processMessage(userMessage: string, observer?: ProcessMessageObserver): AsyncGenerator<StreamChunk, void, unknown>;
    private requireProvider;
    detectVerifyRecipe(settings?: SandboxSettings, abortSignal?: AbortSignal): Promise<VerifyRecipe | null>;
    runVerify(onProgress?: (detail: string) => void, abortSignal?: AbortSignal): Promise<ToolResult>;
}
export {};
