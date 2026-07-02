import * as React from 'react';
import type { Theme } from 'src/utils/theme.js';
import { type SpinnerMode } from './Spinner/index.js';
export type { SpinnerMode } from './Spinner/index.js';
type Props = {
    mode: SpinnerMode;
    loadingStartTimeRef: React.RefObject<number>;
    totalPausedMsRef: React.RefObject<number>;
    pauseStartTimeRef: React.RefObject<number | null>;
    spinnerTip?: string;
    responseLengthRef: React.RefObject<number>;
    overrideColor?: keyof Theme | null;
    overrideShimmerColor?: keyof Theme | null;
    overrideMessage?: string | null;
    spinnerSuffix?: string | null;
    verbose: boolean;
    hasActiveTools?: boolean;
    /** Leader's turn has completed (no active query). Used to suppress stall-red spinner when only teammates are running. */
    leaderIsIdle?: boolean;
};
export declare function SpinnerWithVerb(props: Props): React.ReactNode;
export declare function BriefIdleStatus(): any;
export declare function Spinner(): any;
//# sourceMappingURL=Spinner.d.ts.map