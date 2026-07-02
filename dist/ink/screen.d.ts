import { type AnsiCode } from '@alcalzone/ansi-tokenize';
import { type Point, type Rectangle, type Size } from './layout/geometry.js';
export declare class CharPool {
    private strings;
    private stringMap;
    private ascii;
    intern(char: string): number;
    get(index: number): string;
}
export declare class HyperlinkPool {
    private strings;
    private stringMap;
    intern(hyperlink: string | undefined): number;
    get(id: number): string | undefined;
}
export declare class StylePool {
    private ids;
    private styles;
    private transitionCache;
    readonly none: number;
    constructor();
    /**
     * Intern a style and return its ID. Bit 0 of the ID encodes whether the
     * style has a visible effect on space characters (background, inverse,
     * underline, etc.). Foreground-only styles get even IDs; styles visible
     * on spaces get odd IDs. This lets the renderer skip invisible spaces
     * with a single bitmask check on the packed word.
     */
    intern(styles: AnsiCode[]): number;
    /** Recover styles from an encoded ID. Strips the bit-0 flag via >>> 1. */
    get(id: number): AnsiCode[];
    /**
     * Returns the pre-serialized ANSI string to transition from one style to
     * another. Cached by (fromId, toId) — zero allocations after first call
     * for a given pair.
     */
    transition(fromId: number, toId: number): string;
    /**
     * Intern a style that is `base + inverse`. Cached by base ID so
     * repeated calls for the same underlying style don't re-scan the
     * AnsiCode[] array. Used by the selection overlay.
     */
    private inverseCache;
    withInverse(baseId: number): number;
    /** Inverse + bold + yellow-bg-via-fg-swap for the CURRENT search match.
     *  OTHER matches are plain inverse — bg inherits from the theme. Current
     *  gets a distinct yellow bg (via fg-then-inverse swap) plus bold weight
     *  so it stands out in a sea of inverse. Underline was too subtle. Zero
     *  reflow risk: all pure SGR overlays, per-cell, post-layout. The yellow
     *  overrides any existing fg (syntax highlighting) on those cells — fine,
     *  the "you are here" signal IS the point, syntax color can yield. */
    private currentMatchCache;
    withCurrentMatch(baseId: number): number;
    /**
     * Selection overlay: REPLACE the cell's background with a solid color
     * while preserving its foreground (color, bold, italic, dim, underline).
     * Matches native terminal selection — a dedicated bg color, not SGR-7
     * inverse. Inverse swaps fg/bg per-cell, which fragments visually over
     * syntax-highlighted text (every fg color becomes a different bg stripe).
     *
     * Strips any existing bg (endCode 49m — REPLACES, so diff-added green
     * etc. don't bleed through) and any existing inverse (endCode 27m —
     * inverse on top of a solid bg would re-swap and look wrong).
     *
     * bg is set via setSelectionBg(); null → fallback to withInverse() so the
     * overlay still works before theme wiring sets a color (tests, first frame).
     * Cache is keyed by baseId only — setSelectionBg() clears it on change.
     */
    private selectionBgCode;
    private selectionBgCache;
    setSelectionBg(bg: AnsiCode | null): void;
    withSelectionBg(baseId: number): number;
}
/**
 * Cell width classification for handling double-wide characters (CJK, emoji,
 * etc.)
 *
 * We use explicit spacer cells rather than inferring width at render time. This
 * makes the data structure self-describing and simplifies cursor positioning
 * logic.
 *
 * @see https://mitchellh.com/writing/grapheme-clusters-in-terminals
 */
export declare const enum CellWidth {
    Narrow = 0,
    Wide = 1,
    SpacerTail = 2,
    SpacerHead = 3
}
export type Hyperlink = string | undefined;
/**
 * Cell is a view type returned by cellAt(). Cells are stored as packed typed
 * arrays internally to avoid GC pressure from allocating objects per cell.
 */
export type Cell = {
    char: string;
    styleId: number;
    width: CellWidth;
    hyperlink: Hyperlink;
};
/**
 * Screen uses a packed Int32Array instead of Cell objects to eliminate GC
 * pressure. For a 200x120 screen, this avoids allocating 24,000 objects.
 *
 * Cell data is stored as 2 Int32s per cell in a single contiguous array:
 *   word0: charId (full 32 bits — index into CharPool)
 *   word1: styleId[31:17] | hyperlinkId[16:2] | width[1:0]
 *
 * This layout halves memory accesses in diffEach (2 int loads vs 4) and
 * enables future SIMD comparison via Bun.indexOfFirstDifference.
 */
