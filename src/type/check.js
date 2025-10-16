/*jslint beta*/
/*global*/

import {isMissing} from "./isMissing";
import {messages} from "./messages";

function check(typeName) {
    if (isMissing(typeName)) {
        throw messages.isMissing(typeName);
    }
}

export {
    check
};
