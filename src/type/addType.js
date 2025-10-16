/*jslint beta*/
/*global*/

import {find} from "./find";

function addType(typeEntry, typeName) {
    const hasTypes = typeEntry.field("hasTypes");
    const hasTypeNames = hasTypes.map(
        (e) => e.field("Name")
    );
    message(hasTypeNames)
    if (hasTypeNames.includes(typeName)) {
        typeEntry.link(
            "hasTypes",
            find(typeName)
        );
    }
}

export {
    addType
};
