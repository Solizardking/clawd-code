import { asSchema } from "@ai-sdk/provider-utils";
export async function toolSetToBatchTools(tools) {
    const entries = Object.entries(tools);
    if (entries.length === 0) {
        return [];
    }
    const batchTools = [];
    for (const [name, tool] of entries) {
        if (tool.type === "provider") {
            throw new Error(`Batch mode does not support provider-defined tool "${name}".`);
        }
        batchTools.push({
            type: "function",
            function: {
                name,
                description: tool.description,
                parameters: await asSchema(tool.inputSchema).jsonSchema,
                ...(tool.strict != null ? { strict: tool.strict } : {}),
            },
        });
    }
    return batchTools;
}
//# sourceMappingURL=tool-schemas.js.map