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
    const checkPosition = positionChecker(context, ternary, node);
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

    // if (ternary.locations.condition.start.line !== ternary.startLine + 1) {
    //     context.report({
    //         message: `Expected '${ternary.texts.condition}' of ternary expression at line ${ternary.startLine + 1}`, //jslint-ignore-line
    //         node
    //     });
    // }

    // if (ternary.locations.condition.start.column + 1 !== ternary.expectedColumn) {
    //     context.report({
    //         message: `Expected '${ternary.texts.condition}' of ternary expression at column ${ternary.expectedColumn}`, //jslint-ignore-line
    //         node
    //     });
    // }

    // if (ternary.locations.questionMark.start.line !== ternary.startLine + 2) {
    //     context.report({
    //         message: `Expected '${ternary.texts.questionMark}' of ternary expression at line ${ternary.startLine + 2}`, //jslint-ignore-line
    //         node
    //     });
    // }

    // if (ternary.locations.questionMark.start.column + 1 !== ternary.expectedColumn) {
    //     context.report({
    //         message: `Expected '${ternary.texts.questionMark}' of ternary expression at column ${ternary.expectedColumn}`, //jslint-ignore-line
    //         node
    //     });
    // }

    // if (ternary.locations.colon.start.line !== ternary.startLine + 3) {
    //     context.report({
    //         message: `Expected '${ternary.texts.colon}' of ternary expression at line ${ternary.startLine + 2}`, //jslint-ignore-line
    //         node
    //     });
    // }

    // if (ternary.locations.colon.start.column + 1 !== ternary.expectedColumn) {
    //     context.report({
    //         message: `Expected '${ternary.texts.colon}' of ternary expression at column ${ternary.expectedColumn}`, //jslint-ignore-line
    //         node
    //     });
    // }

    

    // const ternary = processTernary(node, context.sourceCode);

    // if (ternary.notWrapped || ternary.noNewLine) {
    //     context.report({
    //         message: "Wrap a ternary expression in parentheses, with a line break after the left parentheses", //jslint-ignore-line
    //         node
    //     });
    //     return;
    // }

    // if (getColumn(ternary.test) !== ternary.expectedIndent) {
    //     context.report({
    //         message: "Wrap a ternary expression in parentheses, with a line break after the left parentheses", //jslint-ignore-line
    //         node
    //     });
    //     return;
    // }
}

function create(context) {
    function ConditionalExpression (node) {
        return checkTernary(context, node);
    }

    return {
        ConditionalExpression
    };
}

//     const openParenLine = tokens.before.loc.start.line;
//     const expectedIndent = 4 + getIndent(source.lines[openParenLine - 1]);

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

function generateMessage2(
    text,
    expectedLine,
    expectedColumn,
    actualLine,
    actualColumn
) {
    return (
        `Expected '${text}' at `
        + `Ln ${expectedLine}, Col ${expectedColumn}, `
        + `not Ln ${actualLine}, Col ${actualColumn} `
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

// function getColumn(node) {
//     return node.loc.start.column + 1;
// }



// function getLine(node) {
//     return node.loc.start.line;
// }

// function getLines(node, openParen) {
//     return {
//         alternate: getLine(node.alternate),
//         consequent: getLine(node.consequent),
//         openParen,
//         test: getLine(node.test)
//     };
// }

// function getTokens(node, source) {
//     const first = source.getFirstToken(node);
//     const last = source.getLastToken(node);
//     const before = source.getTokenBefore(first);
//     const after = source.getTokenAfter(last);

//     return {
//         after,
//         before,
//         first,
//         last
//     };
// }

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
    const startLine = tokens.before.loc.start.line;
    const locations = {
        colon: tokens.colon.loc,
        condition: node.test.loc,
        questionMark: tokens.questionMark.loc
    };
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
    return function(part, lineOffset) {
        const location = ternary.locations[part].start;
        const text = ternary.texts[part];

        const expectedLine = ternary.startLine + lineOffset;
        const expectedColumn = ternary.expectedColumn;

        const actualLine = location.line;
        const actualColumn = location.column + 1;

        const lineIsWrong = actualLine !== expectedLine;
        const columnIsWrong = actualColumn !== expectedColumn;

        if ( lineIsWrong || columnIsWrong) {
            context.report({
                message: generateMessage(
                    text,
                    expectedLine,
                    expectedColumn,
                    actualLine,
                    actualColumn
                ),
                node
            });
        }
    };
};

function toJson(object) {
    return JSON.stringify(object, null, 2);
}

// function processTernary(node, source) {
//     const tokens = getTokens(node, source);
//     const openParenLine = tokens.before.loc.start.line;
//     const expectedIndent = 4 + getIndent(source.lines[openParenLine - 1]);
//     const lines = getLines(node, openParenLine);
//     const notWrapped = isWrapped(tokens.before, tokens.after) === false;
//     const noNewLine = lines.test !== lines.openParen + 1;

//     return {
//         expectedIndent,
//         lines,
//         noNewLine,
//         notWrapped,
//         tokens
//     };
// }

export default Object.freeze({
    create,
    meta
});
