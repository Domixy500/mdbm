/*jslint*/
/*global*/

const meta = {
    docs: {
        description: "Enforce consistent ternary operator"
    },
    type: "layout"
};

function checkTernary(context, node) {
    const ternary = processTernary(node, context.sourceCode);

    if (ternary.notWrapped || ternary.noNewLine) {
        context.report({
            message: "Wrap a ternary expression in parentheses, with a line break after the left parentheses", //jslint-ignore-line
            node
        });
        return;
    }

    if (getColumn(ternary.test) !== ternary.expectedIndent) {
        context.report({
            message: "Wrap a ternary expression in parentheses, with a line break after the left parentheses", //jslint-ignore-line
            node
        });
        return;
    }
}

function create(context) {
    const ConditionalExpression = function (node) {
        return checkTernary(context, node);
    };

    return {
        ConditionalExpression
    };
}

function getColumn(node) {
    return node.loc.start.column + 1;
}

function getIndent(line) {
    return line.match(/^\s*/)[0].length;
}

function getLine(node) {
    return node.loc.start.line;
}

function getLines(node, openParen) {
    return {
        alternate: getLine(node.alternate),
        consequent: getLine(node.consequent),
        openParen,
        test: getLine(node.test)
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

function processTernary(node, source) {
    const tokens = getTokens(node, source);
    const openParenLine = tokens.before.loc.start.line;
    const expectedIndent = 4 + getIndent(source.lines[openParenLine - 1]);
    const lines = getLines(node, openParenLine);
    const notWrapped = isWrapped(tokens.before, tokens.after) === false;
    const noNewLine = lines.test !== lines.openParen + 1;

    return {
        expectedIndent,
        lines,
        noNewLine,
        notWrapped,
        tokens
    };
}

export default Object.freeze({
    create,
    meta
});
