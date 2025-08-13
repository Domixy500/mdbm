/*jslint beta*/
/*global*/

import {baseObject} from "./baseObject";
import {mergeAndFreeze} from "@common";
import {objectProperties} from "./objectProperties";

function fromEntry(e) {
    const base = baseObject(e);
    const properties = objectProperties(e);
    return mergeAndFreeze(
        base,
        properties
    );
}

export {
    fromEntry
};
