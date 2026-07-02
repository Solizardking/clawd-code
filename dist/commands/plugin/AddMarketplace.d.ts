import * as React from 'react';
import type { ViewState } from './types.js';
type Props = {
    inputValue: string;
    setInputValue: (value: string) => void;
    cursorOffset: number;
    setCursorOffset: (offset: number) => void;
    error: string | null;
    setError: (error: string | null) => void;
    result: string | null;
    setResult: (result: string | null) => void;
    setViewState: (state: ViewState) => void;
    onAddComplete?: () => void | Promise<void>;
    cliMode?: boolean;
};
export declare function AddMarketplace({ inputValue, setInputValue, cursorOffset, setCursorOffset, error, setError, result, setResult, setViewState, onAddComplete, cliMode }: Props): React.ReactNode;
export {};
//# sourceMappingURL=AddMarketplace.d.ts.map