/**
 * Zip Cache Adapters
 *
 * I/O helpers for the plugin zip cache. These functions handle reading/writing
 * zip-cache-local metadata files, extracting ZIPs to session directories,
 * and creating ZIPs for newly installed plugins.
 *
 * The zip cache stores data on a mounted volume (e.g., Filestore) that persists
 * across ephemeral container lifetimes. The session cache is a local temp dir
 * for extracted plugins used during a single session.
 */
import { type KnownMarketplacesFile, type PluginMarketplace } from './schemas.js';
/**
 * Read known_marketplaces.json from the zip cache.
 * Returns empty object if file doesn't exist, can't be parsed, or fails schema
 * validation (data comes from a shared mounted volume — other containers may write).
 */
export declare function readZipCacheKnownMarketplaces(): Promise<KnownMarketplacesFile>;
/**
 * Write known_marketplaces.json to the zip cache atomically.
 */
export declare function writeZipCacheKnownMarketplaces(data: KnownMarketplacesFile): Promise<void>;
/**
 * Read a marketplace JSON file from the zip cache.
 */
export declare function readMarketplaceJson(marketplaceName: string): Promise<PluginMarketplace | null>;
/**
 * Save a marketplace JSON to the zip cache from its install location.
 */
export declare function saveMarketplaceJsonToZipCache(marketplaceName: string, installLocation: string): Promise<void>;
/**
 * Sync marketplace data to zip cache for offline access.
 * Saves marketplace JSONs and merges with previously cached data
 * so ephemeral containers can access marketplaces without re-cloning.
 */
export declare function syncMarketplacesToZipCache(): Promise<void>;
//# sourceMappingURL=zipCacheAdapters.d.ts.map