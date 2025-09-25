/*jslint beta*/
/*global*/

import {isMissing} from "./isMissing";

function check(typeName) {
    if (isMissing(typeName)) {
        throw `Type '${typeName}' does not exist!`;
    }
}

export {
    check
};
