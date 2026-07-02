import { type PollIntervalConfig } from './pollConfigDefaults.js';
/**
 * Fetch the bridge poll interval config from GrowthBook with a 5-minute
 * refresh window. Validates the served JSON against the schema; falls back
 * to defaults if the flag is absent, malformed, or partially-specified.
 *
 * Shared by bridgeMain.ts (standalone) and replBridge.ts (REPL) so ops
 * can tune both poll rates fleet-wide with a single config push.
 */
export declare function getPollIntervalConfig(): PollIntervalConfig;
//# sourceMappingURL=pollConfig.d.ts.map