/*jslint beta*/
/*global*/

import {addType} from "./addType";
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
    addType(e, "Object");
    addType(e, e.field("Name"));
    return e;
}

export {
    onCreate
};
