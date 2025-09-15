/*jslint beta*/
/*global
    cancel
    lib
*/

import {type} from "@type";

const onCreate = {
    open
};

function open(e) {
    const library = lib();
    if (type.isMissing(library.title)) {
        cancel();
        throw "Type '" + library.title + "' is not defined!";
    }
}

export {
    onCreate
};
