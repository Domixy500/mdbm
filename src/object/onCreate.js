/*jslint beta*/
/*global
    cancel
    lib
*/

import {type} from "@type";

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
    
}

export {
    onCreate
};
