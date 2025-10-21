/*jslint beta*/
/*global*/

import {getLibrary} from "./getLibrary";

function checkAccess() {
    getLibrary("Object");
    getLibrary("mdbm.Type");
}

export {
    checkAccess
};
