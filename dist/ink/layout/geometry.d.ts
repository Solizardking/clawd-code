export type Point = {
    x: number;
    y: number;
};
export type Size = {
    width: number;
    height: number;
};
export type Rectangle = Point & Size;
/** Edge insets (padding, margin, border) */
export type Edges = {
    top: number;
    right: number;
    bottom: number;
    left: number;
};
/** Create uniform edges */
export declare function edges(all: number): Edges;
export declare function edges(vertical: number, horizontal: number): Edges;
export declare function edges(top: number, right: number, bottom: number, left: number): Edges;
/** Add two edge values */
export declare function addEdges(a: Edges, b: Edges): Edges;
/** Zero edges constant */
export declare const ZERO_EDGES: Edges;
/** Convert partial edges to full edges with defaults */
export declare function resolveEdges(partial?: Partial<Edges>): Edges;
export declare function unionRect(a: Rectangle, b: Rectangle): Rectangle;
export declare function clampRect(rect: Rectangle, size: Size): Rectangle;
export declare function withinBounds(size: Size, point: Point): boolean;
export declare function clamp(value: number, min?: number, max?: number): number;
//# sourceMappingURL=geometry.d.ts.map