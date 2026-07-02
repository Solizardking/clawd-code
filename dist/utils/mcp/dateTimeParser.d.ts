export type DateTimeParseResult = {
    success: true;
    value: string;
} | {
    success: false;
    error: string;
};
/**
 * Parse natural language date/time input into ISO 8601 format using Haiku.
 *
 * Examples:
 * - "tomorrow at 3pm" → "2025-10-15T15:00:00-07:00"
 * - "next Monday" → "2025-10-20"
 * - "in 2 hours" → "2025-10-14T12:30:00-07:00"
 *
 * @param input The natural language date/time string from the user
 * @param format Whether to parse as 'date' (YYYY-MM-DD) or 'date-time' (full ISO 8601 with time)
 * @param signal AbortSignal for cancellation
 * @returns Parsed ISO 8601 string or error message
 */
export declare function parseNaturalLanguageDateTime(input: string, format: 'date' | 'date-time', signal: AbortSignal): Promise<DateTimeParseResult>;
/**
 * Check if a string looks like it might be an ISO 8601 date/time.
 * Used to decide whether to attempt NL parsing.
 */
export declare function looksLikeISO8601(input: string): boolean;
//# sourceMappingURL=dateTimeParser.d.ts.map