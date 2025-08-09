/*jslint beta*/
/*global*/

import {displayName} from "./displayName";

function id(e) {
    return e.field("Id");
}

function fromEntry(e) {
    return Object.freeze({
        displayName: () => displayName(e),
        id: () => id(e)
    });
}

export {
    fromEntry
};
