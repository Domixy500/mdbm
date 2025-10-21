/*jslint beta*/
/*global*/

import {getLibrary} from "./getLibrary";

function createEntry(libraryName) {
    return getLibrary(libraryName).create({});
}

export {
    createEntry
};
