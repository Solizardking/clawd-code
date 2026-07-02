import * as React from 'react';
import type { HistoryEntry } from '../utils/config.js';
type Props = {
    initialQuery?: string;
    onSelect: (entry: HistoryEntry) => void;
    onCancel: () => void;
};
export declare function HistorySearchDialog({ initialQuery, onSelect, onCancel }: Props): React.ReactNode;
export {};
//# sourceMappingURL=HistorySearchDialog.d.ts.map