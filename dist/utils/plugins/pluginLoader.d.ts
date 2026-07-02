/**
 * Plugin Loader Module
 *
 * This module is responsible for discovering, loading, and validating Claude Code plugins
 * from various sources including marketplaces and git repositories.
 *
 * NPM packages are also supported but must be referenced through marketplaces - the marketplace
 * entry contains the NPM package information.
 *
 * Plugin Discovery Sources (in order of precedence):
 * 1. Marketplace-based plugins (plugin@marketplace format in settings)
 * 2. Session-only plugins (from --plugin-dir CLI flag or SDK plugins option)
 *
 * Plugin Directory Structure:
 * ```
 * my-plugin/
 * ├── plugin.json          # Optional manifest with metadata
 * ├── commands/            # Custom slash commands
 * │   ├── build.md
 * │   └── deploy.md
 * ├── agents/              # Custom AI agents
 * │   └── test-runner.md
 * └── hooks/               # Hook configurations
 *     └── hooks.json       # Hook definitions
 * ```
 *
 * The loader handles:
 * - Plugin manifest validation
 * - Hooks configuration loading and variable resolution
 * - Duplicate name detection
 * - Enable/disable state management
 * - Error collection and reporting
 */
import type { LoadedPlugin, PluginError, PluginManifest } from '../../types/plugin.js';
import { type PluginMarketplaceEntry, type PluginSource } from './schemas.js';
/**
 * Get the path where plugin cache is stored
 */
export declare function getPluginCachePath(): string;
/**
 * Compute the versioned cache path under a specific base plugins directory.
 * Used to probe both primary and seed caches.
 *
 * @param baseDir - Base plugins directory (e.g. getPluginsDirectory() or seed dir)
 * @param pluginId - Plugin identifier in format "name@marketplace"
 * @param version - Version string (semver, git SHA, etc.)
 * @returns Absolute path to versioned plugin directory under baseDir
 */
export declare function getVersionedCachePathIn(baseDir: string, pluginId: string, version: string): string;
/**
 * Get versioned cache path for a plugin under the primary plugins directory.
 * Format: ~/.claude/plugins/cache/{marketplace}/{plugin}/{version}/
 *
 * @param pluginId - Plugin identifier in format "name@marketplace"
 * @param version - Version string (semver, git SHA, etc.)
 * @returns Absolute path to versioned plugin directory
 */
export declare function getVersionedCachePath(pluginId: string, version: string): string;
/**
 * Get versioned ZIP cache path for a plugin.
 * This is the zip cache variant of getVersionedCachePath.
 */
export declare function getVersionedZipCachePath(pluginId: string, version: string): string;
/**
 * When the computed version is 'unknown', probe seed/cache/<m>/<p>/ for an
 * actual version dir. Handles the first-boot chicken-and-egg where the
 * version can only be known after cloning, but seed already has the clone.
 *
 * Per seed, only matches when exactly one version exists (typical BYOC case).
 * Multiple versions within a single seed → ambiguous → try next seed.
 * Seeds are checked in precedence order; first match wins.
 */
export declare function probeSeedCacheAnyVersion(pluginId: string): Promise<string | null>;
/**
 * Get legacy (non-versioned) cache path for a plugin.
 * Format: ~/.claude/plugins/cache/{plugin-name}/
 *
 * Used for backward compatibility with existing installations.
 *
 * @param pluginName - Plugin name (without marketplace suffix)
 * @returns Absolute path to legacy plugin directory
 */
export declare function getLegacyCachePath(pluginName: string): string;
/**
 * Resolve plugin path with fallback to legacy location.
 *
 * Always:
 * 1. Try versioned path first if version is provided
 * 2. Fall back to legacy path for existing installations
 * 3. Return versioned path for new installations
 *
 * @param pluginId - Plugin identifier in format "name@marketplace"
 * @param version - Optional version string
 * @returns Absolute path to plugin directory
 */
