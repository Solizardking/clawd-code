/**
 * Pure-TypeScript port of yoga-layout (Meta's flexbox engine).
 *
 * This matches the `yoga-layout/load` API surface used by src/ink/layout/yoga.ts.
 * The upstream C++ source is ~2500 lines in CalculateLayout.cpp alone; this port
 * is a simplified single-pass flexbox implementation that covers the subset of
 * features Ink actually uses:
 *   - flex-direction (row/column + reverse)
 *   - flex-grow / flex-shrink / flex-basis
 *   - align-items / align-self (stretch, flex-start, center, flex-end)
 *   - justify-content (all six values)
 *   - margin / padding / border / gap
 *   - width / height / min / max (point, percent, auto)
 *   - position: relative / absolute
 *   - display: flex / none
 *   - measure functions (for text nodes)
 *
 * Also implemented for spec parity (not used by Ink):
 *   - margin: auto (main + cross axis, overrides justify/align)
 *   - multi-pass flex clamping when children hit min/max constraints
 *   - flex-grow/shrink against container min/max when size is indefinite
 *
 * Also implemented for spec parity (not used by Ink):
 *   - flex-wrap: wrap / wrap-reverse (multi-line flex)
 *   - align-content (positions wrapped lines on cross axis)
 *
 * Also implemented for spec parity (not used by Ink):
 *   - display: contents (children lifted to grandparent, box removed)
 *
 * Also implemented for spec parity (not used by Ink):
 *   - baseline alignment (align-items/align-self: baseline)
 *
 * Not implemented (not used by Ink):
 *   - aspect-ratio
 *   - box-sizing: content-box
 *   - RTL direction (Ink always passes Direction.LTR)
 *
 * Upstream: https://github.com/facebook/yoga
 */
