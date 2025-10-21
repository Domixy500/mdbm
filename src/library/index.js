/*jslint beta*/
/*global*/

import {getLibrary} from "./getLibrary";
import {onOpen} from "./onOpen";

const library = {
    get: getLibrary,
    onOpen
};

export {
    library
};
