type Props = {
    /** When undefined, the hook does nothing. The task list id is also used as the agent ID. */
    taskListId?: string;
    isLoading: boolean;
    /**
     * Called when a task is ready to be worked on.
     * Returns true if submission succeeded, false if rejected.
     */
    onSubmitTask: (prompt: string) => boolean;
};
/**
 * Hook that watches a task list directory and automatically picks up
 * open, unowned tasks to work on.
 *
 * This enables "tasks mode" where Claude watches for externally-created
 * tasks and processes them one at a time.
 */
export declare function useTaskListWatcher({ taskListId, isLoading, onSubmitTask, }: Props): void;
export {};
//# sourceMappingURL=useTaskListWatcher.d.ts.map