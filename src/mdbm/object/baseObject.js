/*jslint beta*/
/*global*/

import {id} from "./id";

function baseObject(objectEntry) {
    return {
        id: () => id(objectEntry)
    };
}

export {
    baseObject
};
