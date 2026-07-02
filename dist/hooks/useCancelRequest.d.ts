import type { ToolUseConfirm } from '../components/permissions/PermissionRequest.js';
import type { SpinnerMode } from '../components/Spinner/types.js';
import type { Screen } from '../screens/REPL.js';
import type { PromptInputMode, VimMode } from '../types/textInputTypes.js';
type CancelRequestHandlerProps = {
    setToolUseConfirmQueue: (f: (toolUseConfirmQueue: ToolUseConfirm[]) => ToolUseConfirm[]) => void;
    onCancel: () => void;
    onAgentsKilled: () => void;
    isMessageSelectorVisible: boolean;
    screen: Screen;
    abortSignal?: AbortSignal;
    popCommandFromQueue?: () => void;
    vimMode?: VimMode;
    isLocalJSXCommand?: boolean;
    isSearchingHistory?: boolean;
    isHelpOpen?: boolean;
    inputMode?: PromptInputMode;
    inputValue?: string;
    streamMode?: SpinnerMode;
};
/**
 * Component that handles cancel requests via keybinding.
 * Renders null but registers the 'chat:cancel' keybinding handler.
 */
export declare function CancelRequestHandler(props: CancelRequestHandlerProps): null;
export {};
//# sourceMappingURL=useCancelRequest.d.ts.map