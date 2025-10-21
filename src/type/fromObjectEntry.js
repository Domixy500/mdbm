/*jslint beta*/
/*global*/

import {find} from "./find";
import {object} from "@object";

function fromObjectEntry(e) {
    return find(object.typeName(e));
}

export {
    fromObjectEntry
};
