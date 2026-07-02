import type { DiagLogger } from '@opentelemetry/api';
export declare class ClaudeCodeDiagLogger implements DiagLogger {
    error(message: string, ..._: unknown[]): void;
    warn(message: string, ..._: unknown[]): void;
    info(_message: string, ..._args: unknown[]): void;
    debug(_message: string, ..._args: unknown[]): void;
    verbose(_message: string, ..._args: unknown[]): void;
}
//# sourceMappingURL=logger.d.ts.map