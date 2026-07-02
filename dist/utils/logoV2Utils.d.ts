import type { LogOption } from '../types/logs.js';
export type LayoutMode = 'horizontal' | 'compact';
export type LayoutDimensions = {
    leftWidth: number;
    rightWidth: number;
    totalWidth: number;
};
/**
 * Determines the layout mode based on terminal width
 */
export declare function getLayoutMode(columns: number): LayoutMode;
/**
 * Calculates layout dimensions for the LogoV2 component
 */
export declare function calculateLayoutDimensions(columns: number, layoutMode: LayoutMode, optimalLeftWidth: number): LayoutDimensions;
/**
 * Calculates optimal left panel width based on content
 */
export declare function calculateOptimalLeftWidth(welcomeMessage: string, truncatedCwd: string, modelLine: string): number;
/**
 * Formats the welcome message based on username
 */
export declare function formatWelcomeMessage(username: string | null): string;
/**
 * Truncates a path in the middle if it's too long.
 * Width-aware: uses stringWidth() for correct CJK/emoji measurement.
 */
export declare function truncatePath(path: string, maxLength: number): string;
/**
 * Preloads recent conversations for display in Logo v2
 */
export declare function getRecentActivity(): Promise<LogOption[]>;
/**
 * Gets cached activity synchronously
 */
export declare function getRecentActivitySync(): LogOption[];
/**
 * Formats release notes for display, with smart truncation
 */
export declare function formatReleaseNoteForDisplay(note: string, maxWidth: number): string;
/**
 * Gets the common logo display data used by both LogoV2 and CondensedLogo
 */
export declare function getLogoDisplayData(): {
    version: string;
    cwd: string;
    billingType: string;
    agentName: string | undefined;
};
/**
 * Determines how to display model and billing information based on available width
 */
export declare function formatModelAndBilling(modelName: string, billingType: string, availableWidth: number): {
    shouldSplit: boolean;
    truncatedModel: string;
    truncatedBilling: string;
};
/**
 * Gets recent release notes for Logo v2 display
 * For ants, uses commits bundled at build time
 * For external users, uses public changelog
 */
export declare function getRecentReleaseNotesSync(maxItems: number): string[];
//# sourceMappingURL=logoV2Utils.d.ts.map