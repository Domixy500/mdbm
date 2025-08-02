/*jslint beta*/
/*global*/

function type(e) {
    return e.field("Type");
}

function value(e) {
    return e.field(type(e));
}

function valueAsString(e) {
    const val = value(e);
    return typeof val;
}

export {
    type,
    value,
    valueAsString
};
