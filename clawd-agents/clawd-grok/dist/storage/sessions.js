import { randomUUID } from "crypto";
import { getDatabase } from "./db";
import { ensureWorkspace } from "./workspaces";
export class SessionStore {
    workspace;
    constructor(cwd) {
        this.workspace = ensureWorkspace(cwd);
    }
    getWorkspace() {
        return this.workspace;
    }
    openSession(selector, model, mode, cwd) {
        if (!selector) {
            return this.createSession(model, mode, cwd);
        }
        if (selector === "latest") {
            const latest = this.getLatestSession();
            return latest ?? this.createSession(model, mode, cwd);
        }
        const session = this.getSessionById(selector);
        if (!session) {
            throw new Error(`Session "${selector}" was not found.`);
        }
        this.touchSession(session.id, cwd);
        return this.getRequiredSession(session.id);
    }
    createSession(model, mode, cwd) {
        const now = new Date().toISOString();
        const id = createSessionId();
        const db = getDatabase();
        db.prepare(`
      INSERT INTO sessions (
        id, workspace_id, title, recap_text, recap_model, recap_updated_at, model, mode, cwd_at_start, cwd_last, status, created_at, updated_at
      ) VALUES (
        @id, @workspace_id, NULL, NULL, NULL, NULL, @model, @mode, @cwd_at_start, @cwd_last, 'active', @created_at, @updated_at
      )
    `).run({
            id,
            workspace_id: this.workspace.id,
            model,
            mode,
            cwd_at_start: cwd,
            cwd_last: cwd,
            created_at: now,
            updated_at: now,
        });
        return this.getRequiredSession(id);
    }
    getLatestSession() {
        const row = getDatabase()
            .prepare(`
      SELECT id, workspace_id, title, recap_text, recap_model, recap_updated_at, model, mode, cwd_at_start, cwd_last, status, created_at, updated_at
      FROM sessions
      WHERE workspace_id = ?
      ORDER BY updated_at DESC
      LIMIT 1
    `)
            .get(this.workspace.id);
        return row ? toSessionInfo(row) : null;
    }
    getSessionById(id) {
        const row = getDatabase()
            .prepare(`
      SELECT id, workspace_id, title, recap_text, recap_model, recap_updated_at, model, mode, cwd_at_start, cwd_last, status, created_at, updated_at
      FROM sessions
      WHERE id = ?
    `)
            .get(id);
        return row ? toSessionInfo(row) : null;
    }
    getRequiredSession(id) {
        const session = this.getSessionById(id);
        if (!session) {
            throw new Error(`Session "${id}" was not found.`);
        }
        return session;
    }
    setTitle(id, title) {
        const now = new Date().toISOString();
        getDatabase()
            .prepare(`
      UPDATE sessions
      SET title = ?, updated_at = ?
      WHERE id = ?
    `)
            .run(title, now, id);
    }
    setRecap(id, recap) {
        const now = new Date().toISOString();
        getDatabase()
            .prepare(`
      UPDATE sessions
      SET recap_text = ?, recap_model = ?, recap_updated_at = ?, updated_at = ?
      WHERE id = ?
    `)
            .run(recap?.text ?? null, recap?.model ?? null, recap?.updatedAt?.toISOString() ?? null, now, id);
    }
    setModel(id, model) {
        const now = new Date().toISOString();
        getDatabase()
            .prepare(`
      UPDATE sessions
      SET model = ?, updated_at = ?
      WHERE id = ?
    `)
            .run(model, now, id);
    }
    setMode(id, mode) {
        const now = new Date().toISOString();
        getDatabase()
            .prepare(`
      UPDATE sessions
      SET mode = ?, updated_at = ?
      WHERE id = ?
    `)
            .run(mode, now, id);
    }
    touchSession(id, cwd) {
        getDatabase()
            .prepare(`
      UPDATE sessions
      SET cwd_last = ?, updated_at = ?
      WHERE id = ?
    `)
            .run(cwd, new Date().toISOString(), id);
    }
}
function createSessionId() {
    return randomUUID().replace(/-/g, "").slice(0, 12);
}
function toSessionInfo(row) {
    return {
        id: row.id,
        workspaceId: row.workspace_id,
        title: row.title,
        recap: toSessionRecap(row),
        model: row.model,
        mode: row.mode,
        cwdAtStart: row.cwd_at_start,
        cwdLast: row.cwd_last,
        status: row.status,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
    };
}
function toSessionRecap(row) {
    if (!row.recap_text) {
        return null;
    }
    return {
        text: row.recap_text,
        model: row.recap_model,
        updatedAt: row.recap_updated_at ? new Date(row.recap_updated_at) : null,
    };
}
//# sourceMappingURL=sessions.js.map