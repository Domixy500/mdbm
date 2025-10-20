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
}

function post(e) {
    setIdsObject(e);
}

function setIdsObject(e) {
    const idsObject = type.idsObject(typeName(e));
    e.set(
        "mdbm.Ids",
        JSON.stringify(idsObject, null,)
    );
}


export {
    onCreate
};
