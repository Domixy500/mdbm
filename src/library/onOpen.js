/*jslint beta*/
/*global*/

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
    }
}

export {
    onOpen
};
