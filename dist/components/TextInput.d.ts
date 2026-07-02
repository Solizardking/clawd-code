import React from 'react';
import type { BaseTextInputProps } from '../types/textInputTypes.js';
import type { TextHighlight } from '../utils/textHighlighting.js';
export type Props = BaseTextInputProps & {
    highlights?: TextHighlight[];
};
export default function TextInput(props: Props): React.ReactNode;
//# sourceMappingURL=TextInput.d.ts.map