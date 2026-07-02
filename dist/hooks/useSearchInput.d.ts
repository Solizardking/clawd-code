import { KeyboardEvent } from '../ink/events/keyboard-event.js';
type UseSearchInputOptions = {
    isActive: boolean;
    onExit: () => void;
    /** Esc + Ctrl+C abandon (distinct from onExit = Enter commit). When
     *  provided: single-Esc calls this directly (no clear-first-then-exit
     *  two-press). When absent: current behavior — Esc clears non-empty
     *  query, exits on empty; Ctrl+C silently swallowed (no switch case). */
    onCancel?: () => void;
    onExitUp?: () => void;
    columns?: number;
    passthroughCtrlKeys?: string[];
    initialQuery?: string;
    /** Backspace (and ctrl+h) on empty query calls onCancel ?? onExit — the
     *  less/vim "delete past the /" convention. Dialogs that want Esc-only
     *  cancel set this false so a held backspace doesn't eject the user. */
    backspaceExitsOnEmpty?: boolean;
};
type UseSearchInputReturn = {
    query: string;
    setQuery: (q: string) => void;
    cursorOffset: number;
    handleKeyDown: (e: KeyboardEvent) => void;
};
export declare function useSearchInput({ isActive, onExit, onCancel, onExitUp, columns, passthroughCtrlKeys, initialQuery, backspaceExitsOnEmpty, }: UseSearchInputOptions): UseSearchInputReturn;
export {};
//# sourceMappingURL=useSearchInput.d.ts.map