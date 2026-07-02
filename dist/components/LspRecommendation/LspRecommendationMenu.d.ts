import * as React from 'react';
type Props = {
    pluginName: string;
    pluginDescription?: string;
    fileExtension: string;
    onResponse: (response: 'yes' | 'no' | 'never' | 'disable') => void;
};
export declare function LspRecommendationMenu({ pluginName, pluginDescription, fileExtension, onResponse }: Props): React.ReactNode;
export {};
//# sourceMappingURL=LspRecommendationMenu.d.ts.map