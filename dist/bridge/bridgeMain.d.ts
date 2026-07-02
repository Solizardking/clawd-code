import { type BridgeApiClient, type BridgeConfig, type BridgeLogger, type SessionSpawner, type SpawnMode } from './types.js';
export type BackoffConfig = {
    connInitialMs: number;
    connCapMs: number;
    connGiveUpMs: number;
    generalInitialMs: number;
    generalCapMs: number;
    generalGiveUpMs: number;
    /** SIGTERM→SIGKILL grace period on shutdown. Default 30s. */
    shutdownGraceMs?: number;
    /** stopWorkWithRetry base delay (1s/2s/4s backoff). Default 1000ms. */
    stopWorkBaseDelayMs?: number;
};
export declare function runBridgeLoop(config: BridgeConfig, environmentId: string, environmentSecret: string, api: BridgeApiClient, spawner: SessionSpawner, logger: BridgeLogger, signal: AbortSignal, backoffConfig?: BackoffConfig, initialSessionId?: string, getAccessToken?: () => string | undefined | Promise<string | undefined>): Promise<void>;
export declare function isConnectionError(err: unknown): boolean;
/** Detect HTTP 5xx errors from axios (code: 'ERR_BAD_RESPONSE'). */
export declare function isServerError(err: unknown): boolean;
export type ParsedArgs = {
    verbose: boolean;
    sandbox: boolean;
    debugFile?: string;
    sessionTimeoutMs?: number;
    permissionMode?: string;
    name?: string;
    /** Value passed to --spawn (if any); undefined if no --spawn flag was given. */
    spawnMode: SpawnMode | undefined;
    /** Value passed to --capacity (if any); undefined if no --capacity flag was given. */
    capacity: number | undefined;
    /** --[no-]create-session-in-dir override; undefined = use default (on). */
    createSessionInDir: boolean | undefined;
    /** Resume an existing session instead of creating a new one. */
    sessionId?: string;
    /** Resume the last session in this directory (reads bridge-pointer.json). */
    continueSession: boolean;
    help: boolean;
    error?: string;
};
export declare function parseArgs(args: string[]): ParsedArgs;
export declare function bridgeMain(args: string[]): Promise<void>;
/**
 * Thrown by runBridgeHeadless for configuration issues the supervisor should
 * NOT retry (trust not accepted, worktree unavailable, http-not-https). The
 * daemon worker catches this and exits with EXIT_CODE_PERMANENT so the
 * supervisor parks the worker instead of respawning it on backoff.
 */
export declare class BridgeHeadlessPermanentError extends Error {
    constructor(message: string);
}
export type HeadlessBridgeOpts = {
    dir: string;
    name?: string;
    spawnMode: 'same-dir' | 'worktree';
    capacity: number;
    permissionMode?: string;
    sandbox: boolean;
    sessionTimeoutMs?: number;
    createSessionOnStart: boolean;
    getAccessToken: () => string | undefined;
    onAuth401: (failedToken: string) => Promise<boolean>;
    log: (s: string) => void;
};
/**
 * Non-interactive bridge entrypoint for the `remoteControl` daemon worker.
 *
 * Linear subset of bridgeMain(): no readline dialogs, no stdin key handlers,
 * no TUI, no process.exit(). Config comes from the caller (daemon.json), auth
 * comes via IPC (supervisor's AuthManager), logs go to the worker's stdout
 * pipe. Throws on fatal errors — the worker catches and maps permanent vs
 * transient to the right exit code.
 *
 * Resolves cleanly when `signal` aborts and the poll loop tears down.
 */
export declare function runBridgeHeadless(opts: HeadlessBridgeOpts, signal: AbortSignal): Promise<void>;
//# sourceMappingURL=bridgeMain.d.ts.map