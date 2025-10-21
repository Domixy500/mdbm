/*jslint beta*/
/*global*/

import {ids} from "./ids";
import {displayName} from "./displayName";

const onSave = {
    open,
    post
};

function open(e, activeLibrary) {
    // do nothing
    message("nothing");
}

function post(e) {
    ids.addMissing(e);
    ids.createMissing(e);
    message(displayName(e));
}

export {
    onSave
};
