import * as React from 'react';
import type { ViewState as ParentViewState } from './types.js';
type Props = {
    error: string | null;
    setError: (error: string | null) => void;
    result: string | null;
    setResult: (result: string | null) => void;
    setViewState: (state: ParentViewState) => void;
    onInstallComplete?: () => void | Promise<void>;
    onSearchModeChange?: (isActive: boolean) => void;
    targetPlugin?: string;
};
export declare function DiscoverPlugins({ error, setError, result: _result, setResult, setViewState: setParentViewState, onInstallComplete, onSearchModeChange, targetPlugin }: Props): React.ReactNode;
export {};
//# sourceMappingURL=DiscoverPlugins.d.ts.map