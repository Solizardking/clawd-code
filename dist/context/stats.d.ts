export type StatsStore = {
    increment(name: string, value?: number): void;
    set(name: string, value: number): void;
    observe(name: string, value: number): void;
    add(name: string, value: string): void;
    getAll(): Record<string, number>;
};
export declare function createStatsStore(): StatsStore;
export declare const StatsContext: any;
export declare function StatsProvider(t0: any): any;
export declare function useStats(): any;
export declare function useCounter(name: any): any;
export declare function useGauge(name: any): any;
export declare function useTimer(name: any): any;
export declare function useSet(name: any): any;
//# sourceMappingURL=stats.d.ts.map