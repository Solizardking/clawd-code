import type { OutputStyle } from '../utils/config.js';
import type { SettingSource } from '../utils/settings/constants.js';
export type OutputStyleConfig = {
    name: string;
    description: string;
    prompt: string;
    source: SettingSource | 'built-in' | 'plugin';
    keepCodingInstructions?: boolean;
    /**
     * If true, this output style will be automatically applied when the plugin is enabled.
     * Only applicable to plugin output styles.
     * When multiple plugins have forced output styles, only one is chosen (logged via debug).
     */
    forceForPlugin?: boolean;
};
export type OutputStyles = {
    readonly [K in OutputStyle]: OutputStyleConfig | null;
};
export declare const DEFAULT_OUTPUT_STYLE_NAME = "default";
export declare const OUTPUT_STYLE_CONFIG: OutputStyles;
export declare const getAllOutputStyles: any;
export declare function clearAllOutputStylesCache(): void;
export declare function getOutputStyleConfig(): Promise<OutputStyleConfig | null>;
export declare function hasCustomOutputStyle(): boolean;
//# sourceMappingURL=outputStyles.d.ts.map