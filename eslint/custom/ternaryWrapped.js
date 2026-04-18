/*jslint beta*/
/*global
    console
*/

const meta = {
    docs: {
        description: "Enforce consistent ternary operator"
    },
    type: "layout"
};

function checkTernary(context, node) {
    const ternary = parseTernary(node, context.sourceCode);
    const checkPosition = positionChecker(context, ternary, node); //jslint-ignore-line
    logObject(ternary);

    if (ternary.notWrapped) {
        context.report({
            message: "Wrap a ternary expression in parentheses, with a line break after the left parentheses.", //jslint-ignore-line
            node
        });
    }

    checkPosition("condition", 1);
    checkPosition("questionMark", 2);
    checkPosition("colon", 3);
}

function create(context) {
    return {
        ConditionalExpression: (node) => checkTernary(context, node)
    };
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

function logObject(object) {
    console.log(toJson(object));
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
        colon: tokens.colon.loc,
        condition: node.test.loc,
        questionMark: tokens.questionMark.loc
    };
    const startLine = tokens.before.loc.start.line;
    const texts = {
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
    return function (part, lineOffset) {
        const location = ternary.locations[part].start;
        const text = ternary.texts[part];

        const expectedLine = ternary.startLine + lineOffset; //jslint-ignore-line

        const actualColumn = location.column + 1; //jslint-ignore-line
        const actualLine = location.line;

        const columnIsWrong = actualColumn !== ternary.expectedColumn;
        const lineIsWrong = actualLine !== expectedLine;


        if (lineIsWrong || columnIsWrong) {
            context.report({
                message: generateMessage(
                    text,
                    expectedLine,
                    ternary.expectedColumn
                ),
                node
            });
        }
    };
}

function toJson(object) {
    return JSON.stringify(object, null, 2);
}

export default Object.freeze({
    create,
    meta
});
