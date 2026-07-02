/**
 * Hook for managing session backgrounding (Ctrl+B to background/foreground sessions).
 *
 * Handles:
 * - Calling onBackgroundQuery to spawn a background task for the current query
 * - Re-backgrounding foregrounded tasks
 * - Syncing foregrounded task messages/state to main view
 */
import type { Message } from '../types/message.js';
type UseSessionBackgroundingProps = {
    setMessages: (messages: Message[] | ((prev: Message[]) => Message[])) => void;
    setIsLoading: (loading: boolean) => void;
    resetLoadingState: () => void;
    setAbortController: (controller: AbortController | null) => void;
    onBackgroundQuery: () => void;
};
type UseSessionBackgroundingResult = {
    /** Call when user wants to background (Ctrl+B) */
    handleBackgroundSession: () => void;
};
export declare function useSessionBackgrounding({ setMessages, setIsLoading, resetLoadingState, setAbortController, onBackgroundQuery, }: UseSessionBackgroundingProps): UseSessionBackgroundingResult;
export {};
//# sourceMappingURL=useSessionBackgrounding.d.ts.map