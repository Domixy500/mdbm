/*jslint beta*/
/*global*/

import {type} from "./type";
import {value} from "./value";

const stringConverter = {
    calculated: calculate,
    multiLine: value,
    singleLine: value
};

function calculate(e) {
    const object = e.field("Object");
    return object.field("Id");
}

function hasConverter(key) {
    return Object.keys(
        stringConverter
    ).includes(key);
}

function valueAsString(e) {
    const propertyType = type(e);

    return (
        hasConverter(propertyType)
        ? stringConverter[propertyType](e)
        : propertyType
    );
}

export {
    valueAsString
};
