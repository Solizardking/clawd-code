import type { ReactNode } from 'react';
import type { FrameEvent } from './frame.js';
import Ink from './ink.js';
export type RenderOptions = {
    /**
     * Output stream where app will be rendered.
     *
     * @default process.stdout
     */
    stdout?: NodeJS.WriteStream;
    /**
     * Input stream where app will listen for input.
     *
     * @default process.stdin
     */
    stdin?: NodeJS.ReadStream;
    /**
     * Error stream.
     * @default process.stderr
     */
    stderr?: NodeJS.WriteStream;
    /**
     * Configure whether Ink should listen to Ctrl+C keyboard input and exit the app. This is needed in case `process.stdin` is in raw mode, because then Ctrl+C is ignored by default and process is expected to handle it manually.
     *
     * @default true
     */
    exitOnCtrlC?: boolean;
    /**
     * Patch console methods to ensure console output doesn't mix with Ink output.
     *
     * @default true
     */
    patchConsole?: boolean;
    /**
     * Called after each frame render with timing and flicker information.
     */
    onFrame?: (event: FrameEvent) => void;
};
export type Instance = {
    /**
     * Replace previous root node with a new one or update props of the current root node.
     */
    rerender: Ink['render'];
    /**
     * Manually unmount the whole Ink app.
     */
    unmount: Ink['unmount'];
    /**
     * Returns a promise, which resolves when app is unmounted.
     */
    waitUntilExit: Ink['waitUntilExit'];
    cleanup: () => void;
};
/**
 * A managed Ink root, similar to react-dom's createRoot API.
 * Separates instance creation from rendering so the same root
 * can be reused for multiple sequential screens.
 */
export type Root = {
    render: (node: ReactNode) => void;
    unmount: () => void;
    waitUntilExit: () => Promise<void>;
};
/**
 * Mount a component and render the output.
 */
export declare const renderSync: (node: ReactNode, options?: NodeJS.WriteStream | RenderOptions) => Instance;
declare const wrappedRender: (node: ReactNode, options?: NodeJS.WriteStream | RenderOptions) => Promise<Instance>;
export default wrappedRender;
/**
 * Create an Ink root without rendering anything yet.
 * Like react-dom's createRoot — call root.render() to mount a tree.
 */
export declare function createRoot({ stdout, stdin, stderr, exitOnCtrlC, patchConsole, onFrame, }?: RenderOptions): Promise<Root>;
//# sourceMappingURL=root.d.ts.map