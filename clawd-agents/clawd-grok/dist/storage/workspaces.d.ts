import type { WorkspaceInfo } from "../types/index";
export interface ResolvedWorkspace {
    scopeKey: string;
    canonicalPath: string;
    gitRoot: string | null;
    displayName: string;
}
export declare function ensureWorkspace(cwd: string): WorkspaceInfo;
export declare function resolveWorkspace(cwd: string): ResolvedWorkspace;
