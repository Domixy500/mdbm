/*jslint beta*/
/*global*/

import {createEntry} from "./getLibrary";
import {getLibrary} from "./getLibrary";
import {onOpen} from "./onOpen";

const library = {
    createEntry,
    get: getLibrary,
    onOpen
};

export {
    library
};
