/*jslint beta*/
/*global*/

import {ids} from "./ids";

const onSave = {
    open,
    post
};

function open(e, activeLibrary) {
    
}

function post(e) {
    ids.addMissing(e);
    ids.createMissing(e);
}

export {
    onSave
};
