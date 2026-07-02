import type { PromptInputMode } from '../types/textInputTypes.js';
import type { PastedContent } from '../utils/config.js';
export type HistoryMode = PromptInputMode;
export declare function useArrowKeyHistory(onSetInput: (value: string, mode: HistoryMode, pastedContents: Record<number, PastedContent>) => void, currentInput: string, pastedContents: Record<number, PastedContent>, setCursorOffset?: (offset: number) => void, currentMode?: HistoryMode): {
    historyIndex: number;
    setHistoryIndex: (index: number) => void;
    onHistoryUp: () => void;
    onHistoryDown: () => boolean;
    resetHistory: () => void;
    dismissSearchHint: () => void;
};
//# sourceMappingURL=useArrowKeyHistory.d.ts.map