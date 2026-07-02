/**
 * Clawd Code — TRADE MODE
 * Perpetuals trading with Phoenix + Vulcan CLI + Helius RPC
 * Default model for AI analysis: Z.AI GLM-5.2, with GLM-5V for chart vision.
 */
export declare class TradeMode {
    private config;
    constructor(config: any);
    run(args: string[]): Promise<void>;
    private commandText;
    private argValue;
    private firstUrl;
    private firstExistingImagePath;
    private analyzeChart;
    private imageInputToUrl;
    private expandPath;
    private mimeFromPath;
    private getVulcanCommand;
    private buildVulcanArgs;
    private runVulcanCommand;
    private fetchFundingRates;
    private fetchFundingRatesViaHelius;
    private fetchTicker;
    private fetchOrderbook;
    private executeShort;
    private executeLong;
    private scanMarkets;
    private showPosition;
    private paperTrade;
    private showStatus;
}
//# sourceMappingURL=trade.d.ts.map