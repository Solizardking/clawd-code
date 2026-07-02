import type { Command } from '../commands.js';
import type { Tools } from '../Tool.js';
import type { AssistantMessage, AttachmentMessage as AttachmentMessageType, CollapsedReadSearchGroup as CollapsedReadSearchGroupType, GroupedToolUseMessage as GroupedToolUseMessageType, NormalizedUserMessage, ProgressMessage, SystemMessage } from '../types/message.js';
import type { buildMessageLookups } from '../utils/messages.js';
export type Props = {
    message: NormalizedUserMessage | AssistantMessage | AttachmentMessageType | SystemMessage | GroupedToolUseMessageType | CollapsedReadSearchGroupType;
    lookups: ReturnType<typeof buildMessageLookups>;
    /** Absolute width for the container Box. When provided, eliminates a wrapper Box in the caller. */
    containerWidth?: number;
    addMargin: boolean;
    tools: Tools;
    commands: Command[];
    verbose: boolean;
    inProgressToolUseIDs: Set<string>;
    progressMessagesForMessage: ProgressMessage[];
    shouldAnimate: boolean;
    shouldShowDot: boolean;
    style?: 'condensed';
    width?: number | string;
    isTranscriptMode: boolean;
    isStatic: boolean;
    onOpenRateLimitOptions?: () => void;
    isActiveCollapsedGroup?: boolean;
    isUserContinuation?: boolean;
    /** ID of the last thinking block (uuid:index) to show, used for hiding past thinking in transcript mode */
    lastThinkingBlockId?: string | null;
    /** UUID of the latest user bash output message (for auto-expanding) */
    latestBashOutputUUID?: string | null;
};
export declare function hasThinkingContent(m: {
    type: string;
    message?: {
        content: Array<{
            type: string;
        }>;
    };
}): boolean;
/** Exported for testing */
export declare function areMessagePropsEqual(prev: Props, next: Props): boolean;
export declare const Message: any;
//# sourceMappingURL=Message.d.ts.map