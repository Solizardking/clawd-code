import type { QueuedCommand } from '../types/textInputTypes.js';
import type { QueryGuard } from '../utils/QueryGuard.js';
type UseQueueProcessorParams = {
    executeQueuedInput: (commands: QueuedCommand[]) => Promise<void>;
    hasActiveLocalJsxUI: boolean;
    queryGuard: QueryGuard;
};
/**
 * Hook that processes queued commands when conditions are met.
 *
 * Uses a single unified command queue (module-level store). Priority determines
 * processing order: 'now' > 'next' (user input) > 'later' (task notifications).
 * The dequeue() function handles priority ordering automatically.
 *
 * Processing triggers when:
 * - No query active (queryGuard — reactive via useSyncExternalStore)
 * - Queue has items
 * - No active local JSX UI blocking input
 */
export declare function useQueueProcessor({ executeQueuedInput, hasActiveLocalJsxUI, queryGuard, }: UseQueueProcessorParams): void;
export {};
//# sourceMappingURL=useQueueProcessor.d.ts.map