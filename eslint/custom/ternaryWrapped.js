/*jslint*/
/*global*/

export default Object.freeze({
    create(context) {
        const source = context.sourceCode;

        return {
            ConditionalExpression(node) {
                const first = source.getFirstToken(node);
                const before = source.getTokenBefore(first);

                const last = source.getLastToken(node);
                const after = source.getTokenAfter(last);

                // 1. Check parentheses
                const isWrapped = (
                    before && before.value === "(" &&
                    after && after.value === ")"
                );

                if (!isWrapped) {
                    context.report({
                        message: "Ternary must be wrapped in parentheses. ",
                        node
                    });
                    return;
                }

                // 2. Base indentation (line of the '(')
                const openParenLine = before.loc.start.line;
                const openParenText = source.lines[openParenLine - 1];
                const baseIndent = openParenText.match(/^\s*/)[0].length;

                // Helper to check indentation
                function checkTernaryPart(partNode, label) {
                    const line = partNode.loc.start.line;
                    const text = source.lines[line - 1];
                    const indent = text.match(/^\s*/)[0].length;

                    const expected = baseIndent + 4;

                    if (line === openParenLine) {
                        context.report({
                            message: `Expected ${label} of ternary to be in a new line.`, //jslint-ignore-line
                            node: partNode
                        });
                        return;
                    }

                    if (indent !== expected) {
                        context.report({
                            message: `${label} of ternary must be indented ${expected} spaces (found ${indent}).`, //jslint-ignore-line
                            node: partNode
                        });
                    }
                }

                // 3. Check indentation of all three parts
                checkTernaryPart(node.test, "Condition");
                checkTernaryPart(node.consequent, "Consequent");
                checkTernaryPart(node.alternate, "Alternate");
            }
        };
    },

    meta: {
        docs: {
            description: "Enforce JSLint-style multiline ternary formatting and indentation", //jslint-ignore-line
            recommended: false
        },
        schema: [],
        type: "layout"
    }
});
