import type { PastedContent } from 'src/utils/config.js';
type TruncatedMessage = {
    truncatedText: string;
    placeholderContent: string;
};
/**
 * Determines whether the input text should be truncated. If so, it adds a
 * truncated text placeholder and neturns
 *
 * @param text The input text
 * @param nextPasteId The reference id to use
 * @returns The new text to display and separate placeholder content if applicable.
 */
export declare function maybeTruncateMessageForInput(text: string, nextPasteId: number): TruncatedMessage;
export declare function maybeTruncateInput(input: string, pastedContents: Record<number, PastedContent>): {
    newInput: string;
    newPastedContents: Record<number, PastedContent>;
};
export {};
//# sourceMappingURL=inputPaste.d.ts.map