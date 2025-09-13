/*jslint beta*/
/*global
    libByName
*/

import {onCreate} from "./onCreate";

function create(libraryName) {
    const object = libByName(libraryName).create({libraryName});
    return onCreate.post(object);
}

export {
    create
};
