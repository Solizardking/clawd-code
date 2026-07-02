import React from 'react';
import { type ChannelEntry } from './bootstrap/state.js';
import type { Command } from './commands.js';
import { type StatsStore } from './context/stats.js';
import type { RenderOptions, Root, TextProps } from './ink.js';
import { onChangeAppState } from './state/onChangeAppState.js';
import { type FpsMetrics } from './utils/fpsTracker.js';
import type { PermissionMode } from './utils/permissions/PermissionMode.js';
export declare function completeOnboarding(): void;
export declare function showDialog<T = void>(root: Root, renderer: (done: (result: T) => void) => React.ReactNode): Promise<T>;
/**
 * Render an error message through Ink, then unmount and exit.
 * Use this for fatal errors after the Ink root has been created —
 * console.error is swallowed by Ink's patchConsole, so we render
 * through the React tree instead.
 */
export declare function exitWithError(root: Root, message: string, beforeExit?: () => Promise<void>): Promise<never>;
/**
 * Render a message through Ink, then unmount and exit.
 * Use this for messages after the Ink root has been created —
 * console output is swallowed by Ink's patchConsole, so we render
 * through the React tree instead.
 */
export declare function exitWithMessage(root: Root, message: string, options?: {
    color?: TextProps['color'];
    exitCode?: number;
    beforeExit?: () => Promise<void>;
}): Promise<never>;
/**
 * Show a setup dialog wrapped in AppStateProvider + KeybindingSetup.
 * Reduces boilerplate in showSetupScreens() where every dialog needs these wrappers.
 */
export declare function showSetupDialog<T = void>(root: Root, renderer: (done: (result: T) => void) => React.ReactNode, options?: {
    onChangeAppState?: typeof onChangeAppState;
}): Promise<T>;
/**
 * Render the main UI into the root and wait for it to exit.
 * Handles the common epilogue: start deferred prefetches, wait for exit, graceful shutdown.
 */
export declare function renderAndRun(root: Root, element: React.ReactNode): Promise<void>;
export declare function showSetupScreens(root: Root, permissionMode: PermissionMode, allowDangerouslySkipPermissions: boolean, commands?: Command[], claudeInChrome?: boolean, devChannels?: ChannelEntry[]): Promise<boolean>;
export declare function getRenderContext(exitOnCtrlC: boolean): {
    renderOptions: RenderOptions;
    getFpsMetrics: () => FpsMetrics | undefined;
    stats: StatsStore;
};
//# sourceMappingURL=interactiveHelpers.d.ts.map