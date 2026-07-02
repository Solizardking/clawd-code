/**
 * UserStore — tracks which users are connected and how many sessions each has.
 *
 * This is a lightweight in-memory view derived from the SessionManager; it
 * does not persist across restarts. The admin dashboard and admin API read
 * from this store to enumerate users and their activity.
 */
export interface UserRecord {
    id: string;
    email?: string;
    name?: string;
    firstSeenAt: number;
    lastSeenAt: number;
    sessionCount: number;
}
export declare class UserStore {
    private readonly users;
    /**
     * Called when a session is created for a user.
     * Creates the user record if it doesn't exist yet; increments sessionCount.
     */
    touch(userId: string, meta?: {
        email?: string;
        name?: string;
    }): void;
    /**
     * Called when a session is destroyed for a user.
     * Decrements sessionCount; removes the record when it reaches zero.
     */
    release(userId: string): void;
    /** Returns all currently connected users (sessionCount > 0). */
    list(): UserRecord[];
    get(userId: string): UserRecord | undefined;
}
//# sourceMappingURL=user-store.d.ts.map