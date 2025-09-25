/*jslint beta*/
/*global*/

import {isMissing} from "./isMissing";

const msg = {
    isMissing: (x) => "Type '" + x + "' does not exist!"
};

function check(typeName) {
    if (isMissing(typeName)) {
        throw msg.isMissing(typeName);
    }
}

export {
    check
};
