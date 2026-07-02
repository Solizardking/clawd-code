/**
 * Session Memory automatically maintains a markdown file with notes about the current conversation.
 * It runs periodically in the background using a forked subagent to extract key information
 * without interrupting the main conversation flow.
 */
import type { CanUseToolFn } from '../../hooks/useCanUseTool.js';
import type { ToolUseContext } from '../../Tool.js';
import type { Message } from '../../types/message.js';
/**
 * Reset the last memory message UUID (for testing)
 */
export declare function resetLastMemoryMessageUuid(): void;
export declare function shouldExtractMemory(messages: Message[]): boolean;
/**
 * Initialize session memory by registering the post-sampling hook.
 * This is synchronous to avoid race conditions during startup.
 * The gate check and config loading happen lazily when the hook runs.
 */
export declare function initSessionMemory(): void;
export type ManualExtractionResult = {
    success: boolean;
    memoryPath?: string;
    error?: string;
};
/**
 * Manually trigger session memory extraction, bypassing threshold checks.
 * Used by the /summary command.
 */
export declare function manuallyExtractSessionMemory(messages: Message[], toolUseContext: ToolUseContext): Promise<ManualExtractionResult>;
/**
 * Creates a canUseTool function that only allows Edit for the exact memory file.
 */
export declare function createMemoryFileCanUseTool(memoryPath: string): CanUseToolFn;
//# sourceMappingURL=sessionMemory.d.ts.map