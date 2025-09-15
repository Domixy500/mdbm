/*jslint beta*/
/*global*/

import {find} from "./find";

const onCreate = {
    open
};

function open(e) {
    const objectTypeEntry = find("Object");
    if (objectTypeEntry !== undefined) {
        e.link("hasTypes", objectTypeEntry);
    }
}

export {
    onCreate
};
