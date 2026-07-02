import { type RefObject } from 'react';
import { type ScrollBoxHandle } from '../ink/components/ScrollBox.js';
import type { Message } from '../types/message.js';
/** Context for scroll-derived chrome (sticky header, pill). StickyTracker
 *  in VirtualMessageList writes via this instead of threading a callback
 *  up through Messages → REPL → FullscreenLayout. The setter is stable so
 *  consuming this context never causes re-renders. */
export declare const ScrollChromeContext: any;
/**
 * Tracks the in-transcript "N new messages" divider position while the
 * user is scrolled up. Snapshots message count AND scrollHeight the first
 * time sticky breaks. scrollHeight ≈ the y-position of the divider in the
 * scroll content (it renders right after the last message that existed at
 * snapshot time).
 *
 * `pillVisible` lives in FullscreenLayout (not here) — it subscribes
 * directly to ScrollBox via useSyncExternalStore with a boolean snapshot
 * against `dividerYRef`, so per-frame scroll never re-renders REPL.
 * `dividerIndex` stays here because REPL needs it for computeUnseenDivider
 * → Messages' divider line; it changes only ~twice/scroll-session
 * (first scroll-away + repin), acceptable REPL re-render cost.
 *
 * `onScrollAway` must be called by every scroll-away action with the
 * handle; `onRepin` by submit/scroll-to-bottom.
 */
export declare function useUnseenDivider(messageCount: number): {
    /** Index into messages[] where the divider line renders. Cleared on
     *  sticky-resume (scroll back to bottom) so the "N new" line doesn't
     *  linger once everything is visible. */
    dividerIndex: number | null;
    /** scrollHeight snapshot at first scroll-away — the divider's y-position.
     *  FullscreenLayout subscribes to ScrollBox and compares viewport bottom
     *  against this for pillVisible. Ref so writes don't re-render REPL. */
    dividerYRef: RefObject<number | null>;
    onScrollAway: (handle: ScrollBoxHandle) => void;
    onRepin: () => void;
    /** Scroll the handle so the divider line is at the top of the viewport. */
    jumpToNew: (handle: ScrollBoxHandle | null) => void;
    /** Shift dividerIndex and dividerYRef when messages are prepended
     *  (infinite scroll-back). indexDelta = number of messages prepended;
     *  heightDelta = content height growth in rows. */
    shiftDivider: (indexDelta: number, heightDelta: number) => void;
};
/**
 * Counts assistant turns in messages[dividerIndex..end). A "turn" is what
 * users think of as "a new message from Claude" — not raw assistant entries
 * (one turn yields multiple entries: tool_use blocks + text blocks). We count
 * non-assistant→assistant transitions, but only for entries that actually
 * carry text — tool-use-only entries are skipped (like progress messages)
 * so "⏺ Searched for 13 patterns, read 6 files" doesn't tick the pill.
 */
export declare function countUnseenAssistantTurns(messages: readonly Message[], dividerIndex: number): number;
export type UnseenDivider = {
    firstUnseenUuid: Message['uuid'];
    count: number;
};
/**
 * Builds the unseenDivider object REPL passes to Messages + the pill.
 * Returns undefined only when no content has arrived past the divider
 * yet (messages[dividerIndex] doesn't exist). Once ANY message arrives
 * — including tool_use-only assistant entries and tool_result user entries
 * that countUnseenAssistantTurns skips — count floors at 1 so the pill
 * flips from "Jump to bottom" to "1 new message". Without the floor,
 * the pill stays "Jump to bottom" through an entire tool-call sequence
 * until Claude's text response lands.
 */
export declare function computeUnseenDivider(messages: readonly Message[], dividerIndex: number | null): UnseenDivider | undefined;
/**
 * Layout wrapper for the REPL. In fullscreen mode, puts scrollable
 * content in a sticky-scroll box and pins bottom content via flexbox.
 * Outside fullscreen mode, renders content sequentially so the existing
 * main-screen scrollback rendering works unchanged.
 *
 * Fullscreen mode defaults on for ants (CLAUDE_CODE_NO_FLICKER=0 to opt out)
 * and off for external users (CLAUDE_CODE_NO_FLICKER=1 to opt in).
 * The <AlternateScreen> wrapper
 * (alt buffer + mouse tracking + height constraint) lives at REPL's root
 * so nothing can accidentally render outside it.
 */
export declare function FullscreenLayout(t0: any): any;
//# sourceMappingURL=FullscreenLayout.d.ts.map