/**
 * Marketplace reconciler — makes known_marketplaces.json consistent with
 * declared intent in settings.
 *
 * Two layers:
 * - diffMarketplaces(): comparison (reads .git for worktree canonicalization, memoized)
 * - reconcileMarketplaces(): bundled diff + install (I/O, idempotent, additive)
 */
import { type DeclaredMarketplace } from './marketplaceManager.js';
import { type KnownMarketplacesFile, type MarketplaceSource } from './schemas.js';
export type MarketplaceDiff = {
    /** Declared in settings, absent from known_marketplaces.json */
    missing: string[];
    /** Present in both, but settings source ≠ JSON source (settings wins) */
    sourceChanged: Array<{
        name: string;
        declaredSource: MarketplaceSource;
        materializedSource: MarketplaceSource;
    }>;
    /** Present in both, sources match */
    upToDate: string[];
};
/**
 * Compare declared intent (settings) against materialized state (JSON).
 *
 * Resolves relative directory/file paths in `declared` before comparing,
 * so project settings with `./path` match JSON's absolute path. Path
 * resolution reads `.git` to canonicalize worktree paths (memoized).
 */
export declare function diffMarketplaces(declared: Record<string, DeclaredMarketplace>, materialized: KnownMarketplacesFile, opts?: {
    projectRoot?: string;
}): MarketplaceDiff;
export type ReconcileOptions = {
    /** Skip a declared marketplace. Used by zip-cache mode for unsupported source types. */
    skip?: (name: string, source: MarketplaceSource) => boolean;
    onProgress?: (event: ReconcileProgressEvent) => void;
};
export type ReconcileProgressEvent = {
    type: 'installing';
    name: string;
    action: 'install' | 'update';
    index: number;
    total: number;
} | {
    type: 'installed';
    name: string;
    alreadyMaterialized: boolean;
} | {
    type: 'failed';
    name: string;
    error: string;
};
export type ReconcileResult = {
    installed: string[];
    updated: string[];
    failed: Array<{
        name: string;
        error: string;
    }>;
    upToDate: string[];
    skipped: string[];
};
/**
 * Make known_marketplaces.json consistent with declared intent.
 * Idempotent. Additive only (never deletes). Does not touch AppState.
 */
export declare function reconcileMarketplaces(opts?: ReconcileOptions): Promise<ReconcileResult>;
//# sourceMappingURL=reconciler.d.ts.map