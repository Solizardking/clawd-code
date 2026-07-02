import * as React from 'react';
import type { InProcessTeammateTaskState } from '../../tasks/InProcessTeammateTask/types.js';
type Props = {
    teammate: InProcessTeammateTaskState;
    isLast: boolean;
    isSelected?: boolean;
    isForegrounded?: boolean;
    allIdle?: boolean;
    showPreview?: boolean;
};
export declare function TeammateSpinnerLine({ teammate, isLast, isSelected, isForegrounded, allIdle, showPreview }: Props): React.ReactNode;
export {};
//# sourceMappingURL=TeammateSpinnerLine.d.ts.map