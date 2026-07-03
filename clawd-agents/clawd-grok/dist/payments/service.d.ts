import type { PaymentInspectionResult } from "./types";
interface RequestArgs {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    headers?: Record<string, string>;
    body?: string;
}
interface PaidRequestArgs extends RequestArgs {
}
export declare class X402Service {
    private readonly settings;
    private readonly walletManager;
    private readonly history;
    private ensureEnabled;
    fetchPaymentInfo(args: RequestArgs): Promise<PaymentInspectionResult>;
    paidRequest(args: PaidRequestArgs, sessionId?: string): Promise<{
        success: boolean;
        output: string;
    }>;
}
export declare function formatInspectionOutput(inspection: PaymentInspectionResult): string;
export {};
