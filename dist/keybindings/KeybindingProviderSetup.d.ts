/**
 * Setup utilities for integrating KeybindingProvider into the app.
 *
 * This file provides the bindings and a composed provider that can be
 * added to the app's component tree. It loads both default bindings and
 * user-defined bindings from ~/.claude/keybindings.json, with hot-reload
 * support when the file changes.
 */
import React from 'react';
type Props = {
    children: React.ReactNode;
};
export declare function KeybindingSetup({ children }: Props): React.ReactNode;
export {};
//# sourceMappingURL=KeybindingProviderSetup.d.ts.map