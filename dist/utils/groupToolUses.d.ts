import type { Tools } from '../Tool.js';
import type { NormalizedMessage, ProgressMessage, RenderableMessage } from '../types/message.js';
export type MessageWithoutProgress = Exclude<NormalizedMessage, ProgressMessage>;
export type GroupingResult = {
    messages: RenderableMessage[];
};
/**
 * Groups tool uses by message.id (same API response) if the tool supports grouped rendering.
 * Only groups 2+ tools of the same type from the same message.
 * Also collects corresponding tool_results and attaches them to the grouped message.
 * When verbose is true, skips grouping so messages render at original positions.
 */
export declare function applyGrouping(messages: MessageWithoutProgress[], tools: Tools, verbose?: boolean): GroupingResult;
//# sourceMappingURL=groupToolUses.d.ts.map