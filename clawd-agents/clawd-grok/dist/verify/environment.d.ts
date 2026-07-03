import type { VerifyRecipe } from "../types/index";
import { type SandboxSettings } from "../utils/settings";
export interface LoadedVerifyEnvironment {
    path: string;
    recipe: VerifyRecipe;
    sandboxSettings: SandboxSettings;
}
export declare function loadVerifyEnvironment(cwd: string, baseSettings?: SandboxSettings): LoadedVerifyEnvironment | null;
export declare function saveVerifyEnvironment(cwd: string, recipe: VerifyRecipe, sandboxSettings?: SandboxSettings): string;
