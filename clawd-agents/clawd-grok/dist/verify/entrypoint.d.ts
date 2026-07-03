import type { TaskRequest, VerifyRecipe } from "../types/index";
import type { SandboxSettings } from "../utils/settings";
import { type PreparedVerifyCheckpoint } from "./checkpoint";
import { type VerifyProjectProfile } from "./recipes";
export declare const VERIFY_SUBAGENT_ID = "verify";
export declare const VERIFY_TASK_DESCRIPTION = "Run local verification";
export interface VerifyRuntimeConfig {
    sandboxMode: "shuru";
    sandboxSettings: SandboxSettings;
    taskRequest: TaskRequest;
    profile: VerifyProjectProfile;
    checkpointCreated?: boolean;
}
export interface PreparedVerifySandbox {
    profile: VerifyProjectProfile;
    sandboxSettings: SandboxSettings;
    checkpoint?: PreparedVerifyCheckpoint;
}
export declare function buildVerifyTaskPrompt(cwd: string, settings?: SandboxSettings, recipeOverride?: VerifyRecipe | null): string;
export declare function createVerifyTaskRequest(cwd: string, settings?: SandboxSettings, recipeOverride?: VerifyRecipe | null): TaskRequest;
export declare function buildVerifyDetectPrompt(cwd: string, settings?: SandboxSettings): string;
export declare function createVerifyRuntimeConfig(cwd: string, baseSettings?: SandboxSettings, recipeOverride?: VerifyRecipe | null): VerifyRuntimeConfig;
export declare function prepareVerifySandbox(cwd: string, baseSettings?: SandboxSettings, recipeOverride?: VerifyRecipe | null, onProgress?: (detail: string) => void): Promise<PreparedVerifySandbox>;
export declare function buildVerifyPrompt(cwd: string): string;
export declare const VERIFY_PROMPT = "__DYNAMIC__";
export declare function getVerifyCliError(options: {
    hasPrompt?: boolean;
    hasMessageArgs?: boolean;
}): string | null;
export { defaultShellInit, inferVerifyProjectProfile, inferVerifySmokeUrl, normalizeVerifyRecipe, type VerifyProjectProfile, } from "./recipes";
