/**
 * Slice a string containing ANSI escape codes.
 *
 * Unlike the slice-ansi package, this properly handles OSC 8 hyperlink
 * sequences because @alcalzone/ansi-tokenize tokenizes them correctly.
 */
export default function sliceAnsi(str: string, start: number, end?: number): string;
//# sourceMappingURL=sliceAnsi.d.ts.map