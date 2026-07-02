import type { Screen } from '../screens/REPL.js';
import type { RenderableMessage } from '../types/message.js';
import { buildMessageLookups } from '../utils/messages.js';
/**
 * In brief-only mode, filter messages to show ONLY Brief tool_use blocks,
 * their tool_results, and real user input. All assistant text is dropped —
 * if the model forgets to call Brief, the user sees nothing for that turn.
 * That's on the model to get right; the filter does not second-guess it.
 */
export declare function filterForBriefTool<T extends {
    type: string;
    subtype?: string;
    isMeta?: boolean;
    isApiErrorMessage?: boolean;
    message?: {
        content: Array<{
            type: string;
            name?: string;
            tool_use_id?: string;
        }>;
    };
    attachment?: {
        type: string;
        isMeta?: boolean;
        origin?: unknown;
        commandMode?: string;
    };
}>(messages: T[], briefToolNames: string[]): T[];
/**
 * Full-transcript companion to filterForBriefTool. When the Brief tool is
 * in use, the model's text output is redundant with the SendUserMessage
 * content it wrote right after — drop the text so only the SendUserMessage
 * block shows. Tool calls and their results stay visible.
 *
 * Per-turn: only drops text in turns that actually called Brief. If the
 * model forgets, text still shows — otherwise the user would see nothing.
 */
export declare function dropTextInBriefTurns<T extends {
    type: string;
    isMeta?: boolean;
    message?: {
        content: Array<{
            type: string;
            name?: string;
        }>;
    };
}>(messages: T[], briefToolNames: string[]): T[];
export type SliceAnchor = {
    uuid: string;
    idx: number;
} | null;
/** Exported for testing. Mutates anchorRef when the window needs to advance. */
export declare function computeSliceStart(collapsed: ReadonlyArray<{
    uuid: string;
}>, anchorRef: {
    current: SliceAnchor;
}, cap?: number, step?: number): number;
export declare const Messages: any;
export declare function shouldRenderStatically(message: RenderableMessage, streamingToolUseIDs: Set<string>, inProgressToolUseIDs: Set<string>, siblingToolUseIDs: ReadonlySet<string>, screen: Screen, lookups: ReturnType<typeof buildMessageLookups>): boolean;
//# sourceMappingURL=Messages.d.ts.map