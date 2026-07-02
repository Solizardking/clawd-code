import type { DOMElement } from './dom.js';
import type { Rectangle } from './layout/geometry.js';
/**
 * Cached layout bounds for each rendered node (used for blit + clearing).
 * `top` is the yoga-local getComputedTop() — stored so ScrollBox viewport
 * culling can skip yoga reads for clean children whose position hasn't
 * shifted (O(dirty) instead of O(mounted) first-pass).
 */
export type CachedLayout = {
    x: number;
    y: number;
    width: number;
    height: number;
    top?: number;
};
export declare const nodeCache: WeakMap<DOMElement, CachedLayout>;
/** Rects of removed children that need clearing on next render */
export declare const pendingClears: WeakMap<DOMElement, Rectangle[]>;
export declare function addPendingClear(parent: DOMElement, rect: Rectangle, isAbsolute: boolean): void;
export declare function consumeAbsoluteRemovedFlag(): boolean;
//# sourceMappingURL=node-cache.d.ts.map