import type { ToolUseConfirm } from '../components/permissions/PermissionRequest.js';
import { type DirectConnectConfig } from '../server/directConnectManager.js';
import type { Tool } from '../Tool.js';
import type { Message as MessageType } from '../types/message.js';
import type { RemoteMessageContent } from '../utils/teleport/api.js';
type UseDirectConnectResult = {
    isRemoteMode: boolean;
    sendMessage: (content: RemoteMessageContent) => Promise<boolean>;
    cancelRequest: () => void;
    disconnect: () => void;
};
type UseDirectConnectProps = {
    config: DirectConnectConfig | undefined;
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
    setIsLoading: (loading: boolean) => void;
    setToolUseConfirmQueue: React.Dispatch<React.SetStateAction<ToolUseConfirm[]>>;
    tools: Tool[];
};
export declare function useDirectConnect({ config, setMessages, setIsLoading, setToolUseConfirmQueue, tools, }: UseDirectConnectProps): UseDirectConnectResult;
export {};
//# sourceMappingURL=useDirectConnect.d.ts.map