import '../bootstrap/state.js';
import '../utils/config.js';
export declare const init: any;
/**
 * Initialize telemetry after trust has been granted.
 * For remote-settings-eligible users, waits for settings to load (non-blocking),
 * then re-applies env vars (to include remote settings) before initializing telemetry.
 * For non-eligible users, initializes telemetry immediately.
 * This should only be called once, after the trust dialog has been accepted.
 */
export declare function initializeTelemetryAfterTrust(): void;
//# sourceMappingURL=init.d.ts.map