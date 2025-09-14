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
    if (type.exists(library.title) === false) {
        type.create(
            library.title,
            type.find("Object")
        );
        message(
            "Type " + library.title + " was created!"
        );
    }
}

export {
    onOpen
};
