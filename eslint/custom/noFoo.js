/*jslint beta*/
/*global*/

export default {
    create(context) {
        return {
            Identifier(node) {
                if (node.name === "foo") {
                    context.report({
                        message: "Avoid using variable name 'foo'",
                        node
                    });
                }
            }
        };
    },
    meta: {
        docs: {
            description: "Disallow using variable name 'foo'",
            recommended: false
        },
        schema: [],
        type: "problem"
    }
};
