import * as React from 'react';
import type { Message, PartialCompactDirection, UserMessage } from '../types/message.js';
type Props = {
    messages: Message[];
    onPreRestore: () => void;
    onRestoreMessage: (message: UserMessage) => Promise<void>;
    onRestoreCode: (message: UserMessage) => Promise<void>;
    onSummarize: (message: UserMessage, feedback?: string, direction?: PartialCompactDirection) => Promise<void>;
    onClose: () => void;
    /** Skip pick-list, land on confirm. Caller ran skip-check first. Esc closes fully (no back-to-list). */
    preselectedMessage?: UserMessage;
};
export declare function MessageSelector({ messages, onPreRestore, onRestoreMessage, onRestoreCode, onSummarize, onClose, preselectedMessage }: Props): React.ReactNode;
export declare function selectableUserMessagesFilter(message: Message): message is UserMessage;
/**
 * Checks if all messages after the given index are synthetic (interruptions, cancels, etc.)
 * or non-meaningful content. Returns true if there's nothing meaningful to confirm -
 * for example, if the user hit enter then immediately cancelled.
 */
export declare function messagesAfterAreOnlySynthetic(messages: Message[], fromIndex: number): boolean;
export {};
//# sourceMappingURL=MessageSelector.d.ts.map