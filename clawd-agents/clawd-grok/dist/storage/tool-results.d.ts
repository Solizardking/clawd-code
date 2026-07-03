import type { ToolResult } from "../types/index";
export declare function extractToolResultFromOutput(output: unknown): ToolResult | null;
export declare function getOutputKind(output: unknown): string;
export declare function isOutputSuccess(output: unknown): boolean;
