/*jslint beta*/
/*global
    message
*/

import {checkAccess} from "./checkAccess";
import {type} from "@type";

const onOpen = {
    post
};

function post(library) {
    checkAccess();
    if (type.isMissing(library.title)) {
        //type.create(
            //library.title,
            //type.find("Object")
        //);
        throw "Type '" + library.title + "' is not defined!";
    }
}

export {
    onOpen
};
