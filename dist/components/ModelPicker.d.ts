import { type EffortLevel } from '../utils/effort.js';
import { type ModelSetting } from '../utils/model/model.js';
export type Props = {
    initial: string | null;
    sessionModel?: ModelSetting;
    onSelect: (model: string | null, effort: EffortLevel | undefined) => void;
    onCancel?: () => void;
    isStandaloneCommand?: boolean;
    showFastModeNotice?: boolean;
    /** Overrides the dim header line below "Select model". */
    headerText?: string;
    /**
     * When true, skip writing effortLevel to userSettings on selection.
     * Used by the assistant installer wizard where the model choice is
     * project-scoped (written to the assistant's .claude/settings.json via
     * install.ts) and should not leak to the user's global ~/.claude/settings.
     */
    skipSettingsWrite?: boolean;
};
export declare function ModelPicker(t0: any): any;
//# sourceMappingURL=ModelPicker.d.ts.map