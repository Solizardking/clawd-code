import type { PermissionDecisionReason } from '../../../utils/permissions/PermissionResult.js';
import type { PermissionUpdate } from '../../../utils/permissions/PermissionUpdateSchema.js';
import type { OptionWithDescription } from '../../CustomSelect/select.js';
export type BashToolUseOption = 'yes' | 'yes-apply-suggestions' | 'yes-prefix-edited' | 'yes-classifier-reviewed' | 'no';
export declare function bashToolUseOptions({ suggestions, decisionReason, onRejectFeedbackChange, onAcceptFeedbackChange, onClassifierDescriptionChange, classifierDescription, initialClassifierDescriptionEmpty, existingAllowDescriptions, yesInputMode, noInputMode, editablePrefix, onEditablePrefixChange }: {
    suggestions?: PermissionUpdate[];
    decisionReason?: PermissionDecisionReason;
    onRejectFeedbackChange: (value: string) => void;
    onAcceptFeedbackChange: (value: string) => void;
    onClassifierDescriptionChange?: (value: string) => void;
    classifierDescription?: string;
    /** Whether the initial classifier description was empty. When true, hides the option. */
    initialClassifierDescriptionEmpty?: boolean;
    existingAllowDescriptions?: string[];
    yesInputMode?: boolean;
    noInputMode?: boolean;
    /** Editable prefix rule content (e.g., "npm run:*"). When set, replaces Haiku-based suggestions. */
    editablePrefix?: string;
    /** Callback when the user edits the prefix value. */
    onEditablePrefixChange?: (value: string) => void;
}): OptionWithDescription<BashToolUseOption>[];
//# sourceMappingURL=bashToolUseOptions.d.ts.map