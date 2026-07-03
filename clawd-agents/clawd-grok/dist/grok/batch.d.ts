export interface BatchClientOptions {
    apiKey: string;
    baseURL?: string;
    signal?: AbortSignal;
}
export interface BatchState {
    num_requests: number;
    num_pending: number;
    num_success: number;
    num_error: number;
    num_cancelled: number;
}
export interface BatchCostBreakdown {
    total_cost_usd_ticks?: number;
}
export interface BatchInfo {
    batch_id: string;
    name?: string;
    expires_at?: string;
    state: BatchState;
    cost_breakdown?: BatchCostBreakdown;
}
export interface BatchFunctionTool {
    type: "function";
    function: {
        name: string;
        description?: string;
        parameters: unknown;
        strict?: boolean;
    };
}
export interface BatchToolCall {
    id: string;
    type: "function";
    function: {
        name: string;
        arguments: string;
    };
}
export interface BatchChatMessage {
    role: "system" | "user" | "assistant" | "tool";
    content: string | Array<{
        type: "text";
        text: string;
    } | {
        type: "image_url";
        image_url: {
            url: string;
        };
    }>;
    tool_calls?: BatchToolCall[];
    tool_call_id?: string;
}
export interface BatchChatCompletionRequest {
    model: string;
    messages: BatchChatMessage[];
    temperature?: number;
    max_completion_tokens?: number;
    reasoning_effort?: "low" | "medium" | "high" | "xhigh";
    tools?: BatchFunctionTool[];
    tool_choice?: "auto" | "none" | "required" | {
        type: "function";
        function: {
            name: string;
        };
    };
}
export interface BatchRequestEntry {
    batch_request_id: string;
    batch_request: {
        chat_get_completion: BatchChatCompletionRequest;
    };
}
export interface BatchChatCompletionChoice {
    index?: number;
    finish_reason?: string | null;
    message: {
        role?: "assistant";
        content?: string | null;
        tool_calls?: BatchToolCall[];
    };
}
export interface BatchChatCompletionUsage {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
    input_tokens?: number;
    output_tokens?: number;
    cost_in_usd_ticks?: number;
}
export interface BatchChatCompletionResponse {
    id?: string;
    model?: string;
    choices: BatchChatCompletionChoice[];
    usage?: BatchChatCompletionUsage;
}
export interface BatchResultEntry {
    batch_request_id: string;
    error_message?: string;
    batch_result?: {
        error?: string;
        response?: {
            chat_get_completion?: BatchChatCompletionResponse;
        };
    };
}
export interface BatchResultsPage {
    results: BatchResultEntry[];
    pagination_token?: string | null;
}
export interface PollBatchRequestOptions extends BatchClientOptions {
    batchId: string;
    batchRequestId: string;
    timeoutMs?: number;
    initialPollMs?: number;
    maxPollMs?: number;
    pageSize?: number;
}
export declare function createBatch(options: BatchClientOptions & {
    name: string;
    inputFileId?: string;
}): Promise<BatchInfo>;
export declare function addBatchRequests(options: BatchClientOptions & {
    batchId: string;
    batchRequests: BatchRequestEntry[];
}): Promise<void>;
export declare function getBatchStatus(options: BatchClientOptions & {
    batchId: string;
}): Promise<BatchInfo>;
export declare function listBatchResults(options: BatchClientOptions & {
    batchId: string;
    pageSize?: number;
    paginationToken?: string;
}): Promise<BatchResultsPage>;
export declare function pollBatchRequestResult(options: PollBatchRequestOptions): Promise<BatchResultEntry>;
export declare function getBatchChatCompletion(result: BatchResultEntry): BatchChatCompletionResponse;
