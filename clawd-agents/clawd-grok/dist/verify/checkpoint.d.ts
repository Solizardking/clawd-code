import type { VerifyRecipe } from "../types/index";
import type { SandboxSettings } from "../utils/settings";
import type { VerifyProjectProfile } from "./recipes";
export declare function buildVerifyCheckpointName(recipe: VerifyRecipe, fingerprint: string): string;
export declare function getVerifyCheckpointName(cwd: string, recipe: VerifyRecipe): string;
export interface PreparedVerifyCheckpoint {
    checkpointName?: string;
    guestWorkdir?: string;
    created: boolean;
}
export declare function ensureVerifyCheckpoint(cwd: string, profile: VerifyProjectProfile, settings: SandboxSettings, onProgress?: (detail: string) => void): Promise<PreparedVerifyCheckpoint>;
