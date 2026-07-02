export declare function getTrustedDeviceToken(): string | undefined;
export declare function clearTrustedDeviceTokenCache(): void;
/**
 * Clear the stored trusted device token from secure storage and the memo cache.
 * Called before enrollTrustedDevice() during /login so a stale token from the
 * previous account isn't sent as X-Trusted-Device-Token while enrollment is
 * in-flight (enrollTrustedDevice is async — bridge API calls between login and
 * enrollment completion would otherwise still read the old cached token).
 */
export declare function clearTrustedDeviceToken(): void;
/**
 * Enroll this device via POST /auth/trusted_devices and persist the token
 * to keychain. Best-effort — logs and returns on failure so callers
 * (post-login hooks) don't block the login flow.
 *
 * The server gates enrollment on account_session.created_at < 10min, so
 * this must be called immediately after a fresh /login. Calling it later
 * (e.g. lazy enrollment on /bridge 403) will fail with 403 stale_session.
 */
export declare function enrollTrustedDevice(): Promise<void>;
//# sourceMappingURL=trustedDevice.d.ts.map