import type { StructuredPatchHunk } from 'diff';
import * as React from 'react';
type Props = {
    hunks: StructuredPatchHunk[];
    dim: boolean;
    width: number;
    filePath: string;
    firstLine: string | null;
    fileContent?: string;
};
/** Renders a list of diff hunks with ellipsis separators between them. */
export declare function StructuredDiffList({ hunks, dim, width, filePath, firstLine, fileContent }: Props): React.ReactNode;
export {};
//# sourceMappingURL=StructuredDiffList.d.ts.map