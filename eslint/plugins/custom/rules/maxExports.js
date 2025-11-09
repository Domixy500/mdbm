/*jslint beta, node*/
/*global*/

// Rule Information
const rule = {
    docs: {
        description: "Enforce a maximum number of exports per file",
        recommended: false
    },
    messages: {
        tooMany: "Too many exports ({{count}}). Maximum allowed is {{max}}."
    },
    type: "suggestion"
};

// Rule Options
const ruleDefaultOptions = {
    max: 1
};
rule.schema = [{
    additionalProperties: false,
    properties: {
        max: {type: "number"}
    },
    type: "object"
}];

// Further Rule Definitions

// Rule Checking Methods
function create(context) {
    const {max} = getOptions(context);
    let exportCount = 0;

    function check(node) {
        exportCount += 1;
        if (exportCount > max) {
            context.report({
                data: {count: exportCount, max},
                messageId: "tooMany",
                node
            });
        }
    }

    return {
        ExportDefaultDeclaration: check,
        ExportNamedDeclaration: check
    };
}

// Options Helper
function getOptions(context) {
    return Object.assign(
        {},
        ruleDefaultOptions,
        context.options[0] || {}
    );
}

// Export Rule Structure
export default Object.freeze({
    create,
    meta: rule
});
