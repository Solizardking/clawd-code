import type { Message } from '../types/message.js';
type Props = {
    isLoading: boolean;
    /**
     * When true, bypasses the isLoading gate so tasks can enqueue while a
     * query is streaming rather than deferring to the next 1s check tick
     * after the turn ends. Assistant mode no longer forces --proactive
     * (#20425) so isLoading drops between turns like a normal REPL — this
     * bypass is now a latency nicety, not a starvation fix. The prompt is
     * enqueued at 'later' priority either way and drains between turns.
     */
    assistantMode?: boolean;
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};
/**
 * REPL wrapper for the cron scheduler. Mounts the scheduler once and tears
 * it down on unmount. Fired prompts go into the command queue as 'later'
 * priority, which the REPL drains via useCommandQueue between turns.
 *
 * Scheduler core (timer, file watcher, fire logic) lives in cronScheduler.ts
 * so SDK/-p mode can share it — see print.ts for the headless wiring.
 */
export declare function useScheduledTasks({ isLoading, assistantMode, setMessages, }: Props): void;
export {};
//# sourceMappingURL=useScheduledTasks.d.ts.map