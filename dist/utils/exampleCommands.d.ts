/**
 * Counts occurrences of items in an array and returns the top N items
 * sorted by count in descending order, formatted as a string.
 */
export declare function countAndSortItems(items: string[], topN?: number): string;
/**
 * Picks up to `want` basenames from a frequency-sorted list of paths,
 * skipping non-core files and spreading across different directories.
 * Returns empty array if fewer than `want` core files are available.
 */
export declare function pickDiverseCoreFiles(sortedPaths: string[], want: number): string[];
export declare const getExampleCommandFromCache: any;
export declare const refreshExampleCommands: any;
//# sourceMappingURL=exampleCommands.d.ts.map