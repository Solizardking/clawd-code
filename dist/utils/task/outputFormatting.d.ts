export declare const TASK_MAX_OUTPUT_UPPER_LIMIT = 160000;
export declare const TASK_MAX_OUTPUT_DEFAULT = 32000;
export declare function getMaxTaskOutputLength(): number;
/**
 * Format task output for API consumption, truncating if too large.
 * When truncated, includes a header with the file path and returns
 * the last N characters that fit within the limit.
 */
export declare function formatTaskOutput(output: string, taskId: string): {
    content: string;
    wasTruncated: boolean;
};
//# sourceMappingURL=outputFormatting.d.ts.map