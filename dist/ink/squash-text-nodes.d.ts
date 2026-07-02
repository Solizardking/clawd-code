import type { DOMElement } from './dom.js';
import type { TextStyles } from './styles.js';
/**
 * A segment of text with its associated styles.
 * Used for structured rendering without ANSI string transforms.
 */
export type StyledSegment = {
    text: string;
    styles: TextStyles;
    hyperlink?: string;
};
/**
 * Squash text nodes into styled segments, propagating styles down through the tree.
 * This allows structured styling without relying on ANSI string transforms.
 */
export declare function squashTextNodesToSegments(node: DOMElement, inheritedStyles?: TextStyles, inheritedHyperlink?: string, out?: StyledSegment[]): StyledSegment[];
/**
 * Squash text nodes into a plain string (without styles).
 * Used for text measurement in layout calculations.
 */
declare function squashTextNodes(node: DOMElement): string;
export default squashTextNodes;
//# sourceMappingURL=squash-text-nodes.d.ts.map