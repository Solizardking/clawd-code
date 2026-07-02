import * as React from 'react';
import type { InProcessTeammateTaskState } from '../../tasks/InProcessTeammateTask/types.js';
import type { Theme } from '../../utils/theme.js';
import type { SpinnerMode } from './types.js';
export type SpinnerAnimationRowProps = {
    mode: SpinnerMode;
    reducedMotion: boolean;
    hasActiveTools: boolean;
    responseLengthRef: React.RefObject<number>;
    message: string;
    messageColor: keyof Theme;
    shimmerColor: keyof Theme;
    overrideColor?: keyof Theme | null;
    loadingStartTimeRef: React.RefObject<number>;
    totalPausedMsRef: React.RefObject<number>;
    pauseStartTimeRef: React.RefObject<number | null>;
    spinnerSuffix?: string | null;
    verbose: boolean;
    columns: number;
    hasRunningTeammates: boolean;
    teammateTokens: number;
    foregroundedTeammate: InProcessTeammateTaskState | undefined;
    /** Leader's turn has completed. Suppresses stall-red since responseLengthRef/hasActiveTools track leader state only. */
    leaderIsIdle?: boolean;
    thinkingStatus: 'thinking' | number | null;
    effortSuffix: string;
};
/**
 * The 50ms-animated portion of SpinnerWithVerb. Owns useAnimationFrame(50)
 * and all values derived from the animation clock (frame, glimmer, token
 * counter animation, elapsed-time, stalled intensity, thinking shimmer).
 *
 * The parent SpinnerWithVerb is freed from the 50ms render loop and only
 * re-renders when its props/app state change (~25x/turn instead of ~383x).
 * That keeps the outer Box shells, useAppState selectors, task filtering,
 * and tip/tree subtrees out of the hot animation path.
 */
export declare function SpinnerAnimationRow({ mode, reducedMotion, hasActiveTools, responseLengthRef, message, messageColor, shimmerColor, overrideColor, loadingStartTimeRef, totalPausedMsRef, pauseStartTimeRef, spinnerSuffix, verbose, columns, hasRunningTeammates, teammateTokens, foregroundedTeammate, leaderIsIdle, thinkingStatus, effortSuffix }: SpinnerAnimationRowProps): React.ReactNode;
//# sourceMappingURL=SpinnerAnimationRow.d.ts.map