import { Align, BoxSizing, Dimension, Direction, Display, Edge, Errata, ExperimentalFeature, FlexDirection, Gutter, Justify, MeasureMode, Overflow, PositionType, Unit, Wrap } from './enums.js';
export { Align, BoxSizing, Dimension, Direction, Display, Edge, Errata, ExperimentalFeature, FlexDirection, Gutter, Justify, MeasureMode, Overflow, PositionType, Unit, Wrap, };
export type Value = {
    unit: Unit;
    value: number;
};
type Layout = {
    left: number;
    top: number;
    width: number;
    height: number;
    border: [number, number, number, number];
    padding: [number, number, number, number];
    margin: [number, number, number, number];
};
type Style = {
    direction: Direction;
    flexDirection: FlexDirection;
    justifyContent: Justify;
    alignItems: Align;
    alignSelf: Align;
    alignContent: Align;
    flexWrap: Wrap;
    overflow: Overflow;
    display: Display;
    positionType: PositionType;
    flexGrow: number;
    flexShrink: number;
    flexBasis: Value;
    margin: Value[];
    padding: Value[];
    border: Value[];
    position: Value[];
    gap: Value[];
    width: Value;
    height: Value;
    minWidth: Value;
    minHeight: Value;
    maxWidth: Value;
    maxHeight: Value;
};
export type MeasureFunction = (width: number, widthMode: MeasureMode, height: number, heightMode: MeasureMode) => {
    width: number;
    height: number;
};
export type Size = {
    width: number;
    height: number;
};
export type Config = {
    pointScaleFactor: number;
    errata: Errata;
    useWebDefaults: boolean;
    free(): void;
    isExperimentalFeatureEnabled(_: ExperimentalFeature): boolean;
    setExperimentalFeatureEnabled(_: ExperimentalFeature, __: boolean): void;
    setPointScaleFactor(factor: number): void;
    getErrata(): Errata;
    setErrata(errata: Errata): void;
    setUseWebDefaults(v: boolean): void;
};
export declare class Node {
    style: Style;
    layout: Layout;
    parent: Node | null;
    children: Node[];
    measureFunc: MeasureFunction | null;
    config: Config;
    isDirty_: boolean;
    isReferenceBaseline_: boolean;
    _flexBasis: number;
    _mainSize: number;
    _crossSize: number;
    _lineIndex: number;
    _hasAutoMargin: boolean;
    _hasPosition: boolean;
    _hasPadding: boolean;
    _hasBorder: boolean;
    _hasMargin: boolean;
    _lW: number;
    _lH: number;
    _lWM: MeasureMode;
    _lHM: MeasureMode;
    _lOW: number;
    _lOH: number;
    _lFW: boolean;
    _lFH: boolean;
    _lOutW: number;
    _lOutH: number;
    _hasL: boolean;
    _mW: number;
    _mH: number;
    _mWM: MeasureMode;
    _mHM: MeasureMode;
    _mOW: number;
    _mOH: number;
    _mOutW: number;
    _mOutH: number;
    _hasM: boolean;
    _fbBasis: number;
    _fbOwnerW: number;
    _fbOwnerH: number;
    _fbAvailMain: number;
    _fbAvailCross: number;
    _fbCrossMode: MeasureMode;
    _fbGen: number;
    _cIn: Float64Array | null;
    _cOut: Float64Array | null;
    _cGen: number;
    _cN: number;
    _cWr: number;
    constructor(config?: Config);
    insertChild(child: Node, index: number): void;
    removeChild(child: Node): void;
    getChild(index: number): Node;
    getChildCount(): number;
    getParent(): Node | null;
    free(): void;
    freeRecursive(): void;
    reset(): void;
    markDirty(): void;
    isDirty(): boolean;
    hasNewLayout(): boolean;
    markLayoutSeen(): void;
    setMeasureFunc(fn: MeasureFunction | null): void;
    unsetMeasureFunc(): void;
    getComputedLeft(): number;
    getComputedTop(): number;
    getComputedWidth(): number;
    getComputedHeight(): number;
    getComputedRight(): number;
    getComputedBottom(): number;
    getComputedLayout(): {
        left: number;
        top: number;
        right: number;
        bottom: number;
        width: number;
        height: number;
    };
    getComputedBorder(edge: Edge): number;
    getComputedPadding(edge: Edge): number;
    getComputedMargin(edge: Edge): number;
    setWidth(v: number | 'auto' | string | undefined): void;
    setWidthPercent(v: number): void;
    setWidthAuto(): void;
    setHeight(v: number | 'auto' | string | undefined): void;
    setHeightPercent(v: number): void;
    setHeightAuto(): void;
    setMinWidth(v: number | string | undefined): void;
    setMinWidthPercent(v: number): void;
    setMinHeight(v: number | string | undefined): void;
    setMinHeightPercent(v: number): void;
    setMaxWidth(v: number | string | undefined): void;
    setMaxWidthPercent(v: number): void;
    setMaxHeight(v: number | string | undefined): void;
    setMaxHeightPercent(v: number): void;
    setFlexDirection(dir: FlexDirection): void;
    setFlexGrow(v: number | undefined): void;
    setFlexShrink(v: number | undefined): void;
    setFlex(v: number | undefined): void;
    setFlexBasis(v: number | 'auto' | string | undefined): void;
    setFlexBasisPercent(v: number): void;
    setFlexBasisAuto(): void;
    setFlexWrap(wrap: Wrap): void;
    setAlignItems(a: Align): void;
    setAlignSelf(a: Align): void;
    setAlignContent(a: Align): void;
    setJustifyContent(j: Justify): void;
    setDisplay(d: Display): void;
    getDisplay(): Display;
    setPositionType(t: PositionType): void;
    setPosition(edge: Edge, v: number | string | undefined): void;
    setPositionPercent(edge: Edge, v: number): void;
    setPositionAuto(edge: Edge): void;
    setOverflow(o: Overflow): void;
    setDirection(d: Direction): void;
    setBoxSizing(_: BoxSizing): void;
    setMargin(edge: Edge, v: number | 'auto' | string | undefined): void;
    setMarginPercent(edge: Edge, v: number): void;
    setMarginAuto(edge: Edge): void;
    setPadding(edge: Edge, v: number | string | undefined): void;
    setPaddingPercent(edge: Edge, v: number): void;
    setBorder(edge: Edge, v: number | undefined): void;
    setGap(gutter: Gutter, v: number | string | undefined): void;
    setGapPercent(gutter: Gutter, v: number): void;
    getFlexDirection(): FlexDirection;
    getJustifyContent(): Justify;
    getAlignItems(): Align;
    getAlignSelf(): Align;
    getAlignContent(): Align;
    getFlexGrow(): number;
    getFlexShrink(): number;
    getFlexBasis(): Value;
    getFlexWrap(): Wrap;
    getWidth(): Value;
    getHeight(): Value;
    getOverflow(): Overflow;
    getPositionType(): PositionType;
    getDirection(): Direction;
    copyStyle(_: Node): void;
    setDirtiedFunc(_: unknown): void;
    unsetDirtiedFunc(): void;
    setIsReferenceBaseline(v: boolean): void;
    isReferenceBaseline(): boolean;
    setAspectRatio(_: number | undefined): void;
    getAspectRatio(): number;
    setAlwaysFormsContainingBlock(_: boolean): void;
    calculateLayout(ownerWidth: number | undefined, ownerHeight: number | undefined, _direction?: Direction): void;
}
export declare function getYogaCounters(): {
    visited: number;
    measured: number;
    cacheHits: number;
    live: number;
};
export type Yoga = {
    Config: {
        create(): Config;
        destroy(config: Config): void;
    };
    Node: {
        create(config?: Config): Node;
        createDefault(): Node;
        createWithConfig(config: Config): Node;
        destroy(node: Node): void;
    };
};
declare const YOGA_INSTANCE: Yoga;
export declare function loadYoga(): Promise<Yoga>;
export default YOGA_INSTANCE;
//# sourceMappingURL=index.d.ts.map