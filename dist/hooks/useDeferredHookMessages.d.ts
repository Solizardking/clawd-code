import type { HookResultMessage, Message } from '../types/message.js';
/**
 * Manages deferred SessionStart hook messages so the REPL can render
 * immediately instead of blocking on hook execution (~500ms).
 *
 * Hook messages are injected asynchronously when the promise resolves.
 * Returns a callback that onSubmit should call before the first API
 * request to ensure the model always sees hook context.
 */
export declare function useDeferredHookMessages(pendingHookMessages: Promise<HookResultMessage[]> | undefined, setMessages: (action: React.SetStateAction<Message[]>) => void): () => Promise<void>;
//# sourceMappingURL=useDeferredHookMessages.d.ts.map