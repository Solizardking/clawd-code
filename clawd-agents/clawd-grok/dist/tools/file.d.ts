import type { LspDiagnosticFile } from "../lsp/types";
export interface FileDiff {
    filePath: string;
    additions: number;
    removals: number;
    patch: string;
    isNew: boolean;
}
export interface FileResult {
    success: boolean;
    output: string;
    diff?: FileDiff;
    lspDiagnostics?: LspDiagnosticFile[];
}
export declare function readFile(filePath: string, cwd: string, startLine?: number, endLine?: number): FileResult;
export declare function writeFile(filePath: string, content: string, cwd: string): Promise<FileResult>;
export declare function editFile(filePath: string, oldString: string, newString: string, cwd: string): Promise<FileResult>;