export declare function resolvePluginPath(pluginId: string, version?: string): Promise<string>;
/**
 * Recursively copy a directory.
 * Exported for testing purposes.
 */
export declare function copyDir(src: string, dest: string): Promise<void>;
/**
 * Copy plugin files to versioned cache directory.
 *
 * For local plugins: Uses entry.source from marketplace.json as the single source of truth.
 * For remote plugins: Falls back to copying sourcePath (the downloaded content).
 *
 * @param sourcePath - Path to the plugin source (used as fallback for remote plugins)
 * @param pluginId - Plugin identifier in format "name@marketplace"
 * @param version - Version string for versioned path
 * @param entry - Optional marketplace entry containing the source field
 * @param marketplaceDir - Marketplace directory for resolving entry.source (undefined for remote plugins)
 * @returns Path to the cached plugin directory
 * @throws Error if the source directory is not found
 * @throws Error if the destination directory is empty after copy
 */
export declare function copyPluginToVersionedCache(sourcePath: string, pluginId: string, version: string, entry?: PluginMarketplaceEntry, marketplaceDir?: string): Promise<string>;
/**
 * Install a plugin from npm using a global cache (exported for testing)
 */
export declare function installFromNpm(packageName: string, targetPath: string, options?: {
    registry?: string;
    version?: string;
}): Promise<void>;
/**
 * Clone a git repository (exported for testing)
 *
 * @param gitUrl - The git URL to clone
 * @param targetPath - Where to clone the repository
 * @param ref - Optional branch or tag to checkout
 * @param sha - Optional specific commit SHA to checkout
 */
export declare function gitClone(gitUrl: string, targetPath: string, ref?: string, sha?: string): Promise<void>;
/**
 * Install a plugin from a subdirectory of a git repository (exported for
 * testing).
 *
 * Uses partial clone (--filter=tree:0) + sparse-checkout so only the tree
 * objects along the path and the blobs under it are downloaded. For large
 * monorepos this is dramatically cheaper than a full clone — the tree objects
 * for a million-file repo can be hundreds of MB, all avoided here.
 *
 * Sequence:
 * 1. clone --depth 1 --filter=tree:0 --no-checkout [--branch ref]
 * 2. sparse-checkout set --cone -- <path>
 * 3. If sha: fetch --depth 1 origin <sha> (fallback: --unshallow), then
 *    checkout <sha>. The partial-clone filter is stored in remote config so
 *    subsequent fetches respect it; --unshallow gets all commits but trees
 *    and blobs remain lazy.
 *    If no sha: checkout HEAD (points to ref if --branch was used).
 * 4. Move <cloneDir>/<path> to targetPath and discard the clone.
 *
 * The clone is ephemeral — it goes into a sibling temp directory and is
 * removed after the subdir is extracted. targetPath ends up containing only
 * the plugin files with no .git directory.
 */
export declare function installFromGitSubdir(url: string, targetPath: string, subdirPath: string, ref?: string, sha?: string): Promise<string | undefined>;
/**
 * Generate a temporary cache name for a plugin
 */
export declare function generateTemporaryCacheNameForPlugin(source: PluginSource): string;
/**
 * Cache a plugin from an external source
 */
export declare function cachePlugin(source: PluginSource, options?: {
    manifest?: PluginManifest;
}): Promise<{
    path: string;
    manifest: PluginManifest;
    gitCommitSha?: string;
}>;
/**
 * Loads and validates a plugin manifest from a JSON file.
 *
 * The manifest provides metadata about the plugin including name, version,
 * description, author, and other optional fields. If no manifest exists,
 * a minimal one is created to allow the plugin to function.
 *
 * Example plugin.json:
 * ```json
 * {
 *   "name": "code-assistant",
 *   "version": "1.2.0",
 *   "description": "AI-powered code assistance tools",
 *   "author": {
 *     "name": "John Doe",
 *     "email": "john@example.com"
 *   },
 *   "keywords": ["coding", "ai", "assistant"],
 *   "homepage": "https://example.com/code-assistant",
 *   "hooks": "./custom-hooks.json",
 *   "commands": ["./extra-commands/*.md"]
 * }
 * ```
 */
