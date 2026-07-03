import type { StoredSchedule } from "../tools/schedule";
import type { Theme } from "./theme";
export type ScheduleBrowseRow = {
    kind: "schedule";
    schedule: StoredSchedule;
};
export declare function buildScheduleBrowseRows(schedules: StoredSchedule[], query: string): ScheduleBrowseRow[];
export declare function ScheduleBrowserModal({ t, width, height, selectedIndex, searchQuery, rows, }: {
    t: Theme;
    width: number;
    height: number;
    selectedIndex: number;
    searchQuery: string;
    rows: ScheduleBrowseRow[];
}): any;
