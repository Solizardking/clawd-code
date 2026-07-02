import type { RenderableMessage } from '../types/message.js';
/**
 * Collapses consecutive hook summary messages with the same hookLabel
 * (e.g. PostToolUse) into a single summary. This happens when parallel
 * tool calls each emit their own hook summary.
 */
export declare function collapseHookSummaries(messages: RenderableMessage[]): RenderableMessage[];
//# sourceMappingURL=collapseHookSummaries.d.ts.map