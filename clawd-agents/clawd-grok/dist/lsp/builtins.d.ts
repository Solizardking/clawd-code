import type { LspLaunchSpec, NormalizedLspSettings } from "./types";
export interface RuntimeLspServerDefinition {
    id: string;
    extensions: string[];
    languageIds: Record<string, string>;
    resolveRoot(filePath: string, cwd: string): Promise<string | null>;
    resolveLaunch(root: string, settings: NormalizedLspSettings): Promise<LspLaunchSpec | null>;
}
export declare function createRuntimeLspDefinitions(cwd: string, settings: NormalizedLspSettings): RuntimeLspServerDefinition[];
