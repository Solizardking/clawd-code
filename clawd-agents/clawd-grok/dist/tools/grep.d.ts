import type { ToolResult } from "../types/index";
interface GrepParams {
    pattern: string;
    path?: string;
    include?: string;
}
export declare function executeGrep(params: GrepParams, cwd: string): Promise<ToolResult>;
export {};
