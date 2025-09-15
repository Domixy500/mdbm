/*jslint beta*/
/*global*/

import {find} from "./find";

const onCreate = {
    open,
    post
};

function open(e) {
    e.set(
        "hasTypes",
        find("Object")
    );
}

function post(e) {
    e.link(
        "hasTypes",
        find("Object")
    );
    return e;
}

export {
    onCreate
};
