export type VerificationStatus = 'loading' | 'valid' | 'invalid' | 'missing' | 'error';
export type ApiKeyVerificationResult = {
    status: VerificationStatus;
    reverify: () => Promise<void>;
    error: Error | null;
};
export declare function useApiKeyVerification(): ApiKeyVerificationResult;
//# sourceMappingURL=useApiKeyVerification.d.ts.map