import type { QueuedCommand } from '../types/textInputTypes.js';
type ProcessQueueParams = {
    executeInput: (commands: QueuedCommand[]) => Promise<void>;
};
type ProcessQueueResult = {
    processed: boolean;
};
/**
 * Processes commands from the queue.
 *
 * Slash commands (starting with '/') and bash-mode commands are processed
 * one at a time so each goes through the executeInput path individually.
 * Bash commands need individual processing to preserve per-command error
 * isolation, exit codes, and progress UI. Other non-slash commands are
 * batched: all items **with the same mode** as the highest-priority item
 * are drained at once and passed as a single array to executeInput — each
 * becomes its own user message with its own UUID. Different modes
 * (e.g. prompt vs task-notification) are never mixed because they are
 * treated differently downstream.
 *
 * The caller is responsible for ensuring no query is currently running
 * and for calling this function again after each command completes
 * until the queue is empty.
 *
 * @returns result with processed status
 */
export declare function processQueueIfReady({ executeInput, }: ProcessQueueParams): ProcessQueueResult;
/**
 * Checks if the queue has pending commands.
 * Use this to determine if queue processing should be triggered.
 */
export declare function hasQueuedCommands(): boolean;
export {};
//# sourceMappingURL=queueProcessor.d.ts.map