import type { PastedContent } from '../utils/config.js';
export type BufferEntry = {
    text: string;
    cursorOffset: number;
    pastedContents: Record<number, PastedContent>;
    timestamp: number;
};
export type UseInputBufferProps = {
    maxBufferSize: number;
    debounceMs: number;
};
export type UseInputBufferResult = {
    pushToBuffer: (text: string, cursorOffset: number, pastedContents?: Record<number, PastedContent>) => void;
    undo: () => BufferEntry | undefined;
    canUndo: boolean;
    clearBuffer: () => void;
};
export declare function useInputBuffer({ maxBufferSize, debounceMs, }: UseInputBufferProps): UseInputBufferResult;
//# sourceMappingURL=useInputBuffer.d.ts.map