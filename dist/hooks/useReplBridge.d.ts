import React from 'react';
import type { Command } from '../commands.js';
import type { Message } from '../types/message.js';
/** How long after a failure before replBridgeEnabled is auto-cleared (stops retries). */
export declare const BRIDGE_FAILURE_DISMISS_MS = 10000;
/**
 * Hook that initializes an always-on bridge connection in the background
 * and writes new user/assistant messages to the bridge session.
 *
 * Silently skips if bridge is not enabled or user is not OAuth-authenticated.
 *
 * Watches AppState.replBridgeEnabled — when toggled off (via /config or footer),
 * the bridge is torn down. When toggled back on, it re-initializes.
 *
 * Inbound messages from claude.ai are injected into the REPL via queuedCommands.
 */
export declare function useReplBridge(messages: Message[], setMessages: (action: React.SetStateAction<Message[]>) => void, abortControllerRef: React.RefObject<AbortController | null>, commands: readonly Command[], mainLoopModel: string): {
    sendBridgeResult: () => void;
};
//# sourceMappingURL=useReplBridge.d.ts.map