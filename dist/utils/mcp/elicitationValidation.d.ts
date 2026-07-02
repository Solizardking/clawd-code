import type { EnumSchema, MultiSelectEnumSchema, PrimitiveSchemaDefinition, StringSchema } from '@modelcontextprotocol/sdk/types.js';
export type ValidationResult = {
    value?: string | number | boolean;
    isValid: boolean;
    error?: string;
};
/**
 * Check if schema is a single-select enum (either legacy `enum` format or new `oneOf` format)
 */
export declare const isEnumSchema: (schema: PrimitiveSchemaDefinition) => schema is EnumSchema;
/**
 * Check if schema is a multi-select enum (`type: "array"` with `items.enum` or `items.anyOf`)
 */
export declare function isMultiSelectEnumSchema(schema: PrimitiveSchemaDefinition): schema is MultiSelectEnumSchema;
/**
 * Get values from a multi-select enum schema
 */
export declare function getMultiSelectValues(schema: MultiSelectEnumSchema): string[];
/**
 * Get display labels from a multi-select enum schema
 */
export declare function getMultiSelectLabels(schema: MultiSelectEnumSchema): string[];
/**
 * Get label for a specific value in a multi-select enum
 */
export declare function getMultiSelectLabel(schema: MultiSelectEnumSchema, value: string): string;
/**
 * Get enum values from EnumSchema (handles both legacy `enum` and new `oneOf` formats)
 */
export declare function getEnumValues(schema: EnumSchema): string[];
/**
 * Get enum display labels from EnumSchema
 */
export declare function getEnumLabels(schema: EnumSchema): string[];
/**
 * Get label for a specific enum value
 */
export declare function getEnumLabel(schema: EnumSchema, value: string): string;
export declare function validateElicitationInput(stringValue: string, schema: PrimitiveSchemaDefinition): ValidationResult;
/**
 * Returns a helpful placeholder/hint for a given format
 */
export declare function getFormatHint(schema: PrimitiveSchemaDefinition): string | undefined;
/**
 * Check if a schema is a date or date-time format that supports NL parsing
 */
export declare function isDateTimeSchema(schema: PrimitiveSchemaDefinition): schema is StringSchema & {
    format: 'date' | 'date-time';
};
/**
 * Async validation that attempts NL date/time parsing via Haiku
 * when the input doesn't look like ISO 8601.
 */
export declare function validateElicitationInputAsync(stringValue: string, schema: PrimitiveSchemaDefinition, signal: AbortSignal): Promise<ValidationResult>;
//# sourceMappingURL=elicitationValidation.d.ts.map