import type { PermissionOption } from '../components/permissions/FilePermissionDialog/permissionOptions.js';
import type { ToolUseContext } from '../Tool.js';
import type { FileEdit } from '../tools/FileEditTool/types.js';
type Props = {
    onChange(option: PermissionOption, input: {
        file_path: string;
        edits: FileEdit[];
    }): void;
    toolUseContext: ToolUseContext;
    filePath: string;
    edits: FileEdit[];
    editMode: 'single' | 'multiple';
};
export declare function useDiffInIDE({ onChange, toolUseContext, filePath, edits, editMode, }: Props): {
    closeTabInIDE: () => void;
    showingDiffInIDE: boolean;
    ideName: string;
    hasError: boolean;
};
/**
 * Re-computes the edits from the old and new contents. This is necessary
 * to apply any edits the user may have made to the new contents.
 */
export declare function computeEditsFromContents(filePath: string, oldContent: string, newContent: string, editMode: 'single' | 'multiple'): FileEdit[];
export {};
//# sourceMappingURL=useDiffInIDE.d.ts.map