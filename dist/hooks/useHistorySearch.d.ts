import { KeyboardEvent } from '../ink/events/keyboard-event.js';
import type { PromptInputMode } from '../types/textInputTypes.js';
import type { HistoryEntry } from '../utils/config.js';
export declare function useHistorySearch(onAcceptHistory: (entry: HistoryEntry) => void, currentInput: string, onInputChange: (input: string) => void, onCursorChange: (cursorOffset: number) => void, currentCursorOffset: number, onModeChange: (mode: PromptInputMode) => void, currentMode: PromptInputMode, isSearching: boolean, setIsSearching: (isSearching: boolean) => void, setPastedContents: (pastedContents: HistoryEntry['pastedContents']) => void, currentPastedContents: HistoryEntry['pastedContents']): {
    historyQuery: string;
    setHistoryQuery: (query: string) => void;
    historyMatch: HistoryEntry | undefined;
    historyFailedMatch: boolean;
    handleKeyDown: (e: KeyboardEvent) => void;
};
//# sourceMappingURL=useHistorySearch.d.ts.map