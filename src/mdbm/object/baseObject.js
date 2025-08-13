/*jslint beta*/
/*global*/

import {displayName} from "./displayName";
import {id} from "./id";

function baseObject(e) {
    return {
        displayName: () => displayName(e),
        id: () => id(e)
    };
}

export {
    fromEntry
};