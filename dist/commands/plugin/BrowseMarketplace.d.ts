import * as React from 'react';
import type { ViewState as ParentViewState } from './types.js';
type Props = {
    error: string | null;
    setError: (error: string | null) => void;
    result: string | null;
    setResult: (result: string | null) => void;
    setViewState: (state: ParentViewState) => void;
    onInstallComplete?: () => void | Promise<void>;
    targetMarketplace?: string;
    targetPlugin?: string;
};
export declare function BrowseMarketplace({ error, setError, result: _result, setResult, setViewState: setParentViewState, onInstallComplete, targetMarketplace, targetPlugin }: Props): React.ReactNode;
export {};
//# sourceMappingURL=BrowseMarketplace.d.ts.map