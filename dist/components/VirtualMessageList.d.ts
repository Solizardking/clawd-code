import type { RefObject } from 'react';
import * as React from 'react';
import type { ScrollBoxHandle } from '../ink/components/ScrollBox.js';
import type { DOMElement } from '../ink/dom.js';
import type { MatchPosition } from '../ink/render-to-screen.js';
import type { RenderableMessage } from '../types/message.js';
import { type MessageActionsNav, type MessageActionsState } from './messageActions.js';
export type StickyPrompt = {
    text: string;
    scrollTo: () => void;
} | 'clicked';
/** Imperative handle for transcript navigation. Methods compute matches
 *  HERE (renderableMessages indices are only valid inside this component —
 *  Messages.tsx filters and reorders, REPL can't compute externally). */
export type JumpHandle = {
    jumpToIndex: (i: number) => void;
    setSearchQuery: (q: string) => void;
    nextMatch: () => void;
    prevMatch: () => void;
    /** Capture current scrollTop as the incsearch anchor. Typing jumps
     *  around as preview; 0-matches snaps back here. Enter/n/N never
     *  restore (they don't call setSearchQuery with empty). Next / call
     *  overwrites. */
    setAnchor: () => void;
    /** Warm the search-text cache by extracting every message's text.
     *  Returns elapsed ms, or 0 if already warm (subsequent / in same
     *  transcript session). Yields before work so the caller can paint
     *  "indexing…" first. Caller shows "indexed in Xms" on resolve. */
    warmSearchIndex: () => Promise<number>;
    /** Manual scroll (j/k/PgUp/wheel) exited the search context. Clear
     *  positions (yellow goes away, inverse highlights stay). Next n/N
     *  re-establishes via step()→jump(). Wired from ScrollKeybindingHandler's
     *  onScroll — only fires for keyboard/wheel, not programmatic scrollTo. */
    disarmSearch: () => void;
};
type Props = {
    messages: RenderableMessage[];
    scrollRef: RefObject<ScrollBoxHandle | null>;
    /** Invalidates heightCache on change — cached heights from a different
     *  width are wrong (text rewrap → black screen on scroll-up after widen). */
    columns: number;
    itemKey: (msg: RenderableMessage) => string;
    renderItem: (msg: RenderableMessage, index: number) => React.ReactNode;
    /** Fires when a message Box is clicked (toggle per-message verbose). */
    onItemClick?: (msg: RenderableMessage) => void;
    /** Per-item filter — suppress hover/click for messages where the verbose
     *  toggle does nothing (text, file edits, etc). Defaults to all-clickable. */
    isItemClickable?: (msg: RenderableMessage) => boolean;
    /** Expanded items get a persistent grey bg (not just on hover). */
    isItemExpanded?: (msg: RenderableMessage) => boolean;
    /** PRE-LOWERED search text. Messages.tsx caches the lowered result
     *  once at warm time so setSearchQuery's per-keystroke loop does
     *  only indexOf (zero toLowerCase alloc). Falls back to a lowering
     *  wrapper on renderableSearchText for callers without the cache. */
    extractSearchText?: (msg: RenderableMessage) => string;
    /** Enable the sticky-prompt tracker. StickyTracker writes via
     *  ScrollChromeContext (not a callback prop) so state lives in
     *  FullscreenLayout instead of REPL. */
    trackStickyPrompt?: boolean;
    selectedIndex?: number;
    /** Nav handle lives here because height measurement lives here. */
    cursorNavRef?: React.Ref<MessageActionsNav>;
    setCursor?: (c: MessageActionsState | null) => void;
    jumpRef?: RefObject<JumpHandle | null>;
    /** Fires when search matches change (query edit, n/N). current is
     *  1-based for "3/47" display; 0 means no matches. */
    onSearchMatchesChange?: (count: number, current: number) => void;
    /** Paint existing DOM subtree to fresh Screen, scan. Element from the
     *  main tree (all providers). Message-relative positions (row 0 = el
     *  top). Works for any height — closes the tall-message gap. */
    scanElement?: (el: DOMElement) => MatchPosition[];
    /** Position-based CURRENT highlight. Positions known upfront (from
     *  scanElement), navigation = index arithmetic + scrollTo. rowOffset
     *  = message's current screen-top; positions stay stable. */
    setPositions?: (state: {
        positions: MatchPosition[];
        rowOffset: number;
        currentIdx: number;
    } | null) => void;
};
export declare function VirtualMessageList({ messages, scrollRef, columns, itemKey, renderItem, onItemClick, isItemClickable, isItemExpanded, extractSearchText, trackStickyPrompt, selectedIndex, cursorNavRef, setCursor, jumpRef, onSearchMatchesChange, scanElement, setPositions }: Props): React.ReactNode;
export {};
//# sourceMappingURL=VirtualMessageList.d.ts.map