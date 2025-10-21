/*jslint beta*/
/*global*/

import {find} from "./find";
import {typeName} from "@object/typeName";

function fromObjectEntry(e) {
    return find(typeName(e));
}

export {
    fromObjectEntry
};
