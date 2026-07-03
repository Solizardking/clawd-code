import type { SandboxMode } from "./settings";
interface WorkspaceTrustEntry {
    sandboxMode: SandboxMode;
    updatedAt: string;
}
interface WorkspaceTrustStore {
    version: 1;
    workspaces: Record<string, WorkspaceTrustEntry>;
}
export interface WorkspaceTrustPromptDecision {
    sandboxMode: SandboxMode;
    remember: boolean;
}
export declare const WORKSPACE_TRUST_FILENAME = "workspace-trust.json";
export declare function isShuruSandboxSupported(platform?: NodeJS.Platform, arch?: NodeJS.Architecture): boolean;
export declare function getWorkspaceTrustPath(homeDir?: string): string;
export declare function getWorkspaceTrustKey(cwd?: string): string;
export declare function resolveWorkspaceTrustPromptAnswer(answer: string, sandboxSupported: boolean): WorkspaceTrustPromptDecision;
export declare function loadWorkspaceTrustStore(trustPath?: string): WorkspaceTrustStore;
export declare function getWorkspaceTrustDecision(cwd?: string, trustPath?: string): SandboxMode | null;
export declare function saveWorkspaceTrustDecision(cwd: string, sandboxMode: SandboxMode, trustPath?: string): void;
export {};
