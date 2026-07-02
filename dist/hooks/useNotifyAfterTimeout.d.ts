export declare const DEFAULT_INTERACTION_THRESHOLD_MS = 6000;
/**
 * Hook that manages desktop notifications after a timeout period.
 *
 * Shows a notification in two cases:
 * 1. Immediately if the app has been idle for longer than the threshold
 * 2. After the specified timeout if the user doesn't interact within that time
 *
 * @param message - The notification message to display
 * @param timeout - The timeout in milliseconds (defaults to 6000ms)
 */
export declare function useNotifyAfterTimeout(message: string, notificationType: string): void;
//# sourceMappingURL=useNotifyAfterTimeout.d.ts.map