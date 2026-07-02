import type { OutputStyle } from '../utils/config.js';
export type OutputStylePickerProps = {
    initialStyle: OutputStyle;
    onComplete: (style: OutputStyle) => void;
    onCancel: () => void;
    isStandaloneCommand?: boolean;
};
export declare function OutputStylePicker(t0: any): any;
//# sourceMappingURL=OutputStylePicker.d.ts.map