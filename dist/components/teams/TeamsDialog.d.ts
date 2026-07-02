import * as React from 'react';
import { type TeamSummary } from '../../utils/teamDiscovery.js';
type Props = {
    initialTeams?: TeamSummary[];
    onDone: () => void;
};
/**
 * Dialog for viewing teammates in the current team
 */
export declare function TeamsDialog({ initialTeams, onDone }: Props): React.ReactNode;
export {};
//# sourceMappingURL=TeamsDialog.d.ts.map