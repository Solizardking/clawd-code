import type { LogOption } from '../types/logs.js';
export type LogSelectorProps = {
    logs: LogOption[];
    maxHeight?: number;
    forceWidth?: number;
    onCancel?: () => void;
    onSelect: (log: LogOption) => void;
    onLogsChanged?: () => void;
    onLoadMore?: (count: number) => void;
    initialSearchQuery?: string;
    showAllProjects?: boolean;
    onToggleAllProjects?: () => void;
    onAgenticSearch?: (query: string, logs: LogOption[], signal?: AbortSignal) => Promise<LogOption[]>;
};
export declare function LogSelector(t0: any): any;
//# sourceMappingURL=LogSelector.d.ts.map