import type { DelegationRun, DelegationStatus, TaskRequest, ToolResult } from "../types/index";
import { type SandboxMode, type SandboxSettings } from "../utils/settings";
export interface StoredDelegation {
    id: string;
    agent: "explore";
    description: string;
    prompt: string;
    cwd: string;
    model: string;
    sandboxMode: SandboxMode;
    sandboxSettings?: SandboxSettings;
    maxToolRounds: number;
    maxTokens: number;
    batchApi?: boolean;
    status: DelegationStatus;
    startedAt: string;
    completedAt?: string;
    pid?: number;
    error?: string;
    title?: string;
    summary?: string;
    outputPath: string;
    notifiedAt?: string;
}
export interface DelegationNotification {
    id: string;
    message: string;
}
interface StartDelegationOptions {
    model: string;
    sandboxMode: SandboxMode;
    sandboxSettings?: SandboxSettings;
    maxToolRounds: number;
    maxTokens: number;
    batchApi?: boolean;
}
export declare class DelegationManager {
    private readonly getCwd;
    constructor(getCwd: () => string);
    start(request: TaskRequest, options: StartDelegationOptions): Promise<ToolResult>;
    list(): Promise<DelegationRun[]>;
    read(id: string): Promise<string>;
    consumeNotifications(): Promise<DelegationNotification[]>;
    private getById;
}
export declare function loadDelegation(jobPath: string): Promise<StoredDelegation>;
export declare function completeDelegation(jobPath: string, output: string, fallbackSummary?: string): Promise<void>;
export declare function failDelegation(jobPath: string, error: string, output?: string): Promise<void>;
export {};
