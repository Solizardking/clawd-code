interface DiffLine {
    code: string;
    type: 'add' | 'remove' | 'nochange';
    i: number;
    originalCode: string;
    wordDiff?: boolean;
    matchedLine?: DiffLine;
}
export interface LineObject {
    code: string;
    i: number;
    type: 'add' | 'remove' | 'nochange';
    originalCode: string;
    wordDiff?: boolean;
    matchedLine?: LineObject;
}
interface DiffPart {
    added?: boolean;
    removed?: boolean;
    value: string;
}
export declare function StructuredDiffFallback(t0: any): any;
export declare function transformLinesToObjects(lines: string[]): LineObject[];
export declare function processAdjacentLines(lineObjects: LineObject[]): LineObject[];
export declare function calculateWordDiffs(oldText: string, newText: string): DiffPart[];
export declare function numberDiffLines(diff: LineObject[], startLine: number): DiffLine[];
export {};
//# sourceMappingURL=Fallback.d.ts.map