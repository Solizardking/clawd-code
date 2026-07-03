export interface SQLiteStatement {
    run(...args: unknown[]): unknown;
    get(...args: unknown[]): unknown;
    all(...args: unknown[]): unknown[];
}
export interface SQLiteDatabase {
    exec(sql: string): void;
    prepare(sql: string): SQLiteStatement;
    query?(sql: string): SQLiteStatement;
    pragma(sql: string, options?: {
        simple?: boolean;
    }): unknown;
    transaction<T>(fn: () => T): () => T;
    close(): void;
}
export declare function getDatabasePath(): string;
export declare function getDatabase(): SQLiteDatabase;
export declare function closeDatabase(): void;
export declare function withTransaction<T>(fn: (database: SQLiteDatabase) => T): T;
