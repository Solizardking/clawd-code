/**
 * Yoga enums — ported from yoga-layout/src/generated/YGEnums.ts
 * Kept as `const` objects (not TS enums) per repo convention.
 * Values match upstream exactly so callers don't change.
 */
export declare const Align: {
    readonly Auto: 0;
    readonly FlexStart: 1;
    readonly Center: 2;
    readonly FlexEnd: 3;
    readonly Stretch: 4;
    readonly Baseline: 5;
    readonly SpaceBetween: 6;
    readonly SpaceAround: 7;
    readonly SpaceEvenly: 8;
};
export type Align = (typeof Align)[keyof typeof Align];
export declare const BoxSizing: {
    readonly BorderBox: 0;
    readonly ContentBox: 1;
};
export type BoxSizing = (typeof BoxSizing)[keyof typeof BoxSizing];
export declare const Dimension: {
    readonly Width: 0;
    readonly Height: 1;
};
export type Dimension = (typeof Dimension)[keyof typeof Dimension];
export declare const Direction: {
    readonly Inherit: 0;
    readonly LTR: 1;
    readonly RTL: 2;
};
export type Direction = (typeof Direction)[keyof typeof Direction];
export declare const Display: {
    readonly Flex: 0;
    readonly None: 1;
    readonly Contents: 2;
};
export type Display = (typeof Display)[keyof typeof Display];
export declare const Edge: {
    readonly Left: 0;
    readonly Top: 1;
    readonly Right: 2;
    readonly Bottom: 3;
    readonly Start: 4;
    readonly End: 5;
    readonly Horizontal: 6;
    readonly Vertical: 7;
    readonly All: 8;
};
export type Edge = (typeof Edge)[keyof typeof Edge];
export declare const Errata: {
    readonly None: 0;
    readonly StretchFlexBasis: 1;
    readonly AbsolutePositionWithoutInsetsExcludesPadding: 2;
    readonly AbsolutePercentAgainstInnerSize: 4;
    readonly All: 2147483647;
    readonly Classic: 2147483646;
};
export type Errata = (typeof Errata)[keyof typeof Errata];
export declare const ExperimentalFeature: {
    readonly WebFlexBasis: 0;
};
export type ExperimentalFeature = (typeof ExperimentalFeature)[keyof typeof ExperimentalFeature];
export declare const FlexDirection: {
    readonly Column: 0;
    readonly ColumnReverse: 1;
    readonly Row: 2;
    readonly RowReverse: 3;
};
export type FlexDirection = (typeof FlexDirection)[keyof typeof FlexDirection];
export declare const Gutter: {
    readonly Column: 0;
    readonly Row: 1;
    readonly All: 2;
};
export type Gutter = (typeof Gutter)[keyof typeof Gutter];
export declare const Justify: {
    readonly FlexStart: 0;
    readonly Center: 1;
    readonly FlexEnd: 2;
    readonly SpaceBetween: 3;
    readonly SpaceAround: 4;
    readonly SpaceEvenly: 5;
};
export type Justify = (typeof Justify)[keyof typeof Justify];
export declare const MeasureMode: {
    readonly Undefined: 0;
    readonly Exactly: 1;
    readonly AtMost: 2;
};
export type MeasureMode = (typeof MeasureMode)[keyof typeof MeasureMode];
export declare const Overflow: {
    readonly Visible: 0;
    readonly Hidden: 1;
    readonly Scroll: 2;
};
export type Overflow = (typeof Overflow)[keyof typeof Overflow];
export declare const PositionType: {
    readonly Static: 0;
    readonly Relative: 1;
    readonly Absolute: 2;
};
export type PositionType = (typeof PositionType)[keyof typeof PositionType];
export declare const Unit: {
    readonly Undefined: 0;
    readonly Point: 1;
    readonly Percent: 2;
    readonly Auto: 3;
};
export type Unit = (typeof Unit)[keyof typeof Unit];
export declare const Wrap: {
    readonly NoWrap: 0;
    readonly Wrap: 1;
    readonly WrapReverse: 2;
};
export type Wrap = (typeof Wrap)[keyof typeof Wrap];
//# sourceMappingURL=enums.d.ts.map