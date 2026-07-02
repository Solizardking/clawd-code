import type { DOMElement } from './dom.js';
import type Output from './output.js';
import type { Screen } from './screen.js';
import { type StyledSegment } from './squash-text-nodes.js';
import type { Color } from './styles.js';
export declare function resetLayoutShifted(): void;
export declare function didLayoutShift(): boolean;
export type ScrollHint = {
    top: number;
    bottom: number;
    delta: number;
};
export declare function resetScrollHint(): void;
export declare function getScrollHint(): ScrollHint | null;
export declare function resetScrollDrainNode(): void;
export declare function getScrollDrainNode(): DOMElement | null;
export type FollowScroll = {
    delta: number;
    viewportTop: number;
    viewportBottom: number;
};
export declare function consumeFollowScroll(): FollowScroll | null;
/**
 * Build a mapping from each character position in the plain text to its segment index.
 * Returns an array where charToSegment[i] is the segment index for character i.
 */
declare function buildCharToSegmentMap(segments: StyledSegment[]): number[];
/**
 * Apply styles to wrapped text by mapping each character back to its original segment.
 * This preserves per-segment styles even when text wraps across lines.
 *
 * @param trimEnabled - Whether whitespace trimming is enabled (wrap-trim mode).
 *   When true, we skip whitespace in the original that was trimmed from the output.
 *   When false (wrap mode), all whitespace is preserved so no skipping is needed.
 */
declare function applyStylesToWrappedText(wrappedPlain: string, segments: StyledSegment[], charToSegment: number[], originalPlain: string, trimEnabled?: boolean): string;
declare function renderNodeToOutput(node: DOMElement, output: Output, { offsetX, offsetY, prevScreen, skipSelfBlit, inheritedBackgroundColor, }: {
    offsetX?: number;
    offsetY?: number;
    prevScreen: Screen | undefined;
    skipSelfBlit?: boolean;
    inheritedBackgroundColor?: Color;
}): void;
export { buildCharToSegmentMap, applyStylesToWrappedText };
export default renderNodeToOutput;
//# sourceMappingURL=render-node-to-output.d.ts.map