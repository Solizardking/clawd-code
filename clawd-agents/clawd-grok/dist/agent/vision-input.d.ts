import type { ModelMessage } from "ai";
export declare function buildVisionUserMessages(prompt: string, cwd: string, abortSignal?: AbortSignal): Promise<ModelMessage[]>;
