/*jslint beta*/
/*global*/

import {find} from "./find";

const hasTypesField = "hasTypes";

function addType(typeEntry, typeName) {
    const hasTypeNames = hasTypes(typeEntry).map(
        (e) => e.field("Name")
    );
    if (!hasTypeNames.includes(typeName)) {
        typeEntry.link(
            hasTypesField,
            find(typeName)
        );
    }
}

function hasTypes(typeEntry) {
    return typeEntry.field(hasTypesField);
}

export {
    addType
};
