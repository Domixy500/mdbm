/*jslint beta*/
/*global*/

import {isDefined} from "./isDefined";

function check(typeName) {
    if (isDefined(typeName) === false) {
        throw
    }
}

export {
    check
};
