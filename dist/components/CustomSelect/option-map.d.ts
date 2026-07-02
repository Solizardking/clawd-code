import type { ReactNode } from 'react';
import type { OptionWithDescription } from './select.js';
type OptionMapItem<T> = {
    label: ReactNode;
    value: T;
    description?: string;
    previous: OptionMapItem<T> | undefined;
    next: OptionMapItem<T> | undefined;
    index: number;
};
export default class OptionMap<T> extends Map<T, OptionMapItem<T>> {
    readonly first: OptionMapItem<T> | undefined;
    readonly last: OptionMapItem<T> | undefined;
    constructor(options: OptionWithDescription<T>[]);
}
export {};
//# sourceMappingURL=option-map.d.ts.map