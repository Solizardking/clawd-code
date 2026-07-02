import type { DailyActivity } from './stats.js';
export type HeatmapOptions = {
    terminalWidth?: number;
    showMonthLabels?: boolean;
};
/**
 * Generates a GitHub-style activity heatmap for the terminal
 */
export declare function generateHeatmap(dailyActivity: DailyActivity[], options?: HeatmapOptions): string;
//# sourceMappingURL=heatmap.d.ts.map