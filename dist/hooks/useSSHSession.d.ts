/**
 * REPL integration hook for `claude ssh` sessions.
 *
 * Sibling to useDirectConnect — same shape (isRemoteMode/sendMessage/
 * cancelRequest/disconnect), same REPL wiring, but drives an SSH child
 * process instead of a WebSocket. Kept separate rather than generalizing
 * useDirectConnect because the lifecycle differs: the ssh process and auth
 * proxy are created BEFORE this hook runs (during startup, in main.tsx) and
 * handed in; useDirectConnect creates its WebSocket inside the effect.
 */
import type { ToolUseConfirm } from '../components/permissions/PermissionRequest.js';
import type { SSHSession } from '../ssh/createSSHSession.js';
import type { Tool } from '../Tool.js';
import type { Message as MessageType } from '../types/message.js';
import type { RemoteMessageContent } from '../utils/teleport/api.js';
type UseSSHSessionResult = {
    isRemoteMode: boolean;
    sendMessage: (content: RemoteMessageContent) => Promise<boolean>;
    cancelRequest: () => void;
    disconnect: () => void;
};
type UseSSHSessionProps = {
    session: SSHSession | undefined;
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
    setIsLoading: (loading: boolean) => void;
    setToolUseConfirmQueue: React.Dispatch<React.SetStateAction<ToolUseConfirm[]>>;
    tools: Tool[];
};
export declare function useSSHSession({ session, setMessages, setIsLoading, setToolUseConfirmQueue, tools, }: UseSSHSessionProps): UseSSHSessionResult;
export {};
//# sourceMappingURL=useSSHSession.d.ts.map