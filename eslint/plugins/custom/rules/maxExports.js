/*jslint beta, node*/
/*global*/

const rule = Object.create(null);
rule.docs = {
    description: "Enforce a maximum number of exports per file",
    recommended: false
};
rule.type = "suggestion";
rule.messages = {
    tooMany: "Too many exports ({{count}}). Maximum allowed is {{max}}."
};

rule.schema = [{
    additionalProperties: false,
    properties: {
        max: {type: "number"}
    },
    type: "object"
}];

function create(context) {
    const {max} = options(context);
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

function options(context) {
    const defaultOptions = {
        max: 1
    };
    return Object.assign(
        {},
        defaultOptions,
        context.options[0] || {}
    );
}

export default Object.freeze({
    create,
    meta: rule
});
