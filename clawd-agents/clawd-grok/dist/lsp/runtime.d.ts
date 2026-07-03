import type { LspDiagnosticFile, LspQueryInput, LspToolResponse } from "./types";
export declare function queryLsp(cwd: string, input: LspQueryInput): Promise<LspToolResponse>;
export declare function syncFileWithLsp(cwd: string, filePath: string, content: string, save?: boolean, waitForDiagnostics?: boolean): Promise<LspDiagnosticFile[]>;
export declare function isLspToolEnabled(_cwd: string): boolean;
export declare function summarizeDiagnostics(diagnostics: LspDiagnosticFile[]): string | null;
export declare function shutdownWorkspaceLspManager(cwd: string): Promise<void>;
