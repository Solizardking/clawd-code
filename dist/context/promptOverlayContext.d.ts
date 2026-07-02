import type { SuggestionItem } from '../components/PromptInput/PromptInputFooterSuggestions.js';
export type PromptOverlayData = {
    suggestions: SuggestionItem[];
    selectedSuggestion: number;
    maxColumnWidth?: number;
};
export declare function PromptOverlayProvider(t0: any): any;
export declare function usePromptOverlay(): any;
export declare function usePromptOverlayDialog(): any;
/**
 * Register suggestion data for the floating overlay. Clears on unmount.
 * No-op outside the provider (non-fullscreen renders inline instead).
 */
export declare function useSetPromptOverlay(data: any): void;
/**
 * Register a dialog node to float above the prompt. Clears on unmount.
 * No-op outside the provider (non-fullscreen renders inline instead).
 */
export declare function useSetPromptOverlayDialog(node: any): void;
//# sourceMappingURL=promptOverlayContext.d.ts.map