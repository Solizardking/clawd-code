import type { PaymentAuditRecord } from "./types";
export declare class PaymentHistory {
    static getLogPath(): string;
    record(entry: PaymentAuditRecord): void;
    list(limit?: number): PaymentAuditRecord[];
}
