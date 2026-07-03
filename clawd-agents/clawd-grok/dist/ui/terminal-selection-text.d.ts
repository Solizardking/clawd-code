import type { Renderable } from "@opentui/core";
/** Subset of OpenTUI Selection used for clipboard (avoid private package subpaths). */
export type TuiSelectionSnapshot = {
    selectedRenderables: Renderable[];
    bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    anchor: {
        x: number;
        y: number;
    };
    getSelectedText(): string;
};
/**
 * OpenTUI's Selection.getSelectedText() concatenates every intersected text buffer. In markdown-heavy
 * UIs a tiny drag can still hit dozens/hundreds of sibling line renderables. We narrow to leaf buffers,
 * optionally to the selection midpoint for thin rects, and fall back to the anchor cell's smallest buffer
 * when the joined text is still huge.
 */
export declare function getCompactTuiSelectionText(selection: TuiSelectionSnapshot): string;
