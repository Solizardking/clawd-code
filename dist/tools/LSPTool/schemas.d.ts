import { z } from 'zod/v4';
/**
 * Discriminated union of all LSP operations
 * Uses 'operation' as the discriminator field
 */
export declare const lspToolInputSchema: () => any;
/**
 * TypeScript type for LSPTool input
 */
export type LSPToolInput = z.infer<ReturnType<typeof lspToolInputSchema>>;
/**
 * Type guard to check if an operation is a valid LSP operation
 */
export declare function isValidLSPOperation(operation: string): operation is LSPToolInput['operation'];
//# sourceMappingURL=schemas.d.ts.map