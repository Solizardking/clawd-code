import type { KeybindingContextName } from '../keybindings/types.js';
export type ExitState = {
    pending: boolean;
    keyName: 'Ctrl-C' | 'Ctrl-D' | null;
};
type KeybindingOptions = {
    context?: KeybindingContextName;
    isActive?: boolean;
};
type UseKeybindingsHook = (handlers: Record<string, () => void>, options?: KeybindingOptions) => void;
/**
 * Handle ctrl+c and ctrl+d for exiting the application.
 *
 * Uses a time-based double-press mechanism:
 * - First press: Shows "Press X again to exit" message
 * - Second press within timeout: Exits the application
 *
 * Note: We use time-based double-press rather than the chord system because
 * we want the first ctrl+c to also trigger interrupt (handled elsewhere).
 * The chord system would prevent the first press from firing any action.
 *
 * These keys are hardcoded and cannot be rebound via keybindings.json.
 *
 * @param useKeybindingsHook - The useKeybindings hook to use for registering handlers
 *                            (dependency injection to avoid import cycles)
 * @param onInterrupt - Optional callback for features to handle interrupt (ctrl+c).
 *                      Return true if handled, false to fall through to double-press exit.
 * @param onExit - Optional custom exit handler
 * @param isActive - Whether the keybinding is active (default true). Set false
 *                   while an embedded TextInput is focused — TextInput's own
 *                   ctrl+c/d handlers will manage cancel/exit, and Dialog's
 *                   handler would otherwise double-fire (child useInput runs
 *                   before parent useKeybindings, so both see every keypress).
 */
export declare function useExitOnCtrlCD(useKeybindingsHook: UseKeybindingsHook, onInterrupt?: () => boolean, onExit?: () => void, isActive?: boolean): ExitState;
export {};
//# sourceMappingURL=useExitOnCtrlCD.d.ts.map