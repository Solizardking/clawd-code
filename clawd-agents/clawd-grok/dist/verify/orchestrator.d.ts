import type { TaskRequest, ToolResult, VerifyRecipe } from "../types/index";
import type { SandboxSettings } from "../utils/settings";
import { type PreparedVerifyCheckpoint } from "./checkpoint";
import { type VerifyProjectProfile } from "./recipes";
export interface VerifyAgentLike {
    getCwd(): string;
    getSandboxSettings(): SandboxSettings;
    setSandboxSettings(settings: SandboxSettings): void;
    detectVerifyRecipe(settings?: SandboxSettings, abortSignal?: AbortSignal): Promise<VerifyRecipe | null>;
    runTaskRequest(request: TaskRequest, onActivity?: (detail: string) => void, abortSignal?: AbortSignal): Promise<ToolResult>;
}
export interface PreparedVerifyRun {
    profile: VerifyProjectProfile;
    sandboxSettings: SandboxSettings;
    taskRequest: TaskRequest;
    checkpoint?: PreparedVerifyCheckpoint;
    manifestPath?: string;
    usedVerifyDetect: boolean;
}
export interface VerifyOrchestratorOptions {
    onProgress?: (detail: string) => void;
    abortSignal?: AbortSignal;
}
export declare function prepareVerifyRun(agent: VerifyAgentLike, options?: VerifyOrchestratorOptions): Promise<PreparedVerifyRun>;
export declare function runVerifyOrchestration(agent: VerifyAgentLike, options?: VerifyOrchestratorOptions): Promise<ToolResult>;
