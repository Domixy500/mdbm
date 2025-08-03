/*jslint beta*/
/*global*/

import {type} from "./type";
import {value} from "./value";

const stringConverter = {
    multiLine: value,
    singleLine: value
};

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
