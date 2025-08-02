/*jslint beta*/
/*global*/

function type(e) {
    return e.field("Type");
}

function value(e) {
    return e.field(type(e));
}

function valueAsString(e) {
    log(`${type(e)}: ${typeof value(e)}`);
    return value(e).toString();
}

export {
    type,
    value,
    valueAsString
};
