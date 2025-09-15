/*jslint beta*/
/*global*/

import {exists} from "./exists";

function isMissing(name) {
    return !exists(name);
}

export {
    isMissing
};
