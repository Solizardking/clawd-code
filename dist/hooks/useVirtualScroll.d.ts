import type { RefObject } from 'react';
import type { ScrollBoxHandle } from '../ink/components/ScrollBox.js';
import type { DOMElement } from '../ink/dom.js';
export type VirtualScrollResult = {
    /** [startIndex, endIndex) half-open slice of items to render. */
    range: readonly [number, number];
    /** Height (rows) of spacer before the first rendered item. */
    topSpacer: number;
    /** Height (rows) of spacer after the last rendered item. */
    bottomSpacer: number;
    /**
     * Callback ref factory. Attach `measureRef(itemKey)` to each rendered
     * item's root Box; after Yoga layout, the computed height is cached.
     */
    measureRef: (key: string) => (el: DOMElement | null) => void;
    /**
     * Attach to the topSpacer Box. Its Yoga computedTop IS listOrigin
     * (first child of the virtualized region, so its top = cumulative
     * height of everything rendered before the list in the ScrollBox).
     * Drift-free: no subtraction of offsets, no dependence on item
     * heights that change between renders (tmux resize).
     */
    spacerRef: RefObject<DOMElement | null>;
    /**
     * Cumulative y-offset of each item in list-wrapper coords (NOT scrollbox
     * coords — logo/siblings before this list shift the origin).
     * offsets[i] = rows above item i; offsets[n] = totalHeight.
     * Recomputed every render — don't memo on identity.
     */
    offsets: ArrayLike<number>;
    /**
     * Read Yoga computedTop for item at index. Returns -1 if the item isn't
     * mounted or hasn't been laid out. Item Boxes are direct Yoga children
     * of the ScrollBox content wrapper (fragments collapse in the Ink DOM),
     * so this is content-wrapper-relative — same coordinate space as
     * scrollTop. Yoga layout is scroll-independent (translation happens
     * later in renderNodeToOutput), so positions stay valid across scrolls
     * without waiting for Ink to re-render. StickyTracker walks the mount
     * range with this to find the viewport boundary at per-scroll-tick
     * granularity (finer than the 40-row quantum this hook re-renders at).
     */
    getItemTop: (index: number) => number;
    /**
     * Get the mounted DOMElement for item at index, or null. For
     * ScrollBox.scrollToElement — anchoring by element ref defers the
     * Yoga-position read to render time (deterministic; no throttle race).
     */
    getItemElement: (index: number) => DOMElement | null;
    /** Measured Yoga height. undefined = not yet measured; 0 = rendered nothing. */
    getItemHeight: (index: number) => number | undefined;
    /**
     * Scroll so item `i` is in the mounted range. Sets scrollTop =
     * offsets[i] + listOrigin. The range logic finds start from
     * scrollTop vs offsets[] — BOTH use the same offsets value, so they
     * agree by construction regardless of whether offsets[i] is the
     * "true" position. Item i mounts; its screen position may be off by
     * a few-dozen rows (overscan-worth of estimate drift), but it's in
     * the DOM. Follow with getItemTop(i) for the precise position.
     */
    scrollToIndex: (i: number) => void;
};
/**
 * React-level virtualization for items inside a ScrollBox.
 *
 * The ScrollBox already does Ink-output-level viewport culling
 * (render-node-to-output.ts:617 skips children outside the visible window),
 * but all React fibers + Yoga nodes are still allocated. At ~250 KB RSS per
 * MessageRow, a 1000-message session costs ~250 MB of grow-only memory
 * (Ink screen buffer, WASM linear memory, JSC page retention all grow-only).
 *
 * This hook mounts only items in viewport + overscan. Spacer boxes hold the
 * scroll height constant for the rest at O(1) fiber cost each.
 *
 * Height estimation: fixed DEFAULT_ESTIMATE for unmeasured items, replaced
 * by real Yoga heights after first layout. No scroll anchoring — overscan
 * absorbs estimate errors. If drift is noticeable in practice, anchoring
 * (scrollBy(delta) when topSpacer changes) is a straightforward followup.
 *
 * stickyScroll caveat: render-node-to-output.ts:450 sets scrollTop=maxScroll
 * during Ink's render phase, which does NOT fire ScrollBox.subscribe. The
 * at-bottom check below handles this — when pinned to the bottom, we render
 * the last N items regardless of what scrollTop claims.
 */
export declare function useVirtualScroll(scrollRef: RefObject<ScrollBoxHandle | null>, itemKeys: readonly string[], 
/**
 * Terminal column count. On change, cached heights are stale (text
 * rewraps) — SCALED by oldCols/newCols rather than cleared. Clearing
 * made the pessimistic coverage back-walk mount ~190 items (every
 * uncached item → PESSIMISTIC_HEIGHT=1 → walk 190 to reach
 * viewport+2×overscan). Each fresh mount runs marked.lexer + syntax
 * highlighting ≈ 3ms; ~600ms React reconcile on first resize with a
 * long conversation. Scaling keeps heightCache populated → back-walk
 * uses real-ish heights → mount range stays tight. Scaled estimates
 * are overwritten by real Yoga heights on next useLayoutEffect.
 *
 * Scaled heights are close enough that the black-screen-on-widen bug
 * (inflated pre-resize offsets overshoot post-resize scrollTop → end
 * loop stops short of tail) doesn't trigger: ratio<1 on widen scales
 * heights DOWN, keeping offsets roughly aligned with post-resize Yoga.
 */
columns: number): VirtualScrollResult;
//# sourceMappingURL=useVirtualScroll.d.ts.map