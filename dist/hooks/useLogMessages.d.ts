import type { Message } from '../types/message.js';
/**
 * Hook that logs messages to the transcript
 * conversation ID that only changes when a new conversation is started.
 *
 * @param messages The current conversation messages
 * @param ignore When true, messages will not be recorded to the transcript
 */
export declare function useLogMessages(messages: Message[], ignore?: boolean): void;
//# sourceMappingURL=useLogMessages.d.ts.map