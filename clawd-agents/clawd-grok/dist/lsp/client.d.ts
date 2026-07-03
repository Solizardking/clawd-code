import type { LspDiagnostic, LspLaunchSpec } from "./types";
export interface LspClientOptions {
    serverId: string;
    root: string;
    launch: LspLaunchSpec;
    startupTimeoutMs: number;
    diagnosticsDebounceMs: number;
}
export interface LspClientSession {
    readonly serverId: string;
    readonly root: string;
    openOrChangeFile(filePath: string, languageId: string, text: string): Promise<void>;
    saveFile(filePath: string): Promise<void>;
    closeFile(filePath: string): Promise<void>;
    sendRequest<TResult>(method: string, params: unknown): Promise<TResult>;
    waitForDiagnostics(filePath: string, timeoutMs?: number): Promise<LspDiagnostic[]>;
    getDiagnostics(filePath: string): LspDiagnostic[];
    stop(): Promise<void>;
}
export declare function createLspClientSession(options: LspClientOptions): Promise<LspClientSession>;
