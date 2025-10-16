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

function open(e, libraryName) {
    if (type.isMissing(libraryName)) {
        throw type.messages.isMissing(libraryName);
    }

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
