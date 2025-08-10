/*jslint beta*/
/*global*/

import {displayName} from "./displayName";
import {id} from "./id";

function fromEntry(e) {
    return Object.freeze({
        displayName: () => displayName(e),
        id: () => id(e)
    });
}

export {
    fromEntry
};
