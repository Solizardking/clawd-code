import type { ToolSet } from "ai";
import type { BatchFunctionTool } from "./batch";
export declare function toolSetToBatchTools(tools: ToolSet): Promise<BatchFunctionTool[]>;
