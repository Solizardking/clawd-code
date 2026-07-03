import type { ToolResult } from "../types/index";
export interface ComputerScreenshotInput {
    output_path?: string;
    app?: string;
    window_id?: string;
}
export interface ComputerSnapshotInput {
    app?: string;
    window_id?: string;
    interactive_only?: boolean;
    include_bounds?: boolean;
    compact?: boolean;
    max_depth?: number;
    surface?: "window" | "focused" | "menu" | "menubar" | "sheet" | "popover" | "alert";
}
export interface ComputerClickInput {
    ref?: string;
    x?: number;
    y?: number;
    button?: "left" | "right" | "middle";
    count?: number;
}
export interface ComputerMouseMoveInput {
    ref?: string;
    x?: number;
    y?: number;
    duration_ms?: number;
}
export interface ComputerTypeInput {
    ref: string;
    text: string;
}
export interface ComputerPressInput {
    key: string;
    app?: string;
}
export interface ComputerScrollInput {
    ref: string;
    direction: "up" | "down" | "left" | "right";
    amount?: number;
}
export interface ComputerLaunchInput {
    app: string;
    timeout_ms?: number;
}
export interface ComputerListWindowsInput {
    app?: string;
}
export interface ComputerFocusWindowInput {
    app?: string;
    title?: string;
    window_id?: string;
}
export interface ComputerWaitInput {
    milliseconds?: number;
    element?: string;
    window?: string;
    text?: string;
    timeout_ms?: number;
    app?: string;
    menu?: boolean;
    menu_closed?: boolean;
}
export interface ComputerGetInput {
    ref: string;
    property?: "text" | "value" | "title" | "bounds" | "role" | "states";
}
export interface AgentDesktopRunResult {
    success: boolean;
    stdout: string;
    stderr: string;
    error?: string;
}
export type AgentDesktopRunner = (args: string[], cwd: string, abortSignal?: AbortSignal) => Promise<AgentDesktopRunResult>;
export declare function computerScreenshot(input: ComputerScreenshotInput, cwd: string, abortSignal?: AbortSignal, runner?: AgentDesktopRunner): Promise<ToolResult>;
export declare function computerSnapshot(input: ComputerSnapshotInput, cwd: string, abortSignal?: AbortSignal, runner?: AgentDesktopRunner): Promise<ToolResult>;
export declare function computerClick(input: ComputerClickInput, cwd: string, abortSignal?: AbortSignal, runner?: AgentDesktopRunner): Promise<ToolResult>;
export declare function computerMouseMove(input: ComputerMouseMoveInput, cwd: string, abortSignal?: AbortSignal, runner?: AgentDesktopRunner): Promise<ToolResult>;
export declare function computerType(input: ComputerTypeInput, cwd: string, abortSignal?: AbortSignal, runner?: AgentDesktopRunner): Promise<ToolResult>;
export declare function computerPress(input: ComputerPressInput, cwd: string, abortSignal?: AbortSignal, runner?: AgentDesktopRunner): Promise<ToolResult>;
export declare function computerScroll(input: ComputerScrollInput, cwd: string, abortSignal?: AbortSignal, runner?: AgentDesktopRunner): Promise<ToolResult>;
export declare function computerLaunch(input: ComputerLaunchInput, cwd: string, abortSignal?: AbortSignal, runner?: AgentDesktopRunner): Promise<ToolResult>;
export declare function computerListWindows(input: ComputerListWindowsInput, cwd: string, abortSignal?: AbortSignal, runner?: AgentDesktopRunner): Promise<ToolResult>;
export declare function computerFocusWindow(input: ComputerFocusWindowInput, cwd: string, abortSignal?: AbortSignal, runner?: AgentDesktopRunner): Promise<ToolResult>;
export declare function computerWait(input: ComputerWaitInput, cwd: string, abortSignal?: AbortSignal, runner?: AgentDesktopRunner): Promise<ToolResult>;
export declare function computerGet(input: ComputerGetInput, cwd: string, abortSignal?: AbortSignal, runner?: AgentDesktopRunner): Promise<ToolResult>;
export declare function buildScreenshotPath(cwd: string, outputPath?: string): string;
export declare function buildAgentDesktopEnv(source?: NodeJS.ProcessEnv): NodeJS.ProcessEnv;
