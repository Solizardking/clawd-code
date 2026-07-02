import type { Theme, ThemeName } from './theme.js';
export type TreeNode = {
    [key: string]: TreeNode | string | undefined;
};
export type TreeifyOptions = {
    showValues?: boolean;
    hideFunctions?: boolean;
    useColors?: boolean;
    themeName?: ThemeName;
    treeCharColors?: {
        treeChar?: keyof Theme;
        key?: keyof Theme;
        value?: keyof Theme;
    };
};
/**
 * Custom treeify implementation with Ink theme color support
 * Based on https://github.com/notatestuser/treeify
 */
export declare function treeify(obj: TreeNode, options?: TreeifyOptions): string;
//# sourceMappingURL=treeify.d.ts.map