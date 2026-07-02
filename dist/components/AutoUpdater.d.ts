import * as React from 'react';
import { type AutoUpdaterResult } from '../utils/autoUpdater.js';
type Props = {
    isUpdating: boolean;
    onChangeIsUpdating: (isUpdating: boolean) => void;
    onAutoUpdaterResult: (autoUpdaterResult: AutoUpdaterResult) => void;
    autoUpdaterResult: AutoUpdaterResult | null;
    showSuccessMessage: boolean;
    verbose: boolean;
};
export declare function AutoUpdater({ isUpdating, onChangeIsUpdating, onAutoUpdaterResult, autoUpdaterResult, showSuccessMessage, verbose }: Props): React.ReactNode;
export {};
//# sourceMappingURL=AutoUpdater.d.ts.map