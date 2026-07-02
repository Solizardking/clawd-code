import type { PermissionBehavior, PermissionRuleValue } from '../../../utils/permissions/PermissionRule.js';
export type PermissionRuleInputProps = {
    onCancel: () => void;
    onSubmit: (ruleValue: PermissionRuleValue, ruleBehavior: PermissionBehavior) => void;
    ruleBehavior: PermissionBehavior;
};
export declare function PermissionRuleInput(t0: any): any;
//# sourceMappingURL=PermissionRuleInput.d.ts.map