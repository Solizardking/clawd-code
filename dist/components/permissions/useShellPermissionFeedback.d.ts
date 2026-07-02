import type { ToolUseConfirm } from './PermissionRequest.js';
/**
 * Shared feedback-mode state + handlers for shell permission dialogs (Bash,
 * PowerShell). Encapsulates the yes/no input-mode toggle, feedback text state,
 * focus tracking, and reject handling.
 */
export declare function useShellPermissionFeedback({ toolUseConfirm, onDone, onReject, explainerVisible, }: {
    toolUseConfirm: ToolUseConfirm;
    onDone: () => void;
    onReject: () => void;
    explainerVisible: boolean;
}): {
    yesInputMode: boolean;
    noInputMode: boolean;
    yesFeedbackModeEntered: boolean;
    noFeedbackModeEntered: boolean;
    acceptFeedback: string;
    rejectFeedback: string;
    setAcceptFeedback: (v: string) => void;
    setRejectFeedback: (v: string) => void;
    focusedOption: string;
    handleInputModeToggle: (option: string) => void;
    handleReject: (feedback?: string) => void;
    handleFocus: (value: string) => void;
};
//# sourceMappingURL=useShellPermissionFeedback.d.ts.map