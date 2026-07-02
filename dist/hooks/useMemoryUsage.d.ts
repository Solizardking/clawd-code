export type MemoryUsageStatus = 'normal' | 'high' | 'critical';
export type MemoryUsageInfo = {
    heapUsed: number;
    status: MemoryUsageStatus;
};
/**
 * Hook to monitor Node.js process memory usage.
 * Polls every 10 seconds; returns null while status is 'normal'.
 */
export declare function useMemoryUsage(): MemoryUsageInfo | null;
//# sourceMappingURL=useMemoryUsage.d.ts.map