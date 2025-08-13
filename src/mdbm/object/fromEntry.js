/*jslint beta*/
/*global*/

import {baseObject} from "./baseObject";
import {mergeAndFreeze} from "@common";

function fromEntry(e) {
    const base = baseObject(e);
    const properties = 
    return mergeAndFreeze(
        base
    );
}

export {
    fromEntry
};
