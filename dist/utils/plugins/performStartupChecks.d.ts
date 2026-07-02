import type { AppState } from '../../state/AppState.js';
type SetAppState = (f: (prevState: AppState) => AppState) => void;
/**
 * Perform plugin startup checks and initiate background installations
 *
 * This function starts background installation of marketplaces and plugins
 * from trusted sources (repository and user settings) without blocking startup.
 * Installation progress and errors are tracked in AppState and shown via notifications.
 *
 * SECURITY: This function is only called from REPL.tsx after the "trust this folder"
 * dialog has been confirmed. The trust dialog in cli.tsx blocks all execution until
 * the user explicitly trusts the current working directory, ensuring that plugin
 * installations only happen with user consent. This prevents malicious repositories
 * from automatically installing plugins without user approval.
 *
 * @param setAppState Function to update app state with installation progress
 */
export declare function performStartupChecks(setAppState: SetAppState): Promise<void>;
export {};
//# sourceMappingURL=performStartupChecks.d.ts.map