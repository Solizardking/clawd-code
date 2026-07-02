import { type ShellCommand } from './ShellCommand.js';
export type { ExecResult } from './ShellCommand.js';
import type { ShellProvider, ShellType } from './shell/shellProvider.js';
export type ShellConfig = {
    provider: ShellProvider;
};
/**
 * Determines the best available shell to use.
 */
export declare function findSuitableShell(): Promise<string>;
export declare const getShellConfig: any;
export declare const getPsProvider: any;
export type ExecOptions = {
    timeout?: number;
    onProgress?: (lastLines: string, allLines: string, totalLines: number, totalBytes: number, isIncomplete: boolean) => void;
    preventCwdChanges?: boolean;
    shouldUseSandbox?: boolean;
    shouldAutoBackground?: boolean;
    /** When provided, stdout is piped (not sent to file) and this callback fires on each data chunk. */
    onStdout?: (data: string) => void;
};
/**
 * Execute a shell command using the environment snapshot
 * Creates a new shell process for each command execution
 */
export declare function exec(command: string, abortSignal: AbortSignal, shellType: ShellType, options?: ExecOptions): Promise<ShellCommand>;
/**
 * Set the current working directory
 */
export declare function setCwd(path: string, relativeTo?: string): void;
//# sourceMappingURL=Shell.d.ts.map