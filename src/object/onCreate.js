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

function open(e, library) {
    if (type.isMissing(library.title)) {
        library.show();
        throw type.messages.isMissing(library.title);
    }
    e.set("mdbm.Type", library.title);

    // const library = lib();
    // if (type.isMissing(library.title)) {
    //     library.show();
    //     //throw ("Type '" + library.title + "' is not defined!"
    //     //);
    // }
}

function post(e) {
    
}

export {
    onCreate
};
