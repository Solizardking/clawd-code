import { type RuntimeLspServerDefinition } from "./builtins";
import { type LspClientSession } from "./client";
import type { LspDiagnosticFile, LspQueryInput, LspToolResponse, NormalizedLspSettings } from "./types";
interface WorkspaceLspManagerOptions {
    createClient?: (input: {
        serverId: string;
        root: string;
        definition: RuntimeLspServerDefinition;
        settings: NormalizedLspSettings;
    }) => Promise<LspClientSession | null>;
}
export interface WorkspaceLspManager {
    touchFile(filePath: string, waitForDiagnostics?: boolean): Promise<LspDiagnosticFile[]>;
    syncFile(filePath: string, content: string, save?: boolean, waitForDiagnostics?: boolean): Promise<LspDiagnosticFile[]>;
    query(input: LspQueryInput): Promise<LspToolResponse>;
    close(): Promise<void>;
}
export declare function createWorkspaceLspManager(cwd: string, settings: NormalizedLspSettings, options?: WorkspaceLspManagerOptions): WorkspaceLspManager;
export declare function summarizeLspDiagnostics(diagnostics: LspDiagnosticFile[]): string | null;
export {};
