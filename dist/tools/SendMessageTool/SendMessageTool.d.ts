import { z } from 'zod/v4';
import type { Tool } from '../../Tool.js';
declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
export type Input = z.infer<InputSchema>;
export type MessageRouting = {
    sender: string;
    senderColor?: string;
    target: string;
    targetColor?: string;
    summary?: string;
    content?: string;
};
export type MessageOutput = {
    success: boolean;
    message: string;
    routing?: MessageRouting;
};
export type BroadcastOutput = {
    success: boolean;
    message: string;
    recipients: string[];
    routing?: MessageRouting;
};
export type RequestOutput = {
    success: boolean;
    message: string;
    request_id: string;
    target: string;
};
export type ResponseOutput = {
    success: boolean;
    message: string;
    request_id?: string;
};
export type SendMessageToolOutput = MessageOutput | BroadcastOutput | RequestOutput | ResponseOutput;
export declare const SendMessageTool: Tool<InputSchema, SendMessageToolOutput>;
export {};
//# sourceMappingURL=SendMessageTool.d.ts.map