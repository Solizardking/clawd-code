export class UserStore {
    users = new Map();
    /**
     * Called when a session is created for a user.
     * Creates the user record if it doesn't exist yet; increments sessionCount.
     */
    touch(userId, meta) {
        const existing = this.users.get(userId);
        if (existing) {
            existing.lastSeenAt = Date.now();
            existing.sessionCount += 1;
            if (meta?.email && !existing.email)
                existing.email = meta.email;
            if (meta?.name && !existing.name)
                existing.name = meta.name;
        }
        else {
            this.users.set(userId, {
                id: userId,
                email: meta?.email,
                name: meta?.name,
                firstSeenAt: Date.now(),
                lastSeenAt: Date.now(),
                sessionCount: 1,
            });
        }
    }
    /**
     * Called when a session is destroyed for a user.
     * Decrements sessionCount; removes the record when it reaches zero.
     */
    release(userId) {
        const record = this.users.get(userId);
        if (!record)
            return;
        record.sessionCount = Math.max(0, record.sessionCount - 1);
        if (record.sessionCount === 0) {
            this.users.delete(userId);
        }
    }
    /** Returns all currently connected users (sessionCount > 0). */
    list() {
        return [...this.users.values()];
    }
    get(userId) {
        return this.users.get(userId);
    }
}
//# sourceMappingURL=user-store.js.map