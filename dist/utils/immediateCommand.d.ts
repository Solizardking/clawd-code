/**
 * Whether inference-config commands (/model, /fast, /effort) should execute
 * immediately (during a running query) rather than waiting for the current
 * turn to finish.
 *
 * Always enabled for ants; gated by experiment for external users.
 */
export declare function shouldInferenceConfigCommandBeImmediate(): boolean;
//# sourceMappingURL=immediateCommand.d.ts.map