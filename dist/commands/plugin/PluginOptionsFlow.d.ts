/**
 * Post-install/post-enable config prompt.
 *
 * Given a LoadedPlugin, checks both the top-level manifest.userConfig and the
 * channel-specific userConfig. Walks PluginOptionsDialog through each
 * unconfigured item, saving via the appropriate storage function. Calls
 * onDone('skipped') immediately if nothing needs filling.
 */
import * as React from 'react';
import type { LoadedPlugin } from '../../types/plugin.js';
/**
 * Post-install lookup: return the LoadedPlugin for the just-installed
 * pluginId so the caller can divert to PluginOptionsFlow. Returns undefined
 * if the plugin somehow didn't make it into the fresh load — callers treat
 * undefined as "carry on closing."
 *
 * Install should have cleared caches already; loadAllPlugins reads fresh.
 */
export declare function findPluginOptionsTarget(pluginId: string): Promise<LoadedPlugin | undefined>;
type Props = {
    plugin: LoadedPlugin;
    /** `name@marketplace` — the savePluginOptions / saveMcpServerUserConfig key. */
    pluginId: string;
    /**
     * `configured` = user filled all fields. `skipped` = nothing needed
     * configuring, or user hit cancel. `error` = save threw.
     */
    onDone: (outcome: 'configured' | 'skipped' | 'error', detail?: string) => void;
};
export declare function PluginOptionsFlow({ plugin, pluginId, onDone }: Props): React.ReactNode;
export {};
//# sourceMappingURL=PluginOptionsFlow.d.ts.map