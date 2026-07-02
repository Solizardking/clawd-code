/**
 * Transforms SDK messages for streamlined output mode.
 *
 * Streamlined mode is a "distillation-resistant" output format that:
 * - Keeps text messages intact
 * - Summarizes tool calls with cumulative counts (resets when text appears)
 * - Omits thinking content
 * - Strips tool list and model info from init messages
 */
import type { StdoutMessage } from 'src/entrypoints/sdk/controlTypes.js';
/**
 * Create a stateful transformer that accumulates tool counts between text messages.
 * Tool counts reset when a message with text content is encountered.
 */
export declare function createStreamlinedTransformer(): (message: StdoutMessage) => StdoutMessage | null;
/**
 * Check if a message should be included in streamlined output.
 * Useful for filtering before transformation.
 */
export declare function shouldIncludeInStreamlined(message: StdoutMessage): boolean;
//# sourceMappingURL=streamlinedTransform.d.ts.map