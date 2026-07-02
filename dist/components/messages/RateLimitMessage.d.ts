type UpsellParams = {
    shouldShowUpsell: boolean;
    isMax20x: boolean;
    isExtraUsageCommandEnabled: boolean;
    shouldAutoOpenRateLimitOptionsMenu: boolean;
    isTeamOrEnterprise: boolean;
    hasBillingAccess: boolean;
};
export declare function getUpsellMessage({ shouldShowUpsell, isMax20x, isExtraUsageCommandEnabled, shouldAutoOpenRateLimitOptionsMenu, isTeamOrEnterprise, hasBillingAccess }: UpsellParams): string | null;
export declare function RateLimitMessage(t0: any): any;
export {};
//# sourceMappingURL=RateLimitMessage.d.ts.map