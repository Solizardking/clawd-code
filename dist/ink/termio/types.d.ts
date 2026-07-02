/**
 * ANSI Parser - Semantic Types
 *
 * These types represent the semantic meaning of ANSI escape sequences,
 * not their string representation. Inspired by ghostty's action-based design.
 */
/** Named colors from the 16-color palette */
export type NamedColor = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'brightBlack' | 'brightRed' | 'brightGreen' | 'brightYellow' | 'brightBlue' | 'brightMagenta' | 'brightCyan' | 'brightWhite';
/** Color specification - can be named, indexed (256), or RGB */
export type Color = {
    type: 'named';
    name: NamedColor;
} | {
    type: 'indexed';
    index: number;
} | {
    type: 'rgb';
    r: number;
    g: number;
    b: number;
} | {
    type: 'default';
};
/** Underline style variants */
export type UnderlineStyle = 'none' | 'single' | 'double' | 'curly' | 'dotted' | 'dashed';
/** Text style attributes - represents current styling state */
export type TextStyle = {
    bold: boolean;
    dim: boolean;
    italic: boolean;
    underline: UnderlineStyle;
    blink: boolean;
    inverse: boolean;
    hidden: boolean;
    strikethrough: boolean;
    overline: boolean;
    fg: Color;
    bg: Color;
    underlineColor: Color;
};
/** Create a default (reset) text style */
export declare function defaultStyle(): TextStyle;
/** Check if two styles are equal */
export declare function stylesEqual(a: TextStyle, b: TextStyle): boolean;
/** Check if two colors are equal */
export declare function colorsEqual(a: Color, b: Color): boolean;
export type CursorDirection = 'up' | 'down' | 'forward' | 'back';
export type CursorAction = {
    type: 'move';
    direction: CursorDirection;
    count: number;
} | {
    type: 'position';
    row: number;
    col: number;
} | {
    type: 'column';
    col: number;
} | {
    type: 'row';
    row: number;
} | {
    type: 'save';
} | {
    type: 'restore';
} | {
    type: 'show';
} | {
    type: 'hide';
} | {
    type: 'style';
    style: 'block' | 'underline' | 'bar';
    blinking: boolean;
} | {
    type: 'nextLine';
    count: number;
} | {
    type: 'prevLine';
    count: number;
};
export type EraseAction = {
    type: 'display';
    region: 'toEnd' | 'toStart' | 'all' | 'scrollback';
} | {
    type: 'line';
    region: 'toEnd' | 'toStart' | 'all';
} | {
    type: 'chars';
    count: number;
};
export type ScrollAction = {
    type: 'up';
    count: number;
} | {
    type: 'down';
    count: number;
} | {
    type: 'setRegion';
    top: number;
    bottom: number;
};
export type ModeAction = {
    type: 'alternateScreen';
    enabled: boolean;
} | {
    type: 'bracketedPaste';
    enabled: boolean;
} | {
    type: 'mouseTracking';
    mode: 'off' | 'normal' | 'button' | 'any';
} | {
    type: 'focusEvents';
    enabled: boolean;
};
export type LinkAction = {
    type: 'start';
    url: string;
    params?: Record<string, string>;
} | {
    type: 'end';
};
export type TitleAction = {
    type: 'windowTitle';
    title: string;
} | {
    type: 'iconName';
    name: string;
} | {
    type: 'both';
    title: string;
};
/**
 * Per-tab chrome metadata. Tristate for each field:
 *  - property absent → not mentioned in sequence, no change
 *  - null → explicitly cleared (bare key or key= with empty value)
 *  - value → set to this
 */
export type TabStatusAction = {
    indicator?: Color | null;
    status?: string | null;
    statusColor?: Color | null;
};
/** A segment of styled text */
export type TextSegment = {
    type: 'text';
    text: string;
    style: TextStyle;
};
/** A grapheme (visual character unit) with width info */
export type Grapheme = {
    value: string;
    width: 1 | 2;
};
/** All possible parsed actions */
export type Action = {
    type: 'text';
    graphemes: Grapheme[];
    style: TextStyle;
} | {
    type: 'cursor';
    action: CursorAction;
} | {
    type: 'erase';
    action: EraseAction;
} | {
    type: 'scroll';
    action: ScrollAction;
} | {
    type: 'mode';
    action: ModeAction;
} | {
    type: 'link';
    action: LinkAction;
} | {
    type: 'title';
    action: TitleAction;
} | {
    type: 'tabStatus';
    action: TabStatusAction;
} | {
    type: 'sgr';
    params: string;
} | {
    type: 'bell';
} | {
    type: 'reset';
} | {
    type: 'unknown';
    sequence: string;
};
//# sourceMappingURL=types.d.ts.map