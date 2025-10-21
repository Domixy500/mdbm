/*jslint beta*/
/*global*/

import {hasTypesNames} from "./hasTypesNames";

function addEmptyId(entryIds, name) {
    entryIds[name] = null;
    return entryIds;
}

function emptyIds(typeName) {
    return hasTypesNames(typeName).reduce(
        addEmptyId,
        Object.create(null)
    );
}

export {
    emptyIds
};
