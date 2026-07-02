/**
 * Clawd Code — CHART MODE
 * GLM-5.2 chart/report agent with GLM-5V vision and GLM Slide/Poster export.
 */
export declare class ChartMode {
    private config;
    constructor(config: any);
    run(args: string[]): Promise<void>;
    private parseArgs;
    private parsePositiveInt;
    private firstUrl;
    private firstExistingImagePath;
    private analyzeChartImage;
    private generateChartPlan;
    private generateSlidePoster;
    private printSlidePosterExport;
    private composePlannerPrompt;
    private composeSlidePosterPrompt;
    private printOfflinePlan;
    private printHelp;
    private compactAgentText;
    private imageInputToUrl;
    private expandPath;
    private mimeFromPath;
}
//# sourceMappingURL=chart.d.ts.map