import { type UUID } from 'crypto';
import type { AppState } from '../../state/AppState.js';
import type { Message } from '../../types/message.js';
import type { FileStateCache } from '../../utils/fileStateCache.js';
export declare function clearConversation({ setMessages, readFileState, discoveredSkillNames, loadedNestedMemoryPaths, getAppState, setAppState, setConversationId, }: {
    setMessages: (updater: (prev: Message[]) => Message[]) => void;
    readFileState: FileStateCache;
    discoveredSkillNames?: Set<string>;
    loadedNestedMemoryPaths?: Set<string>;
    getAppState?: () => AppState;
    setAppState?: (f: (prev: AppState) => AppState) => void;
    setConversationId?: (id: UUID) => void;
}): Promise<void>;
//# sourceMappingURL=conversation.d.ts.map