/*jslint beta*/
/*global*/

import {ids} from "./ids";

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
}

export {
    onSave
};
