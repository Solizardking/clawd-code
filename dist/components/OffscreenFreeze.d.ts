import React from 'react';
type Props = {
    children: React.ReactNode;
};
/**
 * Freezes children when they scroll above the terminal viewport (into scrollback).
 *
 * Any content change above the viewport forces log-update.ts into a full terminal
 * reset (it cannot partially update rows that have scrolled out). For content that
 * updates on a timer — spinners, elapsed counters — this produces a reset per tick.
 *
 * When offscreen, returns the same ReactElement reference that was cached during
 * the last visible render. React's reconciler bails on identical element refs, so
 * the subtree never re-renders, producing zero diff.
 *
 * The cache is one slot deep: the first re-render after scrolling back into view
 * picks up the live children. Content still updates normally while visible.
 */
export declare function OffscreenFreeze({ children }: Props): React.ReactNode;
export {};
//# sourceMappingURL=OffscreenFreeze.d.ts.map