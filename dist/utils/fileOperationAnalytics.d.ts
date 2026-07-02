/**
 * Logs file operation analytics to Statsig
 */
export declare function logFileOperation(params: {
    operation: 'read' | 'write' | 'edit';
    tool: 'FileReadTool' | 'FileWriteTool' | 'FileEditTool';
    filePath: string;
    content?: string;
    type?: 'create' | 'update';
}): void;
//# sourceMappingURL=fileOperationAnalytics.d.ts.map