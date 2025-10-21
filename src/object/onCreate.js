/*jslint beta*/
/*global
    cancel
    lib
*/

import {type} from "@type";
import {typeName} from "./typeName";

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
    setEmptyIds(e);
}

function post(e) {
    
}

function setEmptyIds(e) {
    const ids = type.emptyIds(typeName(e));
    e.set(
        "mdbm.Ids",
        JSON.stringify(ids, null, 2)
    );
}


export {
    onCreate
};
