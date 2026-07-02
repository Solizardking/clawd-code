import { type Boxes, type BoxStyle } from 'cli-boxes';
import type { DOMNode } from './dom.js';
import type Output from './output.js';
export type BorderTextOptions = {
    content: string;
    position: 'top' | 'bottom';
    align: 'start' | 'end' | 'center';
    offset?: number;
};
export declare const CUSTOM_BORDER_STYLES: {
    readonly dashed: {
        readonly top: "╌";
        readonly left: "╎";
        readonly right: "╎";
        readonly bottom: "╌";
        readonly topLeft: " ";
        readonly topRight: " ";
        readonly bottomLeft: " ";
        readonly bottomRight: " ";
    };
};
export type BorderStyle = keyof Boxes | keyof typeof CUSTOM_BORDER_STYLES | BoxStyle;
declare const renderBorder: (x: number, y: number, node: DOMNode, output: Output) => void;
export default renderBorder;
//# sourceMappingURL=render-border.d.ts.map