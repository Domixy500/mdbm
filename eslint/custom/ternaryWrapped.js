/*jslint*/
/*global*/

const meta = {
    docs: {
        description: "Enforce consistent ternary operator"
    },
    type: "layout"
};

function checkTernary(context, node) {
    const source = context.sourceCode;
    const ternary = getTernary(node, source);

    if (!ternary.isWrapped()) {
        context.report({
            message: "Ternary must be wrapped in parentheses.",
            node
        });
        return;
    }

    if (ternary)
}

function getIndent(line) {
    return line.match(/^\s*/)[0].length;
}

function getLine(node) {
    return node.loc.start.line;
}

function getLines(node) {
    return {
        alternate: getLine(node.alternate),
        consequent: getLine(node.consequent),
        test: getLine(node.test)
    };
}

function getTernary(node, source) {
    const tokens = getTokens(node, source);
    const openParenLine = tokens.before.loc.start.line;
    const expectedIndent = 4 + getIndent(source.lines[openParenLine - 1]);
    const lines = getLines(node);

    return {
        expectedIndent,
        isWrapped: () => isWrapped(tokens.before, tokens.after),
        lines,
        tokens
    };
}

function getTokens(node, source) {
    const first = source.getFirstToken(node);
    const last = source.getLastToken(node);
    const before = source.getTokenBefore(first);
    const after = source.getTokenAfter(last);

    return {
        after,
        before,
        first,
        last
    };
}

function isWrapped(tokenBefore, tokenAfter) {
    const isBefore = tokenBefore?.value === "(";
    const isAfter = tokenAfter?.value === ")";
    return isBefore && isAfter;
}

function create(context) {
    const ConditionalExpression = function (node) {
        return checkTernary(context, node);
    };

    return {
        ConditionalExpression
    };
}

export default Object.freeze({
    create,
    meta
});
