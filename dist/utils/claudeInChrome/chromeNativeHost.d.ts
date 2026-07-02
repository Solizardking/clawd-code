/**
 * Chrome Native Host - Pure TypeScript Implementation
 *
 * This module provides the Chrome native messaging host functionality,
 * previously implemented as a Rust NAPI binding but now in pure TypeScript.
 */
/**
 * Send a message to stdout (Chrome native messaging protocol)
 */
export declare function sendChromeMessage(message: string): void;
export declare function runChromeNativeHost(): Promise<void>;
//# sourceMappingURL=chromeNativeHost.d.ts.map