/**
 * Loads and validates a plugin manifest from a JSON file.
 *
 * The manifest provides metadata about the plugin including name, version,
 * description, author, and other optional fields. If no manifest exists,
 * a minimal one is created to allow the plugin to function.
 *
 * Unknown keys in the manifest are silently stripped (PluginManifestSchema
 * uses zod's default strip behavior, not .strict()). Type mismatches and
 * other validation errors still fail.
 *
 * Behavior:
 * - Missing file: Creates default with provided name and source
 * - Invalid JSON: Throws error with parse details
 * - Schema validation failure: Throws error with validation details
 *
 * @param manifestPath - Full path to the plugin.json file
 * @param pluginName - Name to use in default manifest (e.g., "my-plugin")
 * @param source - Source description for default manifest (e.g., "git:repo" or ".claude-plugin/name")
 * @returns A valid PluginManifest object (either loaded or default)
 * @throws Error if manifest exists but is invalid (corrupt JSON or schema validation failure)
 */
export declare function loadPluginManifest(manifestPath: string, pluginName: string, source: string): Promise<PluginManifest>;
/**
 * Creates a LoadedPlugin object from a plugin directory path.
 *
 * This is the central function that assembles a complete plugin representation
 * by scanning the plugin directory structure and loading all components.
 * It handles both fully-featured plugins with manifests and minimal plugins
 * with just commands or agents directories.
 *
 * Directory structure it looks for:
 * ```
 * plugin-directory/
 * ├── plugin.json          # Optional: Plugin manifest
 * ├── commands/            # Optional: Custom slash commands
 * │   ├── build.md         # /build command
 * │   └── test.md          # /test command
 * ├── agents/              # Optional: Custom AI agents
 * │   ├── reviewer.md      # Code review agent
 * │   └── optimizer.md     # Performance optimization agent
 * └── hooks/               # Optional: Hook configurations
 *     └── hooks.json       # Hook definitions
 * ```
 *
 * Component detection:
 * - Manifest: Loaded from plugin.json if present, otherwise creates default
 * - Commands: Sets commandsPath if commands/ directory exists
 * - Agents: Sets agentsPath if agents/ directory exists
 * - Hooks: Loads from hooks/hooks.json if present
 *
 * The function is tolerant of missing components - a plugin can have
 * any combination of the above directories/files. Missing component files
 * are reported as errors but don't prevent plugin loading.
 *
 * @param pluginPath - Absolute path to the plugin directory
 * @param source - Source identifier (e.g., "git:repo", ".claude-plugin/my-plugin")
 * @param enabled - Initial enabled state (may be overridden by settings)
 * @param fallbackName - Name to use if manifest doesn't specify one
 * @param strict - When true, adds errors for duplicate hook files (default: true)
 * @returns Object containing the LoadedPlugin and any errors encountered
 */
export declare function createPluginFromPath(pluginPath: string, source: string, enabled: boolean, fallbackName: string, strict?: boolean): Promise<{
    plugin: LoadedPlugin;
    errors: PluginError[];
}>;
/**
 * Merge plugins from session (--plugin-dir), marketplace (installed), and
 * builtin sources. Session plugins override marketplace plugins with the
 * same name — the user explicitly pointed at a directory for this session.
 *
 * Exception: marketplace plugins locked by managed settings (policySettings)
 * cannot be overridden. Enterprise admin intent beats local dev convenience.
 * When a session plugin collides with a managed one, the session copy is
 * dropped and an error is returned for surfacing.
 *
 * Without this dedup, both versions sat in the array and marketplace won
 * on first-match, making --plugin-dir useless for iterating on an
 * installed plugin.
 */
