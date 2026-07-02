type M = any;
export declare function useMoreRight(_args: {
    enabled: boolean;
    setMessages: (action: M[] | ((prev: M[]) => M[])) => void;
    inputValue: string;
    setInputValue: (s: string) => void;
    setToolJSX: (args: M) => void;
}): {
    onBeforeQuery: (input: string, all: M[], n: number) => Promise<boolean>;
    onTurnComplete: (all: M[], aborted: boolean) => Promise<void>;
    render: () => null;
};
export {};
//# sourceMappingURL=useMoreRight.d.ts.map