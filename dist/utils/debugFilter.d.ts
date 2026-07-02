export type DebugFilter = {
    include: string[];
    exclude: string[];
    isExclusive: boolean;
};
/**
 * Parse debug filter string into a filter configuration
 * Examples:
 * - "api,hooks" -> include only api and hooks categories
 * - "!1p,!file" -> exclude logging and file categories
 * - undefined/empty -> no filtering (show all)
 */
export declare const parseDebugFilter: any;
/**
 * Extract debug categories from a message
 * Supports multiple patterns:
 * - "category: message" -> ["category"]
 * - "[CATEGORY] message" -> ["category"]
 * - "MCP server \"name\": message" -> ["mcp", "name"]
 * - "[ANT-ONLY] 1P event: tengu_timer" -> ["ant-only", "1p"]
 *
 * Returns lowercase categories for case-insensitive matching
 */
export declare function extractDebugCategories(message: string): string[];
/**
 * Check if debug message should be shown based on filter
 * @param categories - Categories extracted from the message
 * @param filter - Parsed filter configuration
 * @returns true if message should be shown
 */
export declare function shouldShowDebugCategories(categories: string[], filter: DebugFilter | null): boolean;
/**
 * Main function to check if a debug message should be shown
 * Combines extraction and filtering
 */
export declare function shouldShowDebugMessage(message: string, filter: DebugFilter | null): boolean;
//# sourceMappingURL=debugFilter.d.ts.map