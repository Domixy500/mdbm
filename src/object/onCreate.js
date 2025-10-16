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
        message(type.messages.isMissing(libraryName));
        cancel();
        exit();
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
