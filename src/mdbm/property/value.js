/*jslint beta*/
/*global*/

import {type} from "./type";

function value(e, newValue) {
    const propertyType = type(e);
    if (newValue !== undefined) {
        e.set(propertyType, newValue);
    }
    return e.field(
        propertyType
    );
}

export {
    value
};
