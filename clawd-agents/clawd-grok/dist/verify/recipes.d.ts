import type { VerifyRecipe } from "../types/index";
import { type SandboxSettings } from "../utils/settings";
export type VerifyAppKind = "nextjs" | "vite" | "astro" | "sveltekit" | "remix" | "cra" | "node" | "django" | "python" | "go" | "rust" | "maven" | "gradle" | "make" | "unknown";
export interface VerifyProjectProfile {
    appKind: VerifyAppKind;
    appLabel: string;
    packageManager: string | null;
    availableScripts: string[];
    hasNodeModules: boolean;
    sandboxSettings: SandboxSettings;
    recipe: VerifyRecipe;
}
export declare function detectPackageManager(cwd: string): string | null;
export declare function defaultShellInit(): string[];
export declare function getNodeWebShellInitCommands(packageManager: string | null, appKind: VerifyAppKind): string[];
export declare function getNodeWebBootstrapCommands(packageManager: string | null, appKind: VerifyAppKind): string[];
export declare function normalizeVerifyAppKind(value: string): VerifyAppKind;
export declare function normalizeVerifyRecipe(value: unknown): VerifyRecipe | null;
export declare function inferVerifySmokeUrl(settings?: SandboxSettings): string | null;
export declare function inferVerifyProjectProfile(cwd: string, baseSettings?: SandboxSettings, recipeOverride?: VerifyRecipe | null): VerifyProjectProfile;
