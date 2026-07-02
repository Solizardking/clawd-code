import { type DOMElement } from '../ink.js';
/**
 * Hook for synchronized blinking animations that pause when offscreen.
 *
 * Returns a ref to attach to the animated element and the current blink state.
 * All instances blink together because they derive state from the same
 * animation clock. The clock only runs when at least one subscriber is visible.
 * Pauses when the terminal is blurred.
 *
 * @param enabled - Whether blinking is active
 * @returns [ref, isVisible] - Ref to attach to element, true when visible in blink cycle
 *
 * @example
 * function BlinkingDot({ shouldAnimate }) {
 *   const [ref, isVisible] = useBlink(shouldAnimate)
 *   return <Box ref={ref}>{isVisible ? '●' : ' '}</Box>
 * }
 */
export declare function useBlink(enabled: boolean, intervalMs?: number): [ref: (element: DOMElement | null) => void, isVisible: boolean];
//# sourceMappingURL=useBlink.d.ts.map