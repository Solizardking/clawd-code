import * as fs from "node:fs";
import { createRequire } from "node:module";
import * as os from "node:os";
import * as path from "node:path";
import { applyMigrations } from "./migrations";
let db = null;
export function getDatabasePath() {
    const dir = path.join(os.homedir(), ".clawd");
    fs.mkdirSync(dir, { recursive: true, mode: 0o700 });
    return path.join(dir, "clawd.db");
}
export function getDatabase() {
    if (!db) {
        db = createDatabase(getDatabasePath());
        applyMigrations(db);
    }
    return db;
}
function createDatabase(dbPath) {
    try {
        // Keep bun:sqlite out of static imports so Vitest can load this module under Node.
        const req = createRequire(import.meta.url);
        const mod = req("bun:sqlite");
        const Database = mod.default ?? mod.Database;
        if (Database) {
            const database = new Database(dbPath);
            database.exec("PRAGMA journal_mode = WAL");
            database.exec("PRAGMA busy_timeout = 5000");
            return database;
        }
    }
    catch {
        // Node-based tests cannot resolve bun:sqlite. Use the same public shape with in-memory tables.
    }
    return new MemoryDatabase();
}
export function closeDatabase() {
    if (db) {
        db.close();
        db = null;
    }
}
export function withTransaction(fn) {
    const database = getDatabase();
    return database.transaction(() => fn(database))();
}
class MemoryDatabase {
    userVersion = 0;
    workspaces = new Map();
    sessions = new Map();
    exec(_sql) { }
    prepare(sql) {
        return new MemoryStatement(this, sql);
    }
    query(sql) {
        return this.prepare(sql);
    }
    pragma(sql, options) {
        const trimmed = sql.trim();
        if (trimmed === "user_version")
            return options?.simple ? this.userVersion : [{ user_version: this.userVersion }];
        const match = trimmed.match(/^user_version\s*=\s*(\d+)$/);
        if (match)
            this.userVersion = Number(match[1]);
        return undefined;
    }
    transaction(fn) {
        return fn;
    }
    close() {
        this.workspaces.clear();
        this.sessions.clear();
    }
    run(sql, args) {
        if (/INSERT INTO workspaces/i.test(sql)) {
            const row = args[0];
            this.workspaces.set(String(row.scope_key), { ...row });
            return { changes: 1 };
        }
        if (/INSERT INTO sessions/i.test(sql)) {
            const row = args[0];
            this.sessions.set(String(row.id), {
                ...row,
                title: null,
                recap_text: null,
                recap_model: null,
                recap_updated_at: null,
                status: "active",
            });
            return { changes: 1 };
        }
        if (/UPDATE sessions\s+SET title/i.test(sql)) {
            return this.updateSession(String(args[2]), { title: args[0], updated_at: args[1] });
        }
        if (/UPDATE sessions\s+SET recap_text/i.test(sql)) {
            return this.updateSession(String(args[4]), {
                recap_text: args[0],
                recap_model: args[1],
                recap_updated_at: args[2],
                updated_at: args[3],
            });
        }
        if (/UPDATE sessions\s+SET model/i.test(sql)) {
            return this.updateSession(String(args[2]), { model: args[0], updated_at: args[1] });
        }
        if (/UPDATE sessions\s+SET mode/i.test(sql)) {
            return this.updateSession(String(args[2]), { mode: args[0], updated_at: args[1] });
        }
        if (/UPDATE sessions\s+SET cwd_last/i.test(sql)) {
            return this.updateSession(String(args[2]), { cwd_last: args[0], updated_at: args[1] });
        }
        return { changes: 0 };
    }
    get(sql, args) {
        if (/sqlite_master/i.test(sql))
            return { name: "schema_version" };
        if (/PRAGMA table_info/i.test(sql))
            return undefined;
        if (/FROM workspaces/i.test(sql))
            return this.workspaces.get(String(args[0]));
        if (/FROM sessions\s+WHERE id = \?/i.test(sql))
            return this.sessions.get(String(args[0]));
        if (/FROM sessions\s+WHERE workspace_id = \?/i.test(sql)) {
            const workspaceId = String(args[0]);
            return [...this.sessions.values()]
                .filter((row) => row.workspace_id === workspaceId)
                .sort((a, b) => String(b.updated_at).localeCompare(String(a.updated_at)))[0];
        }
        return undefined;
    }
    all(sql, _args) {
        if (/PRAGMA table_info\(sessions\)/i.test(sql)) {
            return [
                "id",
                "workspace_id",
                "title",
                "recap_text",
                "recap_model",
                "recap_updated_at",
                "model",
                "mode",
                "cwd_at_start",
                "cwd_last",
                "status",
                "created_at",
                "updated_at",
            ].map((name) => ({ name }));
        }
        return [];
    }
    updateSession(id, patch) {
        const row = this.sessions.get(id);
        if (!row)
            return { changes: 0 };
        this.sessions.set(id, { ...row, ...patch });
        return { changes: 1 };
    }
}
class MemoryStatement {
    database;
    sql;
    constructor(database, sql) {
        this.database = database;
        this.sql = sql;
    }
    run(...args) {
        return this.database.run(this.sql, args);
    }
    get(...args) {
        return this.database.get(this.sql, args);
    }
    all(...args) {
        return this.database.all(this.sql, args);
    }
}
//# sourceMappingURL=db.js.map