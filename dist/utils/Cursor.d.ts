export declare function pushToKillRing(text: string, direction?: 'prepend' | 'append'): void;
export declare function getLastKill(): string;
export declare function getKillRingItem(index: number): string;
export declare function getKillRingSize(): number;
export declare function clearKillRing(): void;
export declare function resetKillAccumulation(): void;
export declare function recordYank(start: number, length: number): void;
export declare function canYankPop(): boolean;
export declare function yankPop(): {
    text: string;
    start: number;
    length: number;
} | null;
export declare function updateYankLength(length: number): void;
export declare function resetYankState(): void;
/**
 * Text Processing Flow for Unicode Normalization:
 *
 * User Input (raw text, potentially mixed NFD/NFC)
 *     ↓
 * MeasuredText (normalizes to NFC + builds grapheme info)
 *     ↓
 * All cursor operations use normalized text/offsets
 *     ↓
 * Display uses normalized text from wrappedLines
 *
 * This flow ensures consistent Unicode handling:
 * - NFD/NFC normalization differences don't break cursor movement
 * - Grapheme clusters (like 👨‍👩‍👧‍👦) are treated as single units
 * - Display width calculations are accurate for CJK characters
 *
 * RULE: Once text enters MeasuredText, all operations
 * work on the normalized version.
 */
