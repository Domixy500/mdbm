/*jslint beta*/
/*global*/

import {addProperty} from "./addProperty";
import {baseObject} from "./baseObject";
import {properties} from "./properties";

function fromEntry(e) {
    const object = properties(e).reduce(
        addProperty,
        baseObject(e)
    );
    return object;
}

export {
    fromEntry
};
