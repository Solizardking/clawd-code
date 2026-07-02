import type { PluginOptionSchema, PluginOptionValues } from '../../utils/plugins/pluginOptionsStorage.js';
/**
 * Build the onSave payload from collected string inputs.
 *
 * Sensitive fields are never prepopulated in the text buffer (security), so
 * by the time the user reaches the last field every sensitive field they
 * stepped through contains '' in collected. To avoid silently wiping saved
 * secrets on reconfigure: if a sensitive field is '' AND initialValues has
 * a value for it, OMIT the key entirely. savePluginOptions only writes keys
 * it receives, so omitting = keep existing.
 *
 * Exported for unit testing.
 */
export declare function buildFinalValues(fields: string[], collected: Record<string, string>, configSchema: PluginOptionSchema, initialValues: PluginOptionValues | undefined): PluginOptionValues;
export declare function PluginOptionsDialog(t0: any): any;
//# sourceMappingURL=PluginOptionsDialog.d.ts.map