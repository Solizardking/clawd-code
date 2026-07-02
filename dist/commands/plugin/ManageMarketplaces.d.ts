import * as React from 'react';
import type { ViewState } from './types.js';
type Props = {
    setViewState: (state: ViewState) => void;
    error?: string | null;
    setError?: (error: string | null) => void;
    setResult: (result: string | null) => void;
    exitState: {
        pending: boolean;
        keyName: 'Ctrl-C' | 'Ctrl-D' | null;
    };
    onManageComplete?: () => void | Promise<void>;
    targetMarketplace?: string;
    action?: 'update' | 'remove';
};
export declare function ManageMarketplaces({ setViewState, error, setError, setResult, exitState, onManageComplete, targetMarketplace, action }: Props): React.ReactNode;
export {};
//# sourceMappingURL=ManageMarketplaces.d.ts.map