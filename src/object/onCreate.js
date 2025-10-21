/*jslint beta*/
/*global
    cancel
    lib
*/

import {type} from "@type";
import {ids} from "./ids";

const onCreate = {
    open,
    post
};

function open(e, activeLibrary) {
    const libraryName = activeLibrary.title;
    if (type.isMissing(libraryName)) {
        activeLibrary.show();
        throw type.messages.isMissing(libraryName);
    }
    e.set("mdbm.Type", libraryName);
    ids.setEmpty(e);
}

function post(e) {
    ids.setSelf(e);
}

export {
    onCreate
};
