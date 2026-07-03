import { type ChildProcess } from "child_process";
import type { ToolResult } from "../types/index";
import type { SandboxMode, SandboxSettings } from "../utils/settings";
export interface BackgroundProcess {
    id: number;
    command: string;
    pid: number;
    cwd: string;
    startedAt: Date;
    child: ChildProcess;
    logPath: string;
    alive: boolean;
    exitCode: number | null;
}
interface BashToolOptions {
    sandboxMode?: SandboxMode;
    sandboxSettings?: SandboxSettings;
}
export declare class BashTool {
    private cwd;
    private bgProcesses;
    private tmpDir;
    private sandboxMode;
    private sandboxSettings;
    constructor(initialCwd?: string, options?: BashToolOptions);
    private ensureTmpDir;
    execute(command: string, timeout?: number, abortSignal?: AbortSignal): Promise<ToolResult>;
    startBackground(command: string): Promise<ToolResult>;
    getProcessLogs(id: number, tail?: number): Promise<ToolResult>;
    stopProcess(id: number): Promise<ToolResult>;
    listProcesses(): ToolResult;
    cleanup(): Promise<void>;
    getCwd(): string;
    getSandboxMode(): SandboxMode;
    setSandboxMode(mode: SandboxMode): void;
    getSandboxSettings(): SandboxSettings;
    setSandboxSettings(settings: SandboxSettings): void;
    getToolDescription(): string;
    private prepareCommand;
    private formatSandboxRuntimeError;
}
export declare function wrapCommandForShuru(cwd: string, command: string, settings?: SandboxSettings): string;
export declare function shouldRunOnHostInSandboxMode(command: string, settings?: SandboxSettings): boolean;
export declare function wrapHostBrowserCommand(command: string): string;
export declare function getSandboxMutationBlockReason(command: string, settings?: SandboxSettings): string | null;
export {};
