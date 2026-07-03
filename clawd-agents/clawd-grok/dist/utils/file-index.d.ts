export declare class FileIndex {
    private files;
    private cwd;
    private baseDir;
    private lastRefresh;
    constructor(cwd: string);
    refresh(): Promise<void>;
    updateCwd(cwd: string): void;
    private ensureFresh;
    match(query: string, maxResults?: number): Promise<string[]>;
    get size(): number;
    resolvePath(filePath: string): string;
}
