/**
 * JSON.stringify for one-message-per-line transports. Escapes U+2028
 * LINE SEPARATOR and U+2029 PARAGRAPH SEPARATOR so the serialized output
 * cannot be broken by a line-splitting receiver. Output is still valid
 * JSON and parses to the same value.
 */
export declare function ndjsonSafeStringify(value: unknown): string;
//# sourceMappingURL=ndjsonSafeStringify.d.ts.map