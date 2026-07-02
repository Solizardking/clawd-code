import * as React from 'react';
interface Props {
    children: React.ReactNode;
}
interface State {
    hasError: boolean;
}
export declare class SentryErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props);
    static getDerivedStateFromError(): State;
    render(): React.ReactNode;
}
export {};
//# sourceMappingURL=SentryErrorBoundary.d.ts.map