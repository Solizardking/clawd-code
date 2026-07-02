type ExtraUsageResult = {
    type: 'message';
    value: string;
} | {
    type: 'browser-opened';
    url: string;
    opened: boolean;
};
export declare function runExtraUsage(): Promise<ExtraUsageResult>;
export {};
//# sourceMappingURL=extra-usage-core.d.ts.map