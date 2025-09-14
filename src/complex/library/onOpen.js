/*jslint beta*/
/*global
    lib
    libByName
    message
*/

import {type} from "../type";

const onOpen = {
    post
};

function checkLibraryAccess() {
    libByName("Object");
    libByName("mdbm.Type");
}

function checkType() {
    const libraryName = lib().title;
    const libraryType = type.fromName(libraryName);
    if (libraryType === undefined) {
        createType(libraryName);
        message("Type " + libraryName + " was created.");
    }
}

function createType(libraryName) {
    const newType = libByName("mdbm.Type").create({});
    newType.set("Name", libraryName);
    return newType;
}

function post() {
    checkLibraryAccess();
    checkType();
}

export {
    onOpen
};
