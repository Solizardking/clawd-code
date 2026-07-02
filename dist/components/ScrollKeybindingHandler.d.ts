import React, { type RefObject } from 'react';
import type { ScrollBoxHandle } from '../ink/components/ScrollBox.js';
import type { FocusMove, SelectionState } from '../ink/selection.js';
import { type Key } from '../ink.js';
type Props = {
    scrollRef: RefObject<ScrollBoxHandle | null>;
    isActive: boolean;
    /** Called after every scroll action with the resulting sticky state and
     *  the handle (for reading scrollTop/scrollHeight post-scroll). */
    onScroll?: (sticky: boolean, handle: ScrollBoxHandle) => void;
    /** Enables modal pager keys (g/G, ctrl+u/d/b/f). Only safe when there
     *  is no text input competing for those characters — i.e. transcript
     *  mode. Defaults to false. When true, G works regardless of editorMode
     *  and sticky state; ctrl+u/d/b/f don't conflict with kill-line/exit/
     *  task:background/kill-agents (none are mounted, or they mount after
     *  this component so stopImmediatePropagation wins). */
    isModal?: boolean;
};
/**
 * Whether a keypress should clear the virtual text selection. Mimics
 * native terminal selection: any keystroke clears, EXCEPT modified nav
 * keys (shift/opt/cmd + arrow/home/end/page*). In native macOS contexts,
 * shift+nav extends selection, and cmd/opt+nav are often intercepted by
 * the terminal emulator for scrollback nav — neither disturbs selection.
 * Bare arrows DO clear (user's cursor moves, native deselects). Wheel is
 * excluded — scroll:lineUp/Down already clears via the keybinding path.
 */
export declare function shouldClearSelectionOnKey(key: Key): boolean;
/**
 * Map a keypress to a selection focus move (keyboard extension). Only
 * shift extends — that's the universal text-selection modifier. cmd
 * (super) only arrives via kitty keyboard protocol — in most terminals
 * cmd+arrow is intercepted by the emulator and never reaches the pty, so
 * no super branch. shift+home/end covers line-edge jumps (and fn+shift+
 * left/right on mac laptops = shift+home/end). shift+opt (word-jump) not
 * yet implemented — falls through to shouldClearSelectionOnKey which
 * preserves (modified nav). Returns null for non-extend keys.
 */
export declare function selectionFocusMoveForKey(key: Key): FocusMove | null;
export type WheelAccelState = {
    time: number;
    mult: number;
    dir: 0 | 1 | -1;
    xtermJs: boolean;
    /** Carried fractional scroll (xterm.js only). scrollBy floors, so without
     *  this a mult of 1.5 gives 1 row every time. Carrying the remainder gives
     *  1,2,1,2 on average for mult=1.5 — correct throughput over time. */
    frac: number;
    /** Native-path baseline rows/event. Reset value on idle/reversal; ramp
     *  builds on top. xterm.js path ignores this (own kick=2 tuning). */
    base: number;
    /** Deferred direction flip (native only). Might be encoder bounce or a
     *  real reversal — resolved by the NEXT event. Real reversal loses 1 row
     *  of latency; bounce is swallowed and triggers wheel mode. The flip's
     *  direction and timestamp are derivable (it's always -state.dir at
     *  state.time) so this is just a marker. */
    pendingFlip: boolean;
    /** Set true once a bounce is confirmed (flip-then-flip-back within
     *  BOUNCE_GAP_MAX). Sticky — but disengaged on idle gap >1500ms OR a
     *  trackpad-signature burst (see burstCount). State lives in a useRef so
     *  it persists across device switches; the disengages handle mouse→trackpad. */
    wheelMode: boolean;
    /** Consecutive <5ms events. Trackpad flick produces 100+ at <5ms; mouse
     *  produces ≤3 (verified in /tmp/wheel-tune.txt). 5+ in a row → trackpad
     *  signature → disengage wheel mode so device-switch doesn't leak mouse
     *  accel to trackpad. */
    burstCount: number;
};
/** Compute rows for one wheel event, mutating accel state. Returns 0 when
 *  a direction flip is deferred for bounce detection — call sites no-op on
 *  step=0 (scrollBy(0) is a no-op, onScroll(false) is idempotent). Exported
 *  for tests. */
