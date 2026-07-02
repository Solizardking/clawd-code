import type { Diff, Frame } from './frame.js';
import { type StylePool } from './screen.js';
type Options = {
    isTTY: boolean;
    stylePool: StylePool;
};
export declare class LogUpdate {
    private readonly options;
    private state;
    constructor(options: Options);
    renderPreviousOutput_DEPRECATED(prevFrame: Frame): Diff;
    reset(): void;
    private renderFullFrame;
    private getRenderOpsForDone;
    render(prev: Frame, next: Frame, altScreen?: boolean, decstbmSafe?: boolean): Diff;
}
export {};
//# sourceMappingURL=log-update.d.ts.map