import { type DOMElement } from './dom.js';
import type { Frame } from './frame.js';
import { type StylePool } from './screen.js';
export type RenderOptions = {
    frontFrame: Frame;
    backFrame: Frame;
    isTTY: boolean;
    terminalWidth: number;
    terminalRows: number;
    altScreen: boolean;
    prevFrameContaminated: boolean;
};
export type Renderer = (options: RenderOptions) => Frame;
export default function createRenderer(node: DOMElement, stylePool: StylePool): Renderer;
//# sourceMappingURL=renderer.d.ts.map