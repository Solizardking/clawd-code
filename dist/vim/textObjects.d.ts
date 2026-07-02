/**
 * Vim Text Object Finding
 *
 * Functions for finding text object boundaries (iw, aw, i", a(, etc.)
 */
export type TextObjectRange = {
    start: number;
    end: number;
} | null;
/**
 * Find a text object at the given position.
 */
export declare function findTextObject(text: string, offset: number, objectType: string, isInner: boolean): TextObjectRange;
//# sourceMappingURL=textObjects.d.ts.map