export type AdminRequestType = 'limit_increase' | 'seat_upgrade';
export type AdminRequestStatus = 'pending' | 'approved' | 'dismissed';
export type AdminRequestSeatUpgradeDetails = {
    message?: string | null;
    current_seat_tier?: string | null;
};
export type AdminRequestCreateParams = {
    request_type: 'limit_increase';
    details: null;
} | {
    request_type: 'seat_upgrade';
    details: AdminRequestSeatUpgradeDetails;
};
export type AdminRequest = {
    uuid: string;
    status: AdminRequestStatus;
    requester_uuid?: string | null;
    created_at: string;
} & ({
    request_type: 'limit_increase';
    details: null;
} | {
    request_type: 'seat_upgrade';
    details: AdminRequestSeatUpgradeDetails;
});
/**
 * Create an admin request (limit increase or seat upgrade).
 *
 * For Team/Enterprise users who don't have billing/admin permissions,
 * this creates a request that their admin can act on.
 *
 * If a pending request of the same type already exists for this user,
 * returns the existing request instead of creating a new one.
 */
export declare function createAdminRequest(params: AdminRequestCreateParams): Promise<AdminRequest>;
/**
 * Get pending admin request of a specific type for the current user.
 *
 * Returns the pending request if one exists, otherwise null.
 */
export declare function getMyAdminRequests(requestType: AdminRequestType, statuses: AdminRequestStatus[]): Promise<AdminRequest[] | null>;
type AdminRequestEligibilityResponse = {
    request_type: AdminRequestType;
    is_allowed: boolean;
};
/**
 * Check if a specific admin request type is allowed for this org.
 */
export declare function checkAdminRequestEligibility(requestType: AdminRequestType): Promise<AdminRequestEligibilityResponse | null>;
export {};
//# sourceMappingURL=adminRequests.d.ts.map