export declare function mergePluginSources(sources: {
    session: LoadedPlugin[];
    marketplace: LoadedPlugin[];
    builtin: LoadedPlugin[];
    managedNames?: Set<string> | null;
}): {
    plugins: LoadedPlugin[];
    errors: PluginError[];
};
/**
 * Main plugin loading function that discovers and loads all plugins.
 *
 * This function is memoized to avoid repeated filesystem scanning and is
 * the primary entry point for the plugin system. It discovers plugins from
 * multiple sources and returns categorized results.
 *
 * Loading order and precedence (see mergePluginSources):
 * 1. Session-only plugins (from --plugin-dir CLI flag) — override
 *    installed plugins with the same name, UNLESS that plugin is
 *    locked by managed settings (policySettings, either force-enabled
 *    or force-disabled)
 * 2. Marketplace-based plugins (plugin@marketplace format from settings)
 * 3. Built-in plugins shipped with the CLI
 *
 * Name collision: session plugin wins over installed. The user explicitly
 * pointed at a directory for this session — that intent beats whatever
 * is installed. Exception: managed settings (enterprise policy) win over
 * --plugin-dir. Admin intent beats local dev convenience.
 *
 * Error collection:
 * - Non-fatal errors are collected and returned
 * - System continues loading other plugins on errors
 * - Errors include source information for debugging
 *
 * @returns Promise resolving to categorized plugin results:
 *   - enabled: Array of enabled LoadedPlugin objects
 *   - disabled: Array of disabled LoadedPlugin objects
 *   - errors: Array of loading errors with source information
 */
export declare const loadAllPlugins: any;
/**
 * Cache-only variant of loadAllPlugins.
 *
 * Same merge/dependency/settings logic, but the marketplace loader never
 * hits the network (no cachePlugin, no copyPluginToVersionedCache). Reads
 * from installed_plugins.json's installPath. Plugins not on disk emit
 * 'plugin-cache-miss' and are skipped.
 *
 * Use this in startup consumers (getCommands, loadPluginAgents, MCP/LSP
 * config) so interactive startup never blocks on git clones for ref-tracked
 * plugins. Use loadAllPlugins() in explicit refresh paths (/plugins,
 * refresh.ts, headlessPluginInstall) where fresh source is the intent.
 *
 * CLAUDE_CODE_SYNC_PLUGIN_INSTALL=1 delegates to the full loader — that
 * mode explicitly opts into blocking install before first query, and
 * main.tsx's getClaudeCodeMcpConfigs()/getInitialSettings().agent run
 * BEFORE runHeadless() can warm this cache. First-run CCR/headless has
 * no installed_plugins.json, so cache-only would miss plugin MCP servers
 * and plugin settings (the agent key). The interactive startup win is
 * preserved since interactive mode doesn't set SYNC_PLUGIN_INSTALL.
 *
 * Separate memoize cache from loadAllPlugins — a cache-only result must
 * never satisfy a caller that wants fresh source. The reverse IS valid:
 * loadAllPlugins warms this cache on completion so refresh paths that run
 * the full loader don't get plugin-cache-miss from their downstream
 * cache-only consumers.
 */
export declare const loadAllPluginsCacheOnly: any;
/**
 * Clears the memoized plugin cache.
 *
 * Call this when plugins are installed, removed, or settings change
 * to force a fresh scan on the next loadAllPlugins call.
 *
 * Use cases:
 * - After installing/uninstalling plugins
 * - After modifying .claude-plugin/ directory (for export)
 * - After changing enabledPlugins settings
 * - When debugging plugin loading issues
 */
export declare function clearPluginCache(reason?: string): void;
/**
 * Store merged plugin settings in the synchronous cache.
 * Called after loadAllPlugins resolves.
 */
export declare function cachePluginSettings(plugins: LoadedPlugin[]): void;
//# sourceMappingURL=pluginLoader.d.ts.map