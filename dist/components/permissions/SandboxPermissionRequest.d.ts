import { type NetworkHostPattern } from 'src/utils/sandbox/sandbox-adapter.js';
export type SandboxPermissionRequestProps = {
    hostPattern: NetworkHostPattern;
    onUserResponse: (response: {
        allow: boolean;
        persistToSettings: boolean;
    }) => void;
};
export declare function SandboxPermissionRequest(t0: any): any;
//# sourceMappingURL=SandboxPermissionRequest.d.ts.map