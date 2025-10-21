/*jslint beta*/
/*global
    message
*/

import {checkAccess} from "./checkAccess";
import {isMissing} from "@type/isMissing";

const onOpen = {
    post
};

function post(library) {
    checkAccess();
    if (isMissing(library.title)) {
        message("Type '" + library.title + "' is not defined!");
    }
}

export {
    onOpen
};
