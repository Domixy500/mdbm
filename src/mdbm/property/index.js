/*jslint beta*/
/*global*/

const stringConverter = {
    multiLine: value,
    singleLine: value
}

function type(e) {
    return e.field("Type");
}

function value(e) {
    return e.field(type(e));
}

function valueAsString(e) {
    const propertyType = type(e);
    const hasConverter = Object.keys(
        stringConverter
    ).includes(type);
    
    return (
        hasConverter
        ? stringConverter[type](e)
        : type
    );
}

export {
    type,
    value,
    valueAsString
};
