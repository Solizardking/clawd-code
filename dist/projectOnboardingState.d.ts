export type Step = {
    key: string;
    text: string;
    isComplete: boolean;
    isCompletable: boolean;
    isEnabled: boolean;
};
export declare function getSteps(): Step[];
export declare function isProjectOnboardingComplete(): boolean;
export declare function maybeMarkProjectOnboardingComplete(): void;
export declare const shouldShowProjectOnboarding: any;
export declare function incrementProjectOnboardingSeenCount(): void;
//# sourceMappingURL=projectOnboardingState.d.ts.map