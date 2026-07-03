import type { ChatEntry, ToolCall, ToolResult } from "../types/index";
export interface EntryDecoration {
    modeColor?: string;
    remoteKey?: string;
    sourceLabel?: string;
}
export declare function getTelegramSourceLabel(kind: "user" | "assistant", userId: number): string;
export declare function buildUserEntry(content: string, decoration?: EntryDecoration): ChatEntry;
export declare function buildAssistantEntry(content: string, decoration?: EntryDecoration): ChatEntry;
export declare function buildToolResultEntry(toolCall: ToolCall, toolResult: ToolResult, decoration?: EntryDecoration): ChatEntry;
export declare function getUnflushedTelegramAssistantContent(fullContent: string, flushedChars: number): string;
export declare function replaceTurnEntries(entries: ChatEntry[], turnKey: string, replacements: ChatEntry[]): ChatEntry[];
export declare function decorateTelegramEntries(entries: ChatEntry[], userId: number, turnKey: string): ChatEntry[];
