import type { QueuedCommand } from '../types/textInputTypes.js';
/**
 * React hook to subscribe to the unified command queue.
 * Returns a frozen array that only changes reference on mutation.
 * Components re-render only when the queue changes.
 */
export declare function useCommandQueue(): readonly QueuedCommand[];
//# sourceMappingURL=useCommandQueue.d.ts.map