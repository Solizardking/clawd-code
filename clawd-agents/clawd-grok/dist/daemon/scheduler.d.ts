import { type ScheduleDaemonStatus } from "../tools/schedule";
export declare class SchedulerDaemon {
    private readonly schedules;
    private tickTimer;
    private shuttingDown;
    private tickRunning;
    private signalHandlersInstalled;
    start(): Promise<void>;
    stop(): Promise<void>;
    getStatus(): Promise<ScheduleDaemonStatus>;
    private installSignalHandlers;
    private tick;
}
