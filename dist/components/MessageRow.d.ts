import type { Command } from '../commands.js';
import type { Screen } from '../screens/REPL.js';
import type { Tools } from '../Tool.js';
import type { RenderableMessage } from '../types/message.js';
import { type buildMessageLookups } from '../utils/messages.js';
export type Props = {
    message: RenderableMessage;
    /** Whether the previous message in renderableMessages is also a user message. */
    isUserContinuation: boolean;
    /**
     * Whether there is non-skippable content after this message in renderableMessages.
     * Only needs to be accurate for `collapsed_read_search` messages — used to decide
     * if the collapsed group spinner should stay active. Pass `false` otherwise.
     */
    hasContentAfter: boolean;
    tools: Tools;
    commands: Command[];
    verbose: boolean;
    inProgressToolUseIDs: Set<string>;
    streamingToolUseIDs: Set<string>;
    screen: Screen;
    canAnimate: boolean;
    onOpenRateLimitOptions?: () => void;
    lastThinkingBlockId: string | null;
    latestBashOutputUUID: string | null;
    columns: number;
    isLoading: boolean;
    lookups: ReturnType<typeof buildMessageLookups>;
};
/**
 * Scans forward from `index+1` to check if any "real" content follows. Used to
 * decide whether a collapsed read/search group should stay in its active
 * (grey dot, present-tense "Reading…") state while the query is still loading.
 *
 * Exported so Messages.tsx can compute this once per message and pass the
 * result as a boolean prop — avoids passing the full `renderableMessages` array
 * to each MessageRow (which React Compiler would pin in the fiber's memoCache,
 * accumulating every historical version of the array ≈ 1-2MB over a 7-turn session).
 */
export declare function hasContentAfterIndex(messages: RenderableMessage[], index: number, tools: Tools, streamingToolUseIDs: Set<string>): boolean;
export declare function isMessageStreaming(msg: RenderableMessage, streamingToolUseIDs: Set<string>): boolean;
/**
 * Checks if all tools in a message are resolved.
 * Exported for testing.
 */
export declare function allToolsResolved(msg: RenderableMessage, resolvedToolUseIDs: Set<string>): boolean;
/**
 * Conservative memo comparator that only bails out when we're CERTAIN
 * the message won't change. Fails safe by re-rendering when uncertain.
 *
 * Exported for testing.
 */
export declare function areMessageRowPropsEqual(prev: Props, next: Props): boolean;
export declare const MessageRow: any;
//# sourceMappingURL=MessageRow.d.ts.map