/*jslint beta*/
/*global*/

import {addProperty} from "./addProperty";
import {baseObject} from "./baseObject";
import {properties} from "./properties";

function fromEntry(objectEntry) {
    const object = properties(objectEntry).reduce(
        addProperty,
        baseObject(objectEntry)
    );
    return object;
}

export {
    fromEntry
};
