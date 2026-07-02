import * as React from 'react';
type Props = {
    pluginName: string;
    pluginDescription?: string;
    marketplaceName: string;
    sourceCommand: string;
    onResponse: (response: 'yes' | 'no' | 'disable') => void;
};
export declare function PluginHintMenu({ pluginName, pluginDescription, marketplaceName, sourceCommand, onResponse }: Props): React.ReactNode;
export {};
//# sourceMappingURL=PluginHintMenu.d.ts.map