export declare const VIM_WORD_CHAR_REGEX: RegExp;
export declare const WHITESPACE_REGEX: RegExp;
export declare const isVimWordChar: (ch: string) => boolean;
export declare const isVimWhitespace: (ch: string) => boolean;
export declare const isVimPunctuation: (ch: string) => boolean;
type WrappedText = string[];
type Position = {
    line: number;
    column: number;
};
export declare class Cursor {
    readonly measuredText: MeasuredText;
    readonly selection: number;
    readonly offset: number;
    constructor(measuredText: MeasuredText, offset?: number, selection?: number);
    static fromText(text: string, columns: number, offset?: number, selection?: number): Cursor;
    getViewportStartLine(maxVisibleLines?: number): number;
    getViewportCharOffset(maxVisibleLines?: number): number;
    getViewportCharEnd(maxVisibleLines?: number): number;
    render(cursorChar: string, mask: string, invert: (text: string) => string, ghostText?: {
        text: string;
        dim: (text: string) => string;
    }, maxVisibleLines?: number): string;
    left(): Cursor;
    right(): Cursor;
    /**
     * If an [Image #N] chip ends at `offset`, return its bounds. Used by left()
     * to hop the cursor over the chip instead of stepping into it.
     */
    imageRefEndingAt(offset: number): {
        start: number;
        end: number;
    } | null;
    imageRefStartingAt(offset: number): {
        start: number;
        end: number;
    } | null;
    /**
     * If offset lands strictly inside an [Image #N] chip, snap it to the given
     * boundary. Used by word-movement methods so Ctrl+W / Alt+D never leave a
     * partial chip.
     */
    snapOutOfImageRef(offset: number, toward: 'start' | 'end'): number;
    up(): Cursor;
    down(): Cursor;
    /**
     * Move to the start of the current line (column 0).
     * This is the raw version used internally by startOfLine.
     */
    private startOfCurrentLine;
    startOfLine(): Cursor;
    firstNonBlankInLine(): Cursor;
    endOfLine(): Cursor;
    private findLogicalLineStart;
    private findLogicalLineEnd;
    private getLogicalLineBounds;
    private createCursorWithColumn;
    endOfLogicalLine(): Cursor;
    startOfLogicalLine(): Cursor;
    firstNonBlankInLogicalLine(): Cursor;
    upLogicalLine(): Cursor;
    downLogicalLine(): Cursor;
    nextWord(): Cursor;
    endOfWord(): Cursor;
    prevWord(): Cursor;
    nextVimWord(): Cursor;
    endOfVimWord(): Cursor;
    prevVimWord(): Cursor;
    nextWORD(): Cursor;
    endOfWORD(): Cursor;
    prevWORD(): Cursor;
    modifyText(end: Cursor, insertString?: string): Cursor;
    insert(insertString: string): Cursor;
    del(): Cursor;
    backspace(): Cursor;
    deleteToLineStart(): {
        cursor: Cursor;
        killed: string;
    };
    deleteToLineEnd(): {
        cursor: Cursor;
        killed: string;
    };
    deleteToLogicalLineEnd(): Cursor;
    deleteWordBefore(): {
        cursor: Cursor;
        killed: string;
    };
    /**
     * Deletes a token before the cursor if one exists.
     * Supports pasted text refs: [Pasted text #1], [Pasted text #1 +10 lines],
     * [...Truncated text #1 +10 lines...]
     *
     * Note: @mentions are NOT tokenized since users may want to correct typos
     * in file paths. Use Ctrl/Cmd+backspace for word-deletion on mentions.
     *
     * Returns null if no token found at cursor position.
     * Only triggers when cursor is at end of token (followed by whitespace or EOL).
     */
    deleteTokenBefore(): Cursor | null;
    deleteWordAfter(): Cursor;
    private graphemeAt;
    private isOverWhitespace;
    equals(other: Cursor): boolean;
    isAtStart(): boolean;
    isAtEnd(): boolean;
    startOfFirstLine(): Cursor;
    startOfLastLine(): Cursor;
    goToLine(lineNumber: number): Cursor;
    endOfFile(): Cursor;
    get text(): string;
    private get columns();
    getPosition(): Position;
    private getOffset;
    /**
     * Find a character using vim f/F/t/T semantics.
     *
     * @param char - The character to find
     * @param type - 'f' (forward to), 'F' (backward to), 't' (forward till), 'T' (backward till)
     * @param count - Find the Nth occurrence
     * @returns The target offset, or null if not found
     */
    findCharacter(char: string, type: 'f' | 'F' | 't' | 'T', count?: number): number | null;
}
declare class WrappedLine {
    readonly text: string;
    readonly startOffset: number;
    readonly isPrecededByNewline: boolean;
    readonly endsWithNewline: boolean;
    constructor(text: string, startOffset: number, isPrecededByNewline: boolean, endsWithNewline?: boolean);
    equals(other: WrappedLine): boolean;
    get length(): number;
}
export declare class MeasuredText {
    readonly columns: number;
    private _wrappedLines?;
    readonly text: string;
    private navigationCache;
    private graphemeBoundaries?;
    constructor(text: string, columns: number);
    /**
     * Lazily computes and caches wrapped lines.
     * This expensive operation is deferred until actually needed.
     */
    private get wrappedLines();
    private getGraphemeBoundaries;
    private wordBoundariesCache?;
    /**
     * Get word boundaries using Intl.Segmenter for proper Unicode word segmentation.
     * This correctly handles CJK (Chinese, Japanese, Korean) text where each character
     * is typically its own word, as well as scripts that use spaces between words.
     */
    getWordBoundaries(): Array<{
        start: number;
        end: number;
        isWordLike: boolean;
    }>;
    /**
     * Binary search for boundaries.
     * @param boundaries: Sorted array of boundaries
     * @param target: Target offset
     * @param findNext: If true, finds first boundary > target. If false, finds last boundary < target.
     * @returns The found boundary index, or appropriate default
     */
    private binarySearchBoundary;
    stringIndexToDisplayWidth(text: string, index: number): number;
    displayWidthToStringIndex(text: string, targetWidth: number): number;
    /**
     * Find the string offset that corresponds to a target display width.
     */
    private offsetAtDisplayWidth;
    private measureWrappedText;
    getWrappedText(): WrappedText;
    getWrappedLines(): WrappedLine[];
    private getLine;
    getOffsetFromPosition(position: Position): number;
    getLineLength(line: number): number;
    getPositionFromOffset(offset: number): Position;
    get lineCount(): number;
    private withCache;
    nextOffset(offset: number): number;
    prevOffset(offset: number): number;
    /**
     * Snap an arbitrary code-unit offset to the start of the containing grapheme.
     * If offset is already on a boundary, returns it unchanged.
     */
    snapToGraphemeBoundary(offset: number): number;
}
export {};
//# sourceMappingURL=Cursor.d.ts.map