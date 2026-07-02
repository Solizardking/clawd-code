export declare const LayoutEdge: {
    readonly All: "all";
    readonly Horizontal: "horizontal";
    readonly Vertical: "vertical";
    readonly Left: "left";
    readonly Right: "right";
    readonly Top: "top";
    readonly Bottom: "bottom";
    readonly Start: "start";
    readonly End: "end";
};
export type LayoutEdge = (typeof LayoutEdge)[keyof typeof LayoutEdge];
export declare const LayoutGutter: {
    readonly All: "all";
    readonly Column: "column";
    readonly Row: "row";
};
export type LayoutGutter = (typeof LayoutGutter)[keyof typeof LayoutGutter];
export declare const LayoutDisplay: {
    readonly Flex: "flex";
    readonly None: "none";
};
export type LayoutDisplay = (typeof LayoutDisplay)[keyof typeof LayoutDisplay];
export declare const LayoutFlexDirection: {
    readonly Row: "row";
    readonly RowReverse: "row-reverse";
    readonly Column: "column";
    readonly ColumnReverse: "column-reverse";
};
export type LayoutFlexDirection = (typeof LayoutFlexDirection)[keyof typeof LayoutFlexDirection];
export declare const LayoutAlign: {
    readonly Auto: "auto";
    readonly Stretch: "stretch";
    readonly FlexStart: "flex-start";
    readonly Center: "center";
    readonly FlexEnd: "flex-end";
};
export type LayoutAlign = (typeof LayoutAlign)[keyof typeof LayoutAlign];
export declare const LayoutJustify: {
    readonly FlexStart: "flex-start";
    readonly Center: "center";
    readonly FlexEnd: "flex-end";
    readonly SpaceBetween: "space-between";
    readonly SpaceAround: "space-around";
    readonly SpaceEvenly: "space-evenly";
};
export type LayoutJustify = (typeof LayoutJustify)[keyof typeof LayoutJustify];
export declare const LayoutWrap: {
    readonly NoWrap: "nowrap";
    readonly Wrap: "wrap";
    readonly WrapReverse: "wrap-reverse";
};
export type LayoutWrap = (typeof LayoutWrap)[keyof typeof LayoutWrap];
export declare const LayoutPositionType: {
    readonly Relative: "relative";
    readonly Absolute: "absolute";
};
export type LayoutPositionType = (typeof LayoutPositionType)[keyof typeof LayoutPositionType];
export declare const LayoutOverflow: {
    readonly Visible: "visible";
    readonly Hidden: "hidden";
    readonly Scroll: "scroll";
};
export type LayoutOverflow = (typeof LayoutOverflow)[keyof typeof LayoutOverflow];
export type LayoutMeasureFunc = (width: number, widthMode: LayoutMeasureMode) => {
    width: number;
    height: number;
};
export declare const LayoutMeasureMode: {
    readonly Undefined: "undefined";
    readonly Exactly: "exactly";
    readonly AtMost: "at-most";
};
export type LayoutMeasureMode = (typeof LayoutMeasureMode)[keyof typeof LayoutMeasureMode];
export type LayoutNode = {
    insertChild(child: LayoutNode, index: number): void;
    removeChild(child: LayoutNode): void;
    getChildCount(): number;
    getParent(): LayoutNode | null;
    calculateLayout(width?: number, height?: number): void;
    setMeasureFunc(fn: LayoutMeasureFunc): void;
    unsetMeasureFunc(): void;
    markDirty(): void;
    getComputedLeft(): number;
    getComputedTop(): number;
    getComputedWidth(): number;
    getComputedHeight(): number;
    getComputedBorder(edge: LayoutEdge): number;
    getComputedPadding(edge: LayoutEdge): number;
    setWidth(value: number): void;
    setWidthPercent(value: number): void;
    setWidthAuto(): void;
    setHeight(value: number): void;
    setHeightPercent(value: number): void;
    setHeightAuto(): void;
    setMinWidth(value: number): void;
    setMinWidthPercent(value: number): void;
    setMinHeight(value: number): void;
    setMinHeightPercent(value: number): void;
    setMaxWidth(value: number): void;
    setMaxWidthPercent(value: number): void;
    setMaxHeight(value: number): void;
    setMaxHeightPercent(value: number): void;
    setFlexDirection(dir: LayoutFlexDirection): void;
    setFlexGrow(value: number): void;
    setFlexShrink(value: number): void;
    setFlexBasis(value: number): void;
    setFlexBasisPercent(value: number): void;
    setFlexWrap(wrap: LayoutWrap): void;
    setAlignItems(align: LayoutAlign): void;
    setAlignSelf(align: LayoutAlign): void;
    setJustifyContent(justify: LayoutJustify): void;
    setDisplay(display: LayoutDisplay): void;
    getDisplay(): LayoutDisplay;
    setPositionType(type: LayoutPositionType): void;
    setPosition(edge: LayoutEdge, value: number): void;
    setPositionPercent(edge: LayoutEdge, value: number): void;
    setOverflow(overflow: LayoutOverflow): void;
    setMargin(edge: LayoutEdge, value: number): void;
    setPadding(edge: LayoutEdge, value: number): void;
    setBorder(edge: LayoutEdge, value: number): void;
    setGap(gutter: LayoutGutter, value: number): void;
    free(): void;
    freeRecursive(): void;
};
//# sourceMappingURL=node.d.ts.map