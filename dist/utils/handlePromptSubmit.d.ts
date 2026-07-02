import type { UUID } from 'crypto';
import { type Command } from '../commands.js';
import type { SpinnerMode } from '../components/Spinner/types.js';
import type { QuerySource } from '../constants/querySource.js';
import type { CanUseToolFn } from '../hooks/useCanUseTool.js';
import type { IDESelection } from '../hooks/useIdeSelection.js';
import type { AppState } from '../state/AppState.js';
import type { SetToolJSXFn } from '../Tool.js';
import type { Message } from '../types/message.js';
import { type PromptInputMode, type QueuedCommand } from '../types/textInputTypes.js';
import type { PastedContent } from './config.js';
import type { EffortValue } from './effort.js';
import type { ProcessUserInputContext } from './processUserInput/processUserInput.js';
import type { QueryGuard } from './QueryGuard.js';
type BaseExecutionParams = {
    queuedCommands?: QueuedCommand[];
    messages: Message[];
    mainLoopModel: string;
    ideSelection: IDESelection | undefined;
    querySource: QuerySource;
    commands: Command[];
    queryGuard: QueryGuard;
    /**
     * True when external loading (remote session, foregrounded background task)
     * is active. These don't route through queryGuard, so the queue check must
     * account for them separately. Omit (defaults to false) for the dequeue path
     * (executeQueuedInput) — dequeued items were already queued past this check.
     */
    isExternalLoading?: boolean;
    setToolJSX: SetToolJSXFn;
    getToolUseContext: (messages: Message[], newMessages: Message[], abortController: AbortController, mainLoopModel: string) => ProcessUserInputContext;
    setUserInputOnProcessing: (prompt?: string) => void;
    setAbortController: (abortController: AbortController | null) => void;
    onQuery: (newMessages: Message[], abortController: AbortController, shouldQuery: boolean, additionalAllowedTools: string[], mainLoopModel: string, onBeforeQuery?: (input: string, newMessages: Message[]) => Promise<boolean>, input?: string, effort?: EffortValue) => Promise<void>;
    setAppState: (updater: (prev: AppState) => AppState) => void;
    onBeforeQuery?: (input: string, newMessages: Message[]) => Promise<boolean>;
    canUseTool?: CanUseToolFn;
};
export type PromptInputHelpers = {
    setCursorOffset: (offset: number) => void;
    clearBuffer: () => void;
    resetHistory: () => void;
};
export type HandlePromptSubmitParams = BaseExecutionParams & {
    input?: string;
    mode?: PromptInputMode;
    pastedContents?: Record<number, PastedContent>;
    helpers: PromptInputHelpers;
    onInputChange: (value: string) => void;
    setPastedContents: React.Dispatch<React.SetStateAction<Record<number, PastedContent>>>;
    abortController?: AbortController | null;
    addNotification?: (notification: {
        key: string;
        text: string;
        priority: 'low' | 'medium' | 'high' | 'immediate';
    }) => void;
    setMessages?: (updater: (prev: Message[]) => Message[]) => void;
    streamMode?: SpinnerMode;
    hasInterruptibleToolInProgress?: boolean;
    uuid?: UUID;
    /**
     * When true, input starting with `/` is treated as plain text.
     * Used for remotely-received messages (bridge/CCR) that should not
     * trigger local slash commands or skills.
     */
    skipSlashCommands?: boolean;
};
export declare function handlePromptSubmit(params: HandlePromptSubmitParams): Promise<void>;
export {};
//# sourceMappingURL=handlePromptSubmit.d.ts.map