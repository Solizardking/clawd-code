export declare function Tabs(t0: any): any;
export declare function Tab(t0: any): any;
export declare function useTabsWidth(): any;
/**
 * Opt into header-focus gating. Returns the current header focus state and a
 * callback to hand focus back to the tab row. For a Select, pass
 * `isDisabled={headerFocused}` and `onUpFromFirstItem={focusHeader}`; keep the
 * parent Tabs' initialHeaderFocused at its default so tab/←/→ work on mount.
 *
 * Calling this hook registers a ↓-blurs-header opt-in on mount. Don't call it
 * above an early return that renders static text — ↓ will blur the header with
 * no onUpFromFirstItem to recover. Split the component so the hook only runs
 * when the Select renders.
 */
export declare function useTabHeaderFocus(): any;
//# sourceMappingURL=Tabs.d.ts.map