import type { Agent } from "../agent/agent";
import type { ToolCall, ToolResult } from "../types/index";
import type { TurnCoordinator } from "./turn-coordinator";
export { splitTelegramMessage, TELEGRAM_MAX_MESSAGE } from "./limits";
export interface TelegramBridgeOptions {
    token: string;
    getApprovedUserIds: () => number[];
    coordinator: TurnCoordinator;
    getTelegramAgent: (userId: number) => Agent;
    onUserMessage?: (event: {
        turnKey: string;
        userId: number;
        content: string;
    }) => void;
    onAssistantMessage?: (event: {
        turnKey: string;
        userId: number;
        content: string;
        done: boolean;
    }) => void;
    onToolCalls?: (event: {
        turnKey: string;
        userId: number;
        toolCalls: ToolCall[];
    }) => void;
    onToolResult?: (event: {
        turnKey: string;
        userId: number;
        toolCall: ToolCall;
        toolResult: ToolResult;
    }) => void;
    onError?: (message: string) => void;
}
export interface TelegramBridgeHandle {
    start: () => void;
    stop: () => Promise<void>;
    sendDm: (userId: number, text: string) => Promise<void>;
}
export declare function createTelegramBridge(opts: TelegramBridgeOptions): TelegramBridgeHandle;
