import React from 'react';
type ExportDialogProps = {
    content: string;
    defaultFilename: string;
    onDone: (result: {
        success: boolean;
        message: string;
    }) => void;
};
export declare function ExportDialog({ content, defaultFilename, onDone }: ExportDialogProps): React.ReactNode;
export {};
//# sourceMappingURL=ExportDialog.d.ts.map