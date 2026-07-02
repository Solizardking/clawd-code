import { formatDuration, truncateToWidth } from '../utils/format.js';
/** Bridge status state machine states. */
export type StatusState = 'idle' | 'attached' | 'titled' | 'reconnecting' | 'failed';
/** How long a tool activity line stays visible after last tool_start (ms). */
export declare const TOOL_DISPLAY_EXPIRY_MS = 30000;
/** Interval for the shimmer animation tick (ms). */
export declare const SHIMMER_INTERVAL_MS = 150;
export declare function timestamp(): string;
export { formatDuration, truncateToWidth as truncatePrompt };
/** Abbreviate a tool activity summary for the trail display. */
export declare function abbreviateActivity(summary: string): string;
/** Build the connect URL shown when the bridge is idle. */
export declare function buildBridgeConnectUrl(environmentId: string, ingressUrl?: string): string;
/**
 * Build the session URL shown when a session is attached. Delegates to
 * getRemoteSessionUrl for the cse_→session_ prefix translation, then appends
 * the v1-specific ?bridge={environmentId} query.
 */
export declare function buildBridgeSessionUrl(sessionId: string, environmentId: string, ingressUrl?: string): string;
/** Compute the glimmer index for a reverse-sweep shimmer animation. */
export declare function computeGlimmerIndex(tick: number, messageWidth: number): number;
/**
 * Split text into three segments by visual column position for shimmer rendering.
 *
 * Uses grapheme segmentation and `stringWidth` so the split is correct for
 * multi-byte characters, emoji, and CJK glyphs.
 *
 * Returns `{ before, shimmer, after }` strings. Both renderers (chalk in
 * bridgeUI.ts and React/Ink in bridge.tsx) apply their own coloring to
 * these segments.
 */
export declare function computeShimmerSegments(text: string, glimmerIndex: number): {
    before: string;
    shimmer: string;
    after: string;
};
/** Computed bridge status label and color from connection state. */
export type BridgeStatusInfo = {
    label: 'Remote Control failed' | 'Remote Control reconnecting' | 'Remote Control active' | 'Remote Control connecting\u2026';
    color: 'error' | 'warning' | 'success';
};
/** Derive a status label and color from the bridge connection state. */
export declare function getBridgeStatus({ error, connected, sessionActive, reconnecting, }: {
    error: string | undefined;
    connected: boolean;
    sessionActive: boolean;
    reconnecting: boolean;
}): BridgeStatusInfo;
/** Footer text shown when bridge is idle (Ready state). */
export declare function buildIdleFooterText(url: string): string;
/** Footer text shown when a session is active (Connected state). */
export declare function buildActiveFooterText(url: string): string;
/** Footer text shown when the bridge has failed. */
export declare const FAILED_FOOTER_TEXT = "Something went wrong, please try again";
/**
 * Wrap text in an OSC 8 terminal hyperlink. Zero visual width for layout purposes.
 * strip-ansi (used by stringWidth) correctly strips these sequences, so
 * countVisualLines in bridgeUI.ts remains accurate.
 */
export declare function wrapWithOsc8Link(text: string, url: string): string;
//# sourceMappingURL=bridgeStatusUtil.d.ts.map