export type HorizontalScrollWindow = {
    startIndex: number;
    endIndex: number;
    showLeftArrow: boolean;
    showRightArrow: boolean;
};
/**
 * Calculate the visible window of items that fit within available width,
 * ensuring the selected item is always visible. Uses edge-based scrolling:
 * the window only scrolls when the selected item would be outside the visible
 * range, and positions the selected item at the edge (not centered).
 *
 * @param itemWidths - Array of item widths (each width should include separator if applicable)
 * @param availableWidth - Total available width for items
 * @param arrowWidth - Width of scroll indicator arrow (including space)
 * @param selectedIdx - Index of selected item (must stay visible)
 * @param firstItemHasSeparator - Whether first item's width includes a separator that should be ignored
 * @returns Visible window bounds and whether to show scroll arrows
 */
export declare function calculateHorizontalScrollWindow(itemWidths: number[], availableWidth: number, arrowWidth: number, selectedIdx: number, firstItemHasSeparator?: boolean): HorizontalScrollWindow;
//# sourceMappingURL=horizontalScroll.d.ts.map