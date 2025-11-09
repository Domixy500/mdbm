export default {
    meta: {
        type: "suggestion",
        docs: {
            description: "Enforce a maximum number of exports per file",
            recommended: false
        },
        schema: [
            {
                type: "object",
                properties: {
                    max: { type: "number" }
                },
                additionalProperties: false
            }
        ],
        messages: {
            tooMany: "Too many exports ({{ count }}). Maximum allowed is {{ max }}."
        }
    },

    create(context) {
        const max = (context.options[0]?.max) || 1;
        let exportCount = 0;

        return {
            ExportNamedDeclaration(node) {
                exportCount++;
                if (exportCount > max) {
                    context.report({
                        node,
                        messageId: "tooMany",
                        data: { count: exportCount, max }
                    });
                }
            },
            ExportDefaultDeclaration(node) {
                exportCount++;
                if (exportCount > max) {
                    context.report({
                        node,
                        messageId: "tooMany",
                        data: { count: exportCount, max }
                    });
                }
            }
        };
    }
};
