/*jslint beta*/
/*global*/

import {find} from "./find";

function exists(typeName) {
    return find(typeName) !== undefined;
}

export {
    exists
};
