import { describe, expect, it } from "vitest";
import { applyMigrations } from "./migrations";
describe("applyMigrations", () => {
    it("repairs missing recap columns when the database version is already current", () => {
        const db = new FakeDatabase(3, ["id", "workspace_id", "title", "model"]);
        applyMigrations(db);
        expect(db.sessionColumns).toEqual(new Set(["id", "workspace_id", "title", "model", "recap_text", "recap_model", "recap_updated_at"]));
    });
});
class FakeDatabase {
    version;
    sessionColumns;
    constructor(version, sessionColumns) {
        this.version = version;
        this.sessionColumns = new Set(sessionColumns);
    }
    exec(sql) {
        const match = sql.match(/ALTER TABLE sessions ADD COLUMN ([a-z_]+) /);
        if (match?.[1]) {
            this.sessionColumns.add(match[1]);
        }
    }
    prepare(sql) {
        if (sql === "PRAGMA table_info(sessions)") {
            return new FakeStatement(() => [...this.sessionColumns].map((name) => ({ name })));
        }
        throw new Error(`Unexpected SQL: ${sql}`);
    }
    pragma(query, options) {
        if (query === "user_version" && options?.simple) {
            return this.version;
        }
        const match = query.match(/^user_version = (\d+)$/);
        if (match?.[1]) {
            this.version = Number(match[1]);
            return undefined;
        }
        throw new Error(`Unexpected pragma: ${query}`);
    }
    transaction(fn) {
        return fn;
    }
    close() { }
}
class FakeStatement {
    allFn;
    constructor(allFn) {
        this.allFn = allFn;
    }
    run() {
        throw new Error("Unexpected run");
    }
    get() {
        throw new Error("Unexpected get");
    }
    all() {
        return this.allFn();
    }
}
//# sourceMappingURL=migrations.test.js.map