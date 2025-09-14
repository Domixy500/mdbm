/*jslint beta*/
/*global
    lib
*/

import {linkWithObject} from "./linkWithObject";
import {type} from "../type";

const onCreate = {
    open,
    post
};

function open(e) {
    type.link(e, lib().title);
}

function post(e) {
    linkWithObject(e);
}

// function pre(e) {
// }

export {
    onCreate
};
