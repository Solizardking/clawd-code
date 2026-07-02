/**
 * Shows a one-shot notification when the shift-tab carousel wraps past where
 * auto mode would have been. Covers all reasons (settings, circuit-breaker,
 * org-allowlist). The startup case (defaultMode: auto silently downgraded) is
 * handled by verifyAutoModeGateAccess → checkAndDisableAutoModeIfNeeded.
 */
export declare function useAutoModeUnavailableNotification(): void;
//# sourceMappingURL=useAutoModeUnavailableNotification.d.ts.map