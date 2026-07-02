import * as React from 'react';
import type { LoadedPlugin } from '../../types/plugin.js';
import type { ViewState as ParentViewState } from './types.js';
type Props = {
    setViewState: (state: ParentViewState) => void;
    setResult: (result: string | null) => void;
    onManageComplete?: () => void | Promise<void>;
    onSearchModeChange?: (isActive: boolean) => void;
    targetPlugin?: string;
    targetMarketplace?: string;
    action?: 'enable' | 'disable' | 'uninstall';
};
/**
 * Filter out plugins that are force-disabled by org policy (policySettings).
 * These are blocked by the organization and cannot be re-enabled by the user.
 * Checks policySettings directly rather than installation scope, since managed
 * settings don't create installation records with scope 'managed'.
 */
export declare function filterManagedDisabledPlugins(plugins: LoadedPlugin[]): LoadedPlugin[];
export declare function ManagePlugins({ setViewState: setParentViewState, setResult, onManageComplete, onSearchModeChange, targetPlugin, targetMarketplace, action }: Props): React.ReactNode;
export {};
//# sourceMappingURL=ManagePlugins.d.ts.map