export type Screen = Size & {
    cells: Int32Array;
    cells64: BigInt64Array;
    charPool: CharPool;
    hyperlinkPool: HyperlinkPool;
    emptyStyleId: number;
    /**
     * Bounding box of cells that were written to (not blitted) during rendering.
     * Used by diff() to limit iteration to only the region that could have changed.
     */
    damage: Rectangle | undefined;
    /**
     * Per-cell noSelect bitmap — 1 byte per cell, 1 = exclude from text
     * selection (copy + highlight). Used by <NoSelect> to mark gutters
     * (line numbers, diff sigils) so click-drag over a diff yields clean
     * copyable code. Fully reset each frame in resetScreen; blitRegion
     * copies it alongside cells so the blit optimization preserves marks.
     */
    noSelect: Uint8Array;
    /**
     * Per-ROW soft-wrap continuation marker. softWrap[r]=N>0 means row r
     * is a word-wrap continuation of row r-1 (the `\n` before it was
     * inserted by wrapAnsi, not in the source), and row r-1's written
     * content ends at absolute column N (exclusive — cells [0..N) are the
     * fragment, past N is unwritten padding). 0 means row r is NOT a
     * continuation (hard newline or first row). Selection copy checks
     * softWrap[r]>0 to join row r onto row r-1 without a newline, and
     * reads softWrap[r+1] to know row r's content end when row r+1
     * continues from it. The content-end column is needed because an
     * unwritten cell and a written-unstyled-space are indistinguishable in
     * the packed typed array (both all-zero) — without it we'd either drop
     * the word-separator space (trim) or include trailing padding (no
     * trim). This encoding (continuation-on-self, prev-content-end-here)
     * is chosen so shiftRows preserves the is-continuation semantics: when
     * row r scrolls off the top and row r+1 shifts to row r, sw[r] gets
     * old sw[r+1] — which correctly says the new row r is a continuation
     * of what's now in scrolledOffAbove. Reset each frame; copied by
     * blitRegion/shiftRows.
     */
    softWrap: Int32Array;
};
export declare function isEmptyCellAt(screen: Screen, x: number, y: number): boolean;
/**
 * Check if a Cell (view object) represents an empty cell.
 */
export declare function isCellEmpty(screen: Screen, cell: Cell): boolean;
export declare function createScreen(width: number, height: number, styles: StylePool, charPool: CharPool, hyperlinkPool: HyperlinkPool): Screen;
/**
 * Reset an existing screen for reuse, avoiding allocation of new typed arrays.
 * Resizes if needed and clears all cells to empty/unwritten state.
 *
 * For double-buffering, this allows swapping between front and back buffers
 * without allocating new Screen objects each frame.
 */
export declare function resetScreen(screen: Screen, width: number, height: number): void;
/**
 * Re-intern a screen's char and hyperlink IDs into new pools.
 * Used for generational pool reset — after migrating, the screen's
 * typed arrays contain valid IDs for the new pools, and the old pools
 * can be GC'd.
 *
 * O(width * height) but only called occasionally (e.g., between conversation turns).
 */
export declare function migrateScreenPools(screen: Screen, charPool: CharPool, hyperlinkPool: HyperlinkPool): void;
/**
 * Get a Cell view at the given position. Returns a new object each call -
 * this is intentional as cells are stored packed, not as objects.
 */
export declare function cellAt(screen: Screen, x: number, y: number): Cell | undefined;
/**
 * Get a Cell view by pre-computed array index. Skips bounds checks and
 * index computation — caller must ensure index is valid.
 */
export declare function cellAtIndex(screen: Screen, index: number): Cell;
/**
 * Get a Cell at the given index, or undefined if it has no visible content.
 * Returns undefined for spacer cells (charId 1), empty unstyled spaces, and
 * fg-only styled spaces that match lastRenderedStyleId (cursor-forward
 * produces an identical visual result, avoiding a Cell allocation).
 *
 * @param lastRenderedStyleId - styleId of the last rendered cell on this
 *   line, or -1 if none yet.
 */
