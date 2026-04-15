/*jslint*/
/*global*/

export default {
    create(context) {
        const source = context.sourceCode

        function getIndent(nodeOrToken) {
            const line = source.lines[nodeOrToken.loc.start.line - 1]
            const match = line.match(/^\s*/)
            return match ? match[0].length : 0
        }

        function hasWrappingParens(node) {
            const before = source.getTokenBefore(node)
            const after = source.getTokenAfter(node)
            return before && after && before.value === "(" && after.value === ")"
        }

        return {
            ConditionalExpression(node) {
                const test = node.test
                const consequent = node.consequent

                const questionToken = source.getTokenAfter(test, t => t.value === "?")
                const colonToken = source.getTokenAfter(consequent, t => t.value === ":")

                if (!questionToken || !colonToken) {
                    return
                }

                const before = source.getTokenBefore(node)
                const after = source.getTokenAfter(node)

                // 1. Must be wrapped in parentheses
                if (!hasWrappingParens(node)) {
                    context.report({
                        node,
                        message: "Wrap a ternary expression in parens, with a line break after the left paren."
                    })
                    return
                }

                // 2. Condition must start on a new line after '('
                if (test.loc.start.line === before.loc.start.line) {
                    context.report({
                        node,
                        message: "Wrap a ternary expression in parens, with a line break after the left paren."
                    })
                }

                // 3. '?' must be on a new line
                if (questionToken.loc.start.line === test.loc.start.line) {
                    context.report({
                        node,
                        message: "Place '?' on a new line after the condition."
                    })
                }

                // 4. ':' must be on a new line
                if (colonToken.loc.start.line === consequent.loc.start.line) {
                    context.report({
                        node,
                        message: "Place ':' on a new line after the consequent."
                    })
                }

                // 5. Closing paren must be on its own line
                if (after.loc.start.line === colonToken.loc.start.line) {
                    context.report({
                        node,
                        message: "Place the closing ')' on its own line."
                    })
                }

                // 6. Closing paren must align with parent statement
                const parentToken = source.getFirstToken(node.parent)
                const parentIndent = getIndent(parentToken)
                const closingIndent = getIndent(after)

                if (closingIndent !== parentIndent) {
                    context.report({
                        node,
                        message: "The closing ')' must align with the start of the containing statement."
                    })
                }

                // 7. Inner lines must share the same indent (JSLint style)
                const expectedInnerIndent = parentIndent + 4
                const text = source.getText(node)
                const lines = text.split("\n")

                for (let i = 1; i < lines.length - 1; i += 1) {
                    const line = lines[i]
                    const actualIndent = line.match(/^\s*/)[0].length

                    if (actualIndent !== expectedInnerIndent) {
                        context.report({
                            node,
                            message: "Lines inside a parenthesized ternary must be indented one level deeper than the containing statement."
                        })
                        break
                    }
                }
            }
        }
    },

    meta: {
        docs: {
            description: "Enforce JSLint-style multiline ternary formatting and indentation",
            recommended: false
        },
        schema: [],
        type: "layout"
    }
}
