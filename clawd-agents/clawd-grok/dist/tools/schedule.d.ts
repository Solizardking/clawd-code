export interface StoredSchedule {
    id: string;
    name: string;
    instruction: string;
    cron?: string;
    model: string;
    directory: string;
    enabled: boolean;
    maxToolRounds: number;
    lastRunAt?: string;
    createdAt: string;
    updatedAt: string;
}
export interface ScheduleCreateOptions {
    name: string;
    instruction: string;
    cron?: string;
    model?: string;
    directory?: string;
    maxToolRounds?: number;
}
export interface ScheduleDaemonStatus {
    running: boolean;
    pid: number | null;
}
export interface ScheduleDaemonStartResult {
    status: ScheduleDaemonStatus;
    pid: number | null;
    alreadyRunning: boolean;
}
export interface ScheduleDaemonStopResult {
    status: ScheduleDaemonStatus;
    pid: number | null;
    wasRunning: boolean;
}
export interface ScheduleCreateResult {
    schedule: StoredSchedule;
    daemonStatus: ScheduleDaemonStatus;
    startedPid: number | null;
}
interface HeadlessRunOptions {
    instruction: string;
    directory: string;
    model: string;
    maxToolRounds: number;
    logPath: string;
    env?: NodeJS.ProcessEnv;
}
export declare class ScheduleManager {
    private readonly getCwd;
    private readonly getModel;
    constructor(getCwd?: () => string, getModel?: () => string);
    create(options: ScheduleCreateOptions): Promise<ScheduleCreateResult>;
    list(): Promise<StoredSchedule[]>;
    get(id: string): Promise<StoredSchedule | null>;
    remove(id: string): Promise<StoredSchedule | null>;
    enable(id: string): Promise<StoredSchedule>;
    disable(id: string): Promise<StoredSchedule>;
    readLog(id: string, tail?: number): Promise<string>;
    touchLastRunAt(id: string, at?: Date): Promise<StoredSchedule>;
    getDaemonStatus(): Promise<ScheduleDaemonStatus>;
    startDaemon(): Promise<ScheduleDaemonStartResult>;
    stopDaemon(): Promise<ScheduleDaemonStopResult>;
    private require;
}
export declare function ensureSchedulesDir(): Promise<string>;
export declare function getScheduleRecordPath(id: string): string;
export declare function getScheduleLogDir(id: string): string;
export declare function getScheduleRunLogPath(id: string): string;
export declare function getScheduleDaemonPidPath(): string;
export declare function writeScheduleDaemonPid(pid: number): Promise<void>;
export declare function removeScheduleDaemonPid(): Promise<void>;
export declare function getScheduleDaemonStatus(): Promise<ScheduleDaemonStatus>;
export declare function startScheduleDaemon(cwd?: string): Promise<ScheduleDaemonStartResult>;
export declare function stopScheduleDaemon(): Promise<ScheduleDaemonStopResult>;
export declare function listStoredSchedules(): Promise<StoredSchedule[]>;
export declare function readStoredSchedule(id: string): Promise<StoredSchedule | null>;
export declare function writeStoredSchedule(schedule: StoredSchedule): Promise<void>;
export declare function startDetachedHeadlessRun(options: HeadlessRunOptions): Promise<number | null>;
export declare function buildHeadlessCliArgs(options: Omit<HeadlessRunOptions, "logPath" | "env">): string[];
export declare function resolveCliArgs(): string[];
export declare function toScheduleId(name: string): string;
export declare function isValidCron(expr: string): boolean;
export declare function cronMatchesDate(expr: string, date: Date): boolean;
export {};
