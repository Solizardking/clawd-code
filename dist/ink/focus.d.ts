import type { DOMElement } from './dom.js';
import { FocusEvent } from './events/focus-event.js';
/**
 * DOM-like focus manager for the Ink terminal UI.
 *
 * Pure state — tracks activeElement and a focus stack. Has no reference
 * to the tree; callers pass the root when tree walks are needed.
 *
 * Stored on the root DOMElement so any node can reach it by walking
 * parentNode (like browser's `node.ownerDocument`).
 */
export declare class FocusManager {
    activeElement: DOMElement | null;
    private dispatchFocusEvent;
    private enabled;
    private focusStack;
    constructor(dispatchFocusEvent: (target: DOMElement, event: FocusEvent) => boolean);
    focus(node: DOMElement): void;
    blur(): void;
    /**
     * Called by the reconciler when a node is removed from the tree.
     * Handles both the exact node and any focused descendant within
     * the removed subtree. Dispatches blur and restores focus from stack.
     */
    handleNodeRemoved(node: DOMElement, root: DOMElement): void;
    handleAutoFocus(node: DOMElement): void;
    handleClickFocus(node: DOMElement): void;
    enable(): void;
    disable(): void;
    focusNext(root: DOMElement): void;
    focusPrevious(root: DOMElement): void;
    private moveFocus;
}
/**
 * Walk up to root and return it. The root is the node that holds
 * the FocusManager — like browser's `node.getRootNode()`.
 */
export declare function getRootNode(node: DOMElement): DOMElement;
/**
 * Walk up to root and return its FocusManager.
 * Like browser's `node.ownerDocument` — focus belongs to the root.
 */
export declare function getFocusManager(node: DOMElement): FocusManager;
//# sourceMappingURL=focus.d.ts.map