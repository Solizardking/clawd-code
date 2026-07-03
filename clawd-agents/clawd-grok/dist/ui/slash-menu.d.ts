export interface SlashMenuItem {
    id: string;
    label: string;
    description: string;
    aliases?: string[];
}
export declare const SLASH_MENU_ITEMS: SlashMenuItem[];
export declare function filterSlashMenuItems(items: SlashMenuItem[], query: string): SlashMenuItem[];
