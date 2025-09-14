/*jslint beta*/
/*global*/

import {checkAccess} from "./checkAccess";

const onOpen = {
    post
};

function post(library) {
    checkAccess();
}

export {
    onOpen
};