export declare function visibleCellAtIndex(cells: Int32Array, charPool: CharPool, hyperlinkPool: HyperlinkPool, index: number, lastRenderedStyleId: number): Cell | undefined;
export declare function charInCellAt(screen: Screen, x: number, y: number): string | undefined;
/**
 * Set a cell, optionally creating a spacer for wide characters.
 *
 * Wide characters (CJK, emoji) occupy 2 cells in the buffer:
 * 1. First cell: Contains the actual character with width = Wide
 * 2. Second cell: Spacer cell with width = SpacerTail (empty, not rendered)
 *
 * If the cell has width = Wide, this function automatically creates the
 * corresponding SpacerTail in the next column. This two-cell model keeps
 * the buffer aligned to visual columns, making cursor positioning
 * straightforward.
 *
 * TODO: When soft-wrapping is implemented, SpacerHead cells will be explicitly
 * placed by the wrapping logic at line-end positions where wide characters
 * wrap to the next line. This function doesn't need to handle SpacerHead
 * automatically - it will be set directly by the wrapping code.
 */
export declare function setCellAt(screen: Screen, x: number, y: number, cell: Cell): void;
/**
 * Replace the styleId of a cell in-place without disturbing char, width,
 * or hyperlink. Preserves empty cells as-is (char stays ' '). Tracks damage
 * for the cell so diffEach picks up the change.
 */
export declare function setCellStyleId(screen: Screen, x: number, y: number, styleId: number): void;
/**
 * Bulk-copy a rectangular region from src to dst using TypedArray.set().
 * Single cells.set() call per row (or one call for contiguous blocks).
 * Damage is computed once for the whole region.
 *
 * Clamps negative regionX/regionY to 0 (matching clearRegion) — absolute-
 * positioned overlays in tiny terminals can compute negative screen coords.
 * maxX/maxY should already be clamped to both screen bounds by the caller.
 */
export declare function blitRegion(dst: Screen, src: Screen, regionX: number, regionY: number, maxX: number, maxY: number): void;
/**
 * Bulk-clear a rectangular region of the screen.
 * Uses BigInt64Array.fill() for fast row clears.
 * Handles wide character boundary cleanup at region edges.
 */
export declare function clearRegion(screen: Screen, regionX: number, regionY: number, regionWidth: number, regionHeight: number): void;
/**
 * Shift full-width rows within [top, bottom] (inclusive, 0-indexed) by n.
 * n > 0 shifts UP (simulating CSI n S); n < 0 shifts DOWN (CSI n T).
 * Vacated rows are cleared. Does NOT update damage. Both cells and the
 * noSelect bitmap are shifted so text-selection markers stay aligned when
 * this is applied to next.screen during scroll fast path.
 */
export declare function shiftRows(screen: Screen, top: number, bottom: number, n: number): void;
export declare const OSC8_PREFIX = "\u001B]8;";
export declare function extractHyperlinkFromStyles(styles: AnsiCode[]): Hyperlink | null;
export declare function filterOutHyperlinkStyles(styles: AnsiCode[]): AnsiCode[];
/**
 * Returns an array of all changes between two screens. Used by tests.
 * Production code should use diffEach() to avoid allocations.
 */
export declare function diff(prev: Screen, next: Screen): [point: Point, removed: Cell | undefined, added: Cell | undefined][];
type DiffCallback = (x: number, y: number, removed: Cell | undefined, added: Cell | undefined) => boolean | void;
/**
 * Like diff(), but calls a callback for each change instead of building an array.
 * Reuses two Cell objects to avoid per-change allocations. The callback must not
 * retain references to the Cell objects — their contents are overwritten each call.
 *
 * Returns true if the callback ever returned true (early exit signal).
 */
export declare function diffEach(prev: Screen, next: Screen, cb: DiffCallback): boolean;
/**
 * Mark a rectangular region as noSelect (exclude from text selection).
 * Clamps to screen bounds. Called from output.ts when a <NoSelect> box
 * renders. No damage tracking — noSelect doesn't affect terminal output,
 * only getSelectedText/applySelectionOverlay which read it directly.
 */
export declare function markNoSelectRegion(screen: Screen, x: number, y: number, width: number, height: number): void;
export {};
//# sourceMappingURL=screen.d.ts.map