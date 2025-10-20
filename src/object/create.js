/*jslint beta*/
/*global*/

import {onCreate} from "./onCreate";

function create(typeName) {
    const object = libByName(typeName).create({});
    onCreate.open(
        object,
        libByName(typeName)
    );
}

export {
    create
};
