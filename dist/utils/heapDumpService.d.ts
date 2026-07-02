/**
 * Service for heap dump capture.
 * Used by the /heapdump command.
 */
export type HeapDumpResult = {
    success: boolean;
    heapPath?: string;
    diagPath?: string;
    error?: string;
};
/**
 * Memory diagnostics captured alongside heap dump.
 * Helps identify if leak is in V8 heap (captured in snapshot) or native memory (not captured).
 */
export type MemoryDiagnostics = {
    timestamp: string;
    sessionId: string;
    trigger: 'manual' | 'auto-1.5GB';
    dumpNumber: number;
    uptimeSeconds: number;
    memoryUsage: {
        heapUsed: number;
        heapTotal: number;
        external: number;
        arrayBuffers: number;
        rss: number;
    };
    memoryGrowthRate: {
        bytesPerSecond: number;
        mbPerHour: number;
    };
    v8HeapStats: {
        heapSizeLimit: number;
        mallocedMemory: number;
        peakMallocedMemory: number;
        detachedContexts: number;
        nativeContexts: number;
    };
    v8HeapSpaces?: Array<{
        name: string;
        size: number;
        used: number;
        available: number;
    }>;
    resourceUsage: {
        maxRSS: number;
        userCPUTime: number;
        systemCPUTime: number;
    };
    activeHandles: number;
    activeRequests: number;
    openFileDescriptors?: number;
    analysis: {
        potentialLeaks: string[];
        recommendation: string;
    };
    smapsRollup?: string;
    platform: string;
    nodeVersion: string;
    ccVersion: string;
};
/**
 * Capture memory diagnostics.
 * This helps identify if the leak is in V8 heap (captured) or native memory (not captured).
 */
export declare function captureMemoryDiagnostics(trigger: 'manual' | 'auto-1.5GB', dumpNumber?: number): Promise<MemoryDiagnostics>;
/**
 * Core heap dump function — captures heap snapshot + diagnostics to ~/Desktop.
 *
 * Diagnostics are written BEFORE the heap snapshot is captured, because the
 * V8 heap snapshot serialization can crash for very large heaps. By writing
 * diagnostics first, we still get useful memory info even if the snapshot fails.
 */
export declare function performHeapDump(trigger?: 'manual' | 'auto-1.5GB', dumpNumber?: number): Promise<HeapDumpResult>;
//# sourceMappingURL=heapDumpService.d.ts.map