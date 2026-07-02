import type { ToolUseConfirm } from '../components/permissions/PermissionRequest.js';
import type { SpinnerMode } from '../components/Spinner/types.js';
import { type RemoteSessionConfig } from '../remote/RemoteSessionManager.js';
import type { Tool } from '../Tool.js';
import type { Message as MessageType } from '../types/message.js';
import { type StreamingToolUse } from '../utils/messages.js';
import type { RemoteMessageContent } from '../utils/teleport/api.js';
type UseRemoteSessionProps = {
    config: RemoteSessionConfig | undefined;
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
    setIsLoading: (loading: boolean) => void;
    onInit?: (slashCommands: string[]) => void;
    setToolUseConfirmQueue: React.Dispatch<React.SetStateAction<ToolUseConfirm[]>>;
    tools: Tool[];
    setStreamingToolUses?: React.Dispatch<React.SetStateAction<StreamingToolUse[]>>;
    setStreamMode?: React.Dispatch<React.SetStateAction<SpinnerMode>>;
    setInProgressToolUseIDs?: (f: (prev: Set<string>) => Set<string>) => void;
};
type UseRemoteSessionResult = {
    isRemoteMode: boolean;
    sendMessage: (content: RemoteMessageContent, opts?: {
        uuid?: string;
    }) => Promise<boolean>;
    cancelRequest: () => void;
    disconnect: () => void;
};
/**
 * Hook for managing a remote CCR session in the REPL.
 *
 * Handles:
 * - WebSocket connection to CCR
 * - Converting SDK messages to REPL messages
 * - Sending user input to CCR via HTTP POST
 * - Permission request/response flow via existing ToolUseConfirm queue
 */
export declare function useRemoteSession({ config, setMessages, setIsLoading, onInit, setToolUseConfirmQueue, tools, setStreamingToolUses, setStreamMode, setInProgressToolUseIDs, }: UseRemoteSessionProps): UseRemoteSessionResult;
export {};
//# sourceMappingURL=useRemoteSession.d.ts.map