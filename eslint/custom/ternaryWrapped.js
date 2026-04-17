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

                // context.report({
                //     message: `\n openParenLine: ${openParenLine} \n openParenText: ${openParenText} \n baseIndent: ${baseIndent}`,
                //     node
                // });

                // Helper to check indentation
                function checkIndent(partNode, label) {
                    const line = partNode.loc.start.line;
                    const text = source.lines[line - 1];
                    const indent = text.match(/^\s*/)[0].length;

                    const expected = baseIndent + 4;

                    // context.report({
                    //     message: `\n line: ${line} \n text: ${text} \n indent: ${indent}`,
                    //     node: partNode
                    // });

                    if (indent !== expected) {
                        context.report({
                            message: `${label} of ternary must be indented ${expected} spaces (found ${indent}).`, //jslint-ignore-line
                            node: partNode
                        });
                    }
                }

                // 3. Check indentation of all three parts
                checkIndent(node.test, "Condition");
                checkIndent(node.consequent, "Consequent");
                checkIndent(node.alternate, "Alternate");
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
