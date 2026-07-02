import { type SettingSource } from '../settings/constants.js';
import { type EnvironmentResource } from './environments.js';
export type EnvironmentSelectionInfo = {
    availableEnvironments: EnvironmentResource[];
    selectedEnvironment: EnvironmentResource | null;
    selectedEnvironmentSource: SettingSource | null;
};
/**
 * Gets information about available environments and the currently selected one.
 *
 * @returns Promise<EnvironmentSelectionInfo> containing:
 *   - availableEnvironments: all environments from the API
 *   - selectedEnvironment: the environment that would be used (based on settings or first available),
 *     or null if no environments are available
 *   - selectedEnvironmentSource: the SettingSource where defaultEnvironmentId is configured,
 *     or null if using the default (first environment)
 */
export declare function getEnvironmentSelectionInfo(): Promise<EnvironmentSelectionInfo>;
//# sourceMappingURL=environmentSelection.d.ts.map