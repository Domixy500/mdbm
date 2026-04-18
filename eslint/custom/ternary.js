/*jslint beta*/
/*global*/

const create = function (context) {
    return {
        ConditionalExpression: (node) => checkTernary(context, node)
    };
};
const meta = {
    docs: {
        description: "Enforce consistent ternary operator"
    },
    type: "layout"
};

function checkTernary(context, node) {
    const ternary = parseTernary(node, context.sourceCode);
    const checkPosition = positionChecker(context, ternary, node); //jslint-ignore-line

    if (ternary.notWrapped) {
        context.report({
            message: "Wrap a ternary expression in parentheses, with a line break after the left parentheses.", //jslint-ignore-line
            node
        });
    }

    checkPosition("condition", 1, 0);
    checkPosition("questionMark", 2, 0);
    checkPosition("colon", 3, 0);
    checkPosition("closingParen", 4, -4);
}

function expectedColumn(source, lineNumber) {
    const line = source.lines[lineNumber - 1];
    const startIndent = lineIndent(line);
    return startIndent + 5;
}

function generateMessage(
    text,
    expectedLine,
    expectedColumn
) {
    return (
        `'${text}' should be at `
        + `Ln ${expectedLine}, Col ${expectedColumn}`
    );
}

function isWrapped(tokens) {
    const isAfter = tokens.after?.value === ")";
    const isBefore = tokens.before?.value === "(";
    return isBefore && isAfter;
}

function lineIndent(line) {
    return line.match(/^\s*/)[0].length;
}

function nodeTokens(source, node) {
    const first = source.getFirstToken(node);
    const last = source.getLastToken(node);

    return {
        after: source.getTokenAfter(last),
        before: source.getTokenBefore(first),
        colon: source.getTokenBefore(node.alternate),
        questionMark: source.getTokenBefore(node.consequent)
    };
}

function parseTernary(node, source) {
    const tokens = nodeTokens(source, node);
    const locations = { //jslint-ignore-line
        closingParen: tokens.after.loc,
        colon: tokens.colon.loc,
        condition: node.test.loc,
        questionMark: tokens.questionMark.loc
    };
    const startLine = tokens.before.loc.start.line;
    const texts = {
        closingParen: tokens.after.value,
        colon: tokens.colon.value,
        condition: source.getText(node.test),
        questionMark: tokens.questionMark.value
    };

    return {
        expectedColumn: expectedColumn(source, startLine),
        locations,
        notWrapped: !isWrapped(tokens),
        startLine,
        texts
    };
}

function positionChecker(context, ternary, node) {
    return function (part, lineOffset, columnOffset) {
        const location = ternary.locations[part].start;
        const text = ternary.texts[part];

        const targetColumn = ternary.expectedColumn + columnOffset; //jslint-ignore-line
        const targetLine = ternary.startLine + lineOffset; //jslint-ignore-line

        const actualColumn = location.column + 1; //jslint-ignore-line
        const actualLine = location.line;

        const columnIsWrong = actualColumn !== targetColumn;
        const lineIsWrong = actualLine !== targetLine;


        if (lineIsWrong || columnIsWrong) {
            context.report({
                message: generateMessage(
                    text,
                    targetLine,
                    targetColumn
                ),
                node
            });
        }
    };
}

export default Object.freeze({
    create,
    meta
});
