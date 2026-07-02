import type { PermissionUpdate } from '../../../utils/permissions/PermissionUpdateSchema.js';
import type { OptionWithDescription } from '../../CustomSelect/select.js';
export type PowerShellToolUseOption = 'yes' | 'yes-apply-suggestions' | 'yes-prefix-edited' | 'no';
export declare function powershellToolUseOptions({ suggestions, onRejectFeedbackChange, onAcceptFeedbackChange, yesInputMode, noInputMode, editablePrefix, onEditablePrefixChange }: {
    suggestions?: PermissionUpdate[];
    onRejectFeedbackChange: (value: string) => void;
    onAcceptFeedbackChange: (value: string) => void;
    yesInputMode?: boolean;
    noInputMode?: boolean;
    editablePrefix?: string;
    onEditablePrefixChange?: (value: string) => void;
}): OptionWithDescription<PowerShellToolUseOption>[];
//# sourceMappingURL=powershellToolUseOptions.d.ts.map