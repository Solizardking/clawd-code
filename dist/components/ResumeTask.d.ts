import React from 'react';
import { type CodeSession } from 'src/utils/teleport/api.js';
type Props = {
    onSelect: (session: CodeSession) => void;
    onCancel: () => void;
    isEmbedded?: boolean;
};
export declare function ResumeTask({ onSelect, onCancel, isEmbedded }: Props): React.ReactNode;
export {};
//# sourceMappingURL=ResumeTask.d.ts.map