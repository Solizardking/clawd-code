import { KeyboardEvent } from '../ink/events/keyboard-event.js';
/**
 * Custom hook that handles Shift+Up/Down keyboard navigation for background tasks.
 * When teammates (swarm) are present, navigates between leader and teammates.
 * When only non-teammate background tasks exist, opens the background tasks dialog.
 * Also handles Enter to confirm selection, 'f' to view transcript, and 'k' to kill.
 */
export declare function useBackgroundTaskNavigation(options?: {
    onOpenBackgroundTasks?: () => void;
}): {
    handleKeyDown: (e: KeyboardEvent) => void;
};
//# sourceMappingURL=useBackgroundTaskNavigation.d.ts.map