export declare function computeWheelStep(state: WheelAccelState, dir: 1 | -1, now: number): number;
/** Read CLAUDE_CODE_SCROLL_SPEED, default 1, clamp (0, 20].
 *  Some terminals pre-multiply wheel events (ghostty discrete=3, iTerm2
 *  "faster scroll") — base=1 is correct there. Others send 1 event/notch —
 *  set CLAUDE_CODE_SCROLL_SPEED=3 to match vim/nvim/opencode. We can't
 *  detect which kind of terminal we're in, hence the knob. Called lazily
 *  from initAndLogWheelAccel so globalSettings.env has loaded. */
export declare function readScrollSpeedBase(): number;
/** Initial wheel accel state. xtermJs=true selects the decay curve.
 *  base is the native-path baseline rows/event (default 1). */
export declare function initWheelAccel(xtermJs?: boolean, base?: number): WheelAccelState;
/**
 * Keyboard scroll navigation for the fullscreen layout's message scroll box.
 * PgUp/PgDn scroll by half-viewport. Mouse wheel scrolls by a few lines.
 * Scrolling breaks sticky mode; Ctrl+End re-enables it. Wheeling down at
 * the bottom also re-enables sticky so new content follows naturally.
 */
export declare function ScrollKeybindingHandler({ scrollRef, isActive, onScroll, isModal }: Props): React.ReactNode;
/**
 * Compute autoscroll direction for a drag selection relative to the ScrollBox
 * viewport. Returns 0 when not dragging, anchor/focus missing, or the anchor
 * is outside the viewport — a multi-click or drag that started in the input
 * area must not commandeer the message scroll (double-click in the input area
 * while scrolled up previously corrupted the anchor via shiftAnchor and
 * spuriously scrolled the message history every 50ms until release).
 *
 * alreadyScrollingDir bypasses the anchor-in-viewport guard once autoscroll
 * is active (shiftAnchor legitimately clamps the anchor toward row 0, below
 * `top`) but only allows SAME-direction continuation. If the focus jumps to
 * the opposite edge (below→above or above→below — possible with a fast flick
 * or off-window drag since mode 1002 reports on cell change, not per cell),
 * returns 0 to stop — reversing without clearing scrolledOffAbove/Below
 * would duplicate captured rows when they scroll back on-screen.
 */
export declare function dragScrollDirection(sel: SelectionState | null, top: number, bottom: number, alreadyScrollingDir?: -1 | 0 | 1): -1 | 0 | 1;
export declare function jumpBy(s: ScrollBoxHandle, delta: number): boolean;
export declare function scrollUp(s: ScrollBoxHandle, amount: number): void;
export type ModalPagerAction = 'lineUp' | 'lineDown' | 'halfPageUp' | 'halfPageDown' | 'fullPageUp' | 'fullPageDown' | 'top' | 'bottom';
/**
 * Maps a keystroke to a modal pager action. Exported for testing.
 * Returns null for keys the modal pager doesn't handle (they fall through).
 *
 * ctrl+u/d/b/f are the less-lineage bindings. g/G are bare letters (only
 * safe when no prompt is mounted). G arrives as input='G' shift=false on
 * legacy terminals, or input='g' shift=true on kitty-protocol terminals.
 * Lowercase g needs the !shift guard so it doesn't also match kitty-G.
 *
 * Key-repeat: stdin coalesces held-down printables into one multi-char
 * string (e.g. 'ggg'). Only uniform-char batches are handled — mixed input
 * like 'gG' isn't key-repeat. g/G are idempotent absolute jumps, so the
 * count is irrelevant (consuming the batch just prevents it from leaking
 * to the selection-clear-on-printable handler).
 */
export declare function modalPagerAction(input: string, key: Pick<Key, 'ctrl' | 'meta' | 'shift' | 'upArrow' | 'downArrow' | 'home' | 'end'>): ModalPagerAction | null;
/**
 * Applies a modal pager action to a ScrollBox. Returns the resulting sticky
 * state, or null if the action was null (nothing to do — caller should fall
 * through). Calls onBeforeJump(delta) before scrolling so the caller can
 * translate the text selection by the scroll delta (capture outgoing rows,
 * shift anchor+focus) instead of clearing it. Exported for testing.
 */
export declare function applyModalPagerAction(s: ScrollBoxHandle, act: ModalPagerAction | null, onBeforeJump: (delta: number) => void): boolean | null;
export {};
//# sourceMappingURL=ScrollKeybindingHandler.d.ts.map