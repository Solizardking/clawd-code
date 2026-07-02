type Props = {
    enabled: boolean;
    isLoading: boolean;
    focusedInputDialog: string | undefined;
    onSubmitMessage: (formatted: string) => boolean;
};
/**
 * Polls the teammate inbox for new messages and submits them as turns.
 *
 * This hook:
 * 1. Polls every 1s for unread messages (teammates or team leads)
 * 2. When idle: submits messages immediately as a new turn
 * 3. When busy: queues messages in AppState.inbox for UI display, delivers when turn ends
 */
export declare function useInboxPoller({ enabled, isLoading, focusedInputDialog, onSubmitMessage, }: Props): void;
export {};
//# sourceMappingURL=useInboxPoller.